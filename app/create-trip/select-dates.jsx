import { View, Text, TouchableOpacity, ToastAndroid } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigation, useRouter } from 'expo-router';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import { CreateTripContext } from '../../context/CreateTripContext';


export default function SelectDates() {
  const navigation = useNavigation();
  const [startDate,setStartDate]=useState();
  const [endDate,setEndDate]=useState();
  const { tripData, setTripData } = useContext(CreateTripContext);
  const router = useRouter();
  

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: '',
    });
  }, []);


  const OnDateSelectionContinue=()=>{
    if(!startDate && !endDate){
      ToastAndroid.show('Please Select Start and End date',ToastAndroid.LONG)
      return;
    }
    const totalNoOfDays = endDate.diff(startDate,'days');
    console.log(totalNoOfDays+1);
    setTripData({
      ...tripData,
      startDate:startDate,
      endDate:endDate,
      totalNoOfDays:totalNoOfDays+1

    });

    router.push('/create-trip/select-budget')

  }

  // Define the function here
  const onDateChange = (date, type) => {
    console.log(type, date);
    if(type=='START_DATE'){
      setStartDate(moment(date))
    }
    else{
      setEndDate(moment(date))
    }
  };

  return (
    <View
      style={{
        padding: 25,
        paddingTop: 58,
        backgroundColor: 'white',
        height: '100%',
      }}
    >
      <Text
        style={{
          fontFamily: 'outfit-bold',
          fontSize: 30,
          marginTop: 18,
        }}
      >
        Travel Dates
      </Text>
      <View style={{ marginTop: 30 }}>
        <CalendarPicker
          onDateChange={onDateChange} // Use the function defined above
          allowRangeSelection={true}
          minDate={new Date()}
          maxRangeDuration={5}
          selectedRangeStyle={{
            backgroundColor:'black'
          }}
          selectedDayTextStyle={{
            color:'white'
          }}
        />
      </View>

<TouchableOpacity 
onPress={OnDateSelectionContinue}
style={{
  padding:13,
  backgroundColor:'black',
  borderRadius:15,
  marginTop:20
}}>



  <Text style={{
    textAlign:'center',
    color:'white',
    fontSize:17,
    fontFamily:'outfit-medium'
    
  }}>Continue</Text>


</TouchableOpacity>

    </View>
  );
}
