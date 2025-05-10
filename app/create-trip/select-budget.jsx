import { View, Text, Touchable, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigation, useRouter } from 'expo-router'
import { SelectBudgetOptions } from '../../constants/Options';
import OptionCard from '../../components/CreateTrip/OptionCard';
import { FlatList } from 'react-native';
import { CreateTripContext } from '../../context/CreateTripContext';


export default function SelectBudget() {

    const navigation = useNavigation();
    const [selectedOption,setSelectedOption] = useState();
    const { tripData, setTripData } = useContext(CreateTripContext);
    const router=useRouter();

    useEffect(()=>{
        navigation.setOptions({
            headerShown:true,
            headerTransparent:true,
            headerTitle:''
        })
    },[])


    useEffect(()=>{
        selectedOption && setTripData({
            ...tripData,
            budget:selectedOption?.title
        })
    },[selectedOption])


    const onClickContinue=()=>{

        if(!selectedOption){
            ToastAndroid.show('Select your budget',ToastAndroid.LONG)
            return;
        }

        router.push('/create-trip/review-trip');

    }



  return (
    <View style={{
        paddingTop:58,
        padding:25,
        backgroundColor:'white',
        height:'100%'
    }}>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:30,
        marginTop:18

      }}>Budget</Text>

      <View style={{
        marginTop:20
      }}>
        <Text style={{
            fontFamily:'outfit-bold',
            fontSize:18
        }}>Choose Spending habits for your trip</Text>
      
      <FlatList
      data={SelectBudgetOptions}
      renderItem={({item,index})=>(
        <TouchableOpacity style={{
            marginVertical:10
        }}
        onPress={()=>setSelectedOption(item)}
        >

            <OptionCard option={item} selectedOption={selectedOption}/>
        </TouchableOpacity>
      )}
      />

      </View>

      
      <TouchableOpacity 
    onPress={()=>onClickContinue() }
      
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
  )
}