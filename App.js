import React, {Component} from 'react';
import {Text, StyleSheet, View, FlatList} from 'react-native';
import {Calendar} from 'react-native-calendars';
import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAbyPoSkuGDtRMFoYbeh02dXSnnqjvd-jk",
  authDomain: "calendarbase-8a39a.firebaseapp.com",
  databaseURL: "https://calendarbase-8a39a.firebaseio.com",
  projectId: "calendarbase-8a39a",
  storageBucket: "calendarbase-8a39a.appspot.com",
  messagingSenderId: "494871296702",
  appId: "1:494871296702:web:a59a5a6be230478e30fcef"
};

firebase.initializeApp(firebaseConfig);

var event = [];

export default class CalendarsScreen extends Component {

constructor(props) {
    super(props);
    this.state = {
      events: []
    };
    this.onDayPress = this.onDayPress.bind(this);
  }

  componentDidMount(){
    firebase.database().ref('events/').on('value', snapshot => {
      let events = [];
      snapshot.forEach((child) => {
        events.push({
          name: child.val().name
        });
      });
      event = events;
      this.setState({events: events});
    });
}

  render() {
    return (
        <View>
        <Calendar
            onDayPress={this.onDayPress}
            style={styles.calendar}
            //hideExtraDays
            showWeekNumbers
            markedDates={
              {[this.state.selected]: {selected: true, disableTouchEvent: true},
                '2019-12-23': {selected: true, startingDay: true, endingDay: true, color: '#F39C12'},
                '2019-12-24': {selected: true, startingDay: true, endingDay: true, color: '#F39C12'},
                '2019-12-31': {selected: true, startingDay: true, endingDay: false, color: '#F39C12'},
                  '2020-01-01': {selected: true, startingDay: false, endingDay: true, color: '#F39C12'}
              }}
            markingType='period'
        />
        <View>
          <Text style={styles.titletxt}>Upcoming events:</Text>
            <FlatList
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) =>
                    <View>
                        <Text style={styles.listtxt}>{item.name}</Text>
                    </View>}
                data={event}
                ItemSeparatorComponent={listSeparator}/>
        </View>
        </View>

    );
  }

  onDayPress(day) {
    this.setState({
      selected: day.dateString
        });
    }
}

const listSeparator = () => {
  return (
      <View
          style={{
            height: 5,
            width: "80%",
            backgroundColor: "#fff",
            marginLeft: "10%"
          }}
      />
  );
};

const styles = StyleSheet.create({
  calendar: {
    borderTopWidth: 1,
    paddingTop: 50,
    borderBottomWidth: 1,
    borderColor: '#eee',
    height: 350
  },
  text: {
    textAlign: 'center',
    borderColor: '#bbb',
    padding: 10,
    backgroundColor: '#eee'
  },
  container: {
    flex: 1,
    backgroundColor: 'gray'
  },
  titletxt: {
    marginTop: 35,
    textAlign: 'center',
    fontSize: 15
  },
  listtxt: {
      textAlign: 'center',
      marginTop: 15,
      backgroundColor: '#FAD7A0',
      padding: 10,
      width: 250,
      marginLeft: 52
  }
});