import { View, Text, FlatList, Image, Linking, TouchableOpacity } from 'react-native';
import React from 'react';

export default function HotelList({ hotelList }) {
  if (!hotelList || hotelList.length === 0) {
    return (
      <Text style={{ fontFamily: 'outfit', fontSize: 16, color: 'gray', marginTop: 10 }}>
        No hotel recommendations available.
      </Text>
    );
  }

  return (
    <View style={{ marginTop: 20 }}>
      <Text style={{ fontFamily: 'outfit-bold', fontSize: 20, marginBottom: 10 }}>
        🏨 Hotel Recommendations
      </Text>

      <FlatList
        data={hotelList}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View
            style={{
              width: 250,
              marginRight: 15,
              backgroundColor: '#f5f5f5',
              borderRadius: 10,
              padding: 10,
            }}
          >
            <Image
              source={
                item.imageURL
                  ? { uri: item.imageURL }
                  : require('./../../assets/images/mytrip.jpg')
              }
              style={{
                width: '100%',
                height: 120,
                borderRadius: 8,
                marginBottom: 8,
              }}
              resizeMode="cover"
            />

            <Text style={{ fontFamily: 'outfit-bold', fontSize: 16 }}>{item.name}</Text>
            <Text style={{ fontFamily: 'outfit', fontSize: 14, color: 'gray' }}>
              💰 {item.pricePerNight}
            </Text>
            <Text style={{ fontFamily: 'outfit', fontSize: 13, marginTop: 4 }}>
              🌟 {item.ratingDescription}
            </Text>

            {item.bookingURL && (
              <TouchableOpacity onPress={() => Linking.openURL(item.bookingURL)}>
                <Text style={{ color: '#007aff', marginTop: 6, fontSize: 13 }}>
                  Book Now →
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      />
    </View>
  );
}
