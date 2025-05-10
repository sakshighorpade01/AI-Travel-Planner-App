import { View, Text } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import 'react-native-get-random-values';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { CreateTripContext } from './../../context/CreateTripContext'


export default function SearchPlace() {

    const navigation = useNavigation();

    const { tripData, setTripData } = useContext(CreateTripContext);

    const router = useRouter();


    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: 'Search'
        })
    })

    useEffect(() => {
        console.log(tripData);
    }), [tripData]

    return (
        <View
            style={{
                padding: 25,
                paddingTop: 55,
                backgroundColor: 'white',
                height: '100%',
                flex:1

            }}
        >


                <GooglePlacesAutocomplete
                    placeholder='Search Place'
                    fetchDetails={true}

                    onPress={(data, details = null) => {
                        // 'details' is provided when fetchDetails = true
                        
                        setTripData({
                            locationInfo: {
                                name: data.description,
                                coordinates: details?.geometry.location,
                                photoRef: details?.photos[0]?.photo_reference,
                                url: details?.url
                            }
                        });

                   router.push('./select-traveller')


                    }}
                    
                    query={{
                        key: process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY,
                        language: 'en',
                    }}

styles={{
    textInputContainer:{
        borderWidth:1,
        borderRadius:5,
        marginTop:22
    }
}}

                />

          

        </View>
    )
}