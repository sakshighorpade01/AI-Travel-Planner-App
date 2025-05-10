import { View, Text, Image } from 'react-native'
import React from 'react'
import moment from 'moment'

export default function UserTripCard({trip}) {
    const formatData = (data)=>{
        return (data)
    }
  return (
    <View style={{
        marginTop:15,
        display:'flex',
        flexDirection:'row',
        gap:10,
        alignItems:'center'
    }}>
      {/* <Image source={require('./../../assets/images/mytrip.jpg')} 
      style={{
        width:100,
        height:100,
        borderRadius:15
      }}     
      /> */}
       <Image source={{uri:'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=' +formatData(trip.tripData).locationInfo?.photoRef  +'&key='+process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}}
              
              style={{
                   width:100,
        height:100,
        borderRadius:15
              }}
              />

      <View>
        <Text style={{
            fontFamily:'outfit-medium',
            fontSize:16
        }}>{trip.tripPlan?.travelPlan?.location}</Text>
        <Text style={{
            fontFamily:'outfit',
            fontSize:13,
            color:'grey'
        }}>{moment(formatData(trip.tripData).startDate).format('DD MMM YYYY')}</Text>
        <Text style={{
            fontFamily:'outfit',
            fontSize:13,
            color:'grey'
        }}>Travelling : {formatData(trip.tripData).traveller.title}</Text>
      
      </View>
    </View>
  )
}