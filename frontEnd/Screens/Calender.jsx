import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { APP_API_URL } from '../env';
import SessionStorage from 'react-native-session-storage';

const Calender = () => {
  const [CheckIn, setCheckIn] = useState("");
  const [CheckOut, setCheckOut] = useState("");
  const [selectedDate, setSelectedDate] = useState(false);
  const [date, setDate] = useState([]);

  const Userid = SessionStorage.getItem("userId");
  const propertyId = SessionStorage.getItem("propertyId");

  const getBooking = async () => {
    try {
      const res = await axios.get(`${APP_API_URL}/Booking/get`);
      setDate(res.data);
      console.log("date", res.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const addBooking = async ({ checkIn, checkOut, UserId, PropertyId }) => {
    try {
      const res = await axios.post(`${APP_API_URL}/Booking/add/${2}/${2}`, {
        checkIn: checkIn,
        checkOut: checkOut,
        UserId: 2,
        PropertyId: 2
      });
      setSelectedDate(true);
      setCheckIn(res.data.checkIn);
      setCheckOut(res.data.checkOut);
      console.log('booked', res.data);
    } catch (error) {
      console.error("your error is", error);
    }
  };

  const onDayPress = (day) => {
    if (!CheckIn || (CheckIn && CheckOut)) {
      setCheckIn(day.dateString);
      setCheckOut("");
      setSelectedDate(false);
      console.log("dayfirst", day);
    } else {
      setCheckOut(day.dateString);
      console.log("day", day);
      addBooking({ checkIn: CheckIn, checkOut: day.dateString, UserId: Userid, PropertyId: propertyId });
    }
  };

  const getMarkedDates = () => {
    let markedDates = {};

    date.forEach(booking => {
      let currentDate = new Date(booking.checkIn);
      const endDate = new Date(booking.checkOut);

      while (currentDate <= endDate) {
        const dateString = currentDate.toISOString().split('T')[0];
        markedDates[dateString] = {
          color: 'gray',
          textColor: 'white',
          disabled: true,
          disableTouchEvent: true,
        };
        currentDate.setDate(currentDate.getDate() + 1);
      }
    });

    if (CheckIn) {
      markedDates[CheckIn] = {
        startingDay: true,
        color: 'lightblue',
        textColor: 'gray',
      };
    }

    if (CheckOut) {
      markedDates[CheckOut] = {
        endingDay: true,
        color: 'lightblue',
        textColor: 'gray',
      };
    }

    if (CheckIn && CheckOut) {
      let currentDate = new Date(CheckIn);
      const endDate = new Date(CheckOut);

      while (currentDate <= endDate) {
        const dateString = currentDate.toISOString().split('T')[0];
        if (dateString !== CheckIn && dateString !== CheckOut) {
          markedDates[dateString] = {
            color: 'lightblue',
            textColor: 'gray',
            disabled: selectedDate,
            disableTouchEvent: selectedDate,
          };
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }
    }

    return markedDates;
  };

  useEffect(() => {
    getBooking();
  }, []);

  return (
    <View>
      <Calendar
        onDayPress={onDayPress}
        markingType='period'
        markedDates={getMarkedDates()}
      />
    </View>
  );
};

export default Calender;

const styles = StyleSheet.create({});
