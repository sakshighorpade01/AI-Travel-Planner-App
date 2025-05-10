import { View, Text } from 'react-native'
import React from 'react'

export default function OptionCard({option,selectedOption}) {
  return (
            <View style={[{
                padding:22,
                display:'flex',
                flexDirection:'row',
                justifyContent:'space-between',
                backgroundColor:'#F3F3F3',
                borderRadius:15
            },selectedOption?.id==option?.id&&{borderWidth:2}]}>
     
      <View>
        <Text style={{
            fontSize:20,
            fontFamily:'outfit-bold'
        }}>{option.title}</Text>

<Text style={{
            fontSize:17,
            fontFamily:'outfit',
            color:'grey'
        }}>{option.desc}</Text>
      </View>

      <Text style={{
        fontSize:30
      }}>{option.icon} </Text>
    </View>
  )
}