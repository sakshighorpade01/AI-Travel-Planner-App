import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import { CreateTripContext } from '../../context/CreateTripContext';
import moment from 'moment';

export default function ReviewTrip() {

    const navigation = useNavigation();
    const {tripData,setTripData} = useContext(CreateTripContext);
    const router = useRouter();


    useEffect(()=>{
        navigation.setOptions({
            headerShown:true,
            headerTransparent:true,
            headerTitle:''
        })
    },[])

  return (
    <View style={{
        padding:25,
        paddingTop:58,
        backgroundColor:'white',
        height:'100%'
    }}>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:30,
        marginTop:18
      }}>Review Your Trip</Text>

<View style={{
    marginTop:20
}}>
    <Text style={{
        fontFamily:'outfit-bold',
        fontSize:18
    }}>Before generating your trip, please review your selection</Text>
</View>

{/* Destination Info */}
<View style={{
    marginTop:40,
    display:'flex',
    flexDirection:'row',
    gap:20
}}>
<Text style={{
    fontSize:30
}}>📍</Text>
<View>
    <Text style={{
        fontFamily:'outfit',
        fontSize:20,
        color:'grey'
    }}>Destination</Text>
    <Text style={{
        fontFamily:'outfit-medium',
        fontSize:20
    }}>{tripData?.locationInfo?.name}</Text>
</View>
</View>

{/* Date Selected Info */}
<View style={{
    marginTop:23,
    display:'flex',
    flexDirection:'row',
    gap:20
}}>
<Text style={{
    fontSize:30
}}>🗓️</Text>
<View>
    <Text style={{
        fontFamily:'outfit',
        fontSize:20,
        color:'grey'
    }}>Travel Date</Text>
    <Text style={{
        fontFamily:'outfit-medium',
        fontSize:20
    }}>{moment(tripData?.startDate).format('DD MMM')
    +" To "+
    moment(tripData?.endDate).format("DD MMM")+"  "}

    ({tripData?.totalNoOfDays} days)
    </Text>
</View>
</View>


{/*Traveller Info */}
<View style={{
    marginTop:23,
    display:'flex',
    flexDirection:'row',
    gap:20
}}>
<Text style={{
    fontSize:30
}}>🚌</Text>
<View>
    <Text style={{
        fontFamily:'outfit',
        fontSize:20,
        color:'grey'
    }}>Who is travelling</Text>
    <Text style={{
        fontFamily:'outfit-medium',
        fontSize:20
    }}>{tripData?.traveller?.title}

    </Text>
</View>
</View>



{/*Budget Info */}
<View style={{
    marginTop:23,
    display:'flex',
    flexDirection:'row',
    gap:20
}}>
<Text style={{
    fontSize:30
}}>💰</Text>
<View>
    <Text style={{
        fontFamily:'outfit',
        fontSize:20,
        color:'grey'
    }}>Budget</Text>
    <Text style={{
        fontFamily:'outfit-medium',
        fontSize:20
    }}>{tripData?.budget}

    </Text>
</View>
</View>


      <TouchableOpacity 
    onPress={()=>router.replace('/create-trip/generate-trip')}
      
      style={{
        padding:13,
        backgroundColor:'black',
        borderRadius:15,
        marginTop:70
      }}>
          
        <Text style={{
          textAlign:'center',
          color:'white',
          fontSize:17,
          fontFamily:'outfit-medium'
          
        }}>Build My Trip</Text>
      
 
      </TouchableOpacity>

    </View>
  )
}