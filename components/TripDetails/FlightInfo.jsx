import { View, Text, TouchableOpacity, Linking } from 'react-native';
import React from 'react';

export default function FlightInfo({ flightData }) {
  if (!flightData) return null;

  const {
    airlineSuggestion,
    origin,
    destination,
    flightClass,
    priceEstimate,
    bookingURL,
  } = flightData;

  return (
    <View
      style={{
        marginTop: 20,
        borderWidth: 1,
        padding: 10,
        borderRadius: 15,
        borderColor: 'grey',
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            fontFamily: 'outfit-bold',
            fontSize: 20,
          }}
        >
          ✈️ Flights
        </Text>

        {bookingURL && (
          <TouchableOpacity
            style={{
              backgroundColor: 'black',
              padding: 5,
              width: 100,
              borderRadius: 7,
              marginTop: 7,
            }}
            onPress={() => Linking.openURL(bookingURL)}
          >
            <Text
              style={{
                textAlign: 'center',
                color: 'white',
                fontFamily: 'outfit',
              }}
            >
              Book Here
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <Text style={{ fontFamily: 'outfit', fontSize: 16, marginTop: 8 }}>
        🛫 Origin: {origin}
      </Text>
      <Text style={{ fontFamily: 'outfit', fontSize: 16 }}>
        🛬 Destination: {destination}
      </Text>
      <Text style={{ fontFamily: 'outfit', fontSize: 16 }}>
        💺 Class: {flightClass}
      </Text>
      <Text style={{ fontFamily: 'outfit', fontSize: 16 }}>
        💰 Estimated Price: {priceEstimate}
      </Text>
      <Text style={{ fontFamily: 'outfit', fontSize: 14, color: 'gray', marginTop: 4 }}>
        ✈️ {airlineSuggestion}
      </Text>
    </View>
  );
}
