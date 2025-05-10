import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigation } from 'expo-router'
import { FlatList } from 'react-native';
import {SelectTravellerList} from './../../constants/Options'
import { ViewComponent } from 'react-native';
import OptionCard from '../../components/CreateTrip/OptionCard';
import { CreateTripContext } from '../../context/CreateTripContext';

export default function SelectTraveller() {

const navigation = useNavigation();

const [selectedTraveller,setSelectedTraveller] = useState();

 const { tripData, setTripData } = useContext(CreateTripContext);


useEffect(()=>{
    navigation.setOptions({
        headerShown:true,
        headerTransparent:true,
        headerTitle:''
    })
},[])

useEffect(()=>{
    setTripData({...tripData,
      traveller:selectedTraveller
    })
},[selectedTraveller]);

useEffect(()=>{
  console.log(tripData);
},[tripData])

  return (
    <View 
    style={{
        padding:25,
        paddingTop:55,
        backgroundColor:'white',
        height:'100%'
    }}
    >
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:30,
        marginTop:15
      }}>Who's Travelling</Text>


      <View style={{
        marginTop:20
      }}>
        <Text style={{
            fontFamily:'outfit-bold',
            fontSize:20,

        }}>Choose your travellers</Text>


        <FlatList
        data = {SelectTravellerList}
        renderItem={({item,index})=>(
          <TouchableOpacity 
          onPress={()=>setSelectedTraveller(item)}
          style={{
            marginVertical:10
          }}>
            <OptionCard option={item} selectedOption = {selectedTraveller} />
          </TouchableOpacity>
        )}
        />
      </View>

<TouchableOpacity 
style={{
  padding:13,
  backgroundColor:'black',
  borderRadius:15,
  marginTop:20
}}>

<Link href={'/create-trip/select-dates'}>

  <Text style={{
    textAlign:'center',
    color:'white',
    fontSize:17,
    fontFamily:'outfit-medium'
    
  }}>Continue</Text>

</Link>
</TouchableOpacity>


    </View>
  )
}