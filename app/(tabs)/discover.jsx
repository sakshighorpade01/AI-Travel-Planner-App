import { View, Text, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';

export default function Discover() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  // Popular destinations data
  const popularDestinations = [
    {
      id: 1,
      name: 'Paris, France',
      image: 'https://images.unsplash.com/photo-1502602898535-0c0c0c0c0c0c?w=400',
      rating: 4.8,
      description: 'The City of Light awaits'
    },
    {
      id: 2,
      name: 'Tokyo, Japan',
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400',
      rating: 4.9,
      description: 'Where tradition meets innovation'
    },
    {
      id: 3,
      name: 'New York, USA',
      image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400',
      rating: 4.7,
      description: 'The city that never sleeps'
    },
    {
      id: 4,
      name: 'Bali, Indonesia',
      image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400',
      rating: 4.6,
      description: 'Tropical paradise awaits'
    }
  ];

  // Trending categories
  const trendingCategories = [
    { id: 1, name: 'Beach Getaways', icon: '🏖️', color: '#FF6B6B' },
    { id: 2, name: 'Mountain Adventures', icon: '🏔️', color: '#4ECDC4' },
    { id: 3, name: 'City Breaks', icon: '🏙️', color: '#45B7D1' },
    { id: 4, name: 'Cultural Tours', icon: '🏛️', color: '#96CEB4' },
    { id: 5, name: 'Food & Wine', icon: '🍷', color: '#FFEAA7' },
    { id: 6, name: 'Adventure Sports', icon: '🏄‍♂️', color: '#DDA0DD' }
  ];

  // Travel tips
  const travelTips = [
    {
      id: 1,
      title: 'Best Time to Book Flights',
      description: 'Book 2-3 months in advance for domestic, 6-8 months for international',
      icon: '✈️'
    },
    {
      id: 2,
      title: 'Travel Insurance Tips',
      description: 'Always get comprehensive coverage for international trips',
      icon: '🛡️'
    },
    {
      id: 3,
      title: 'Packing Smart',
      description: 'Roll clothes to save space and prevent wrinkles',
      icon: '🧳'
    }
  ];

  const handleDestinationPress = (destination) => {
    // Navigate to create trip with pre-filled destination
    router.push({
      pathname: '/create-trip/search-place',
      params: { prefill: destination.name }
    });
  };

  const handleCategoryPress = (category) => {
    // Navigate to create trip with category context
    router.push({
      pathname: '/create-trip/search-place',
      params: { category: category.name }
    });
  };

  return (
    <ScrollView style={{
      backgroundColor: 'white',
      flex: 1
    }}>
      {/* Header */}
      <View style={{
        padding: 25,
        paddingTop: 50,
        backgroundColor: 'white'
      }}>
        <Text style={{
          fontFamily: 'outfit-bold',
          fontSize: 35,
          marginBottom: 20
        }}>Discover</Text>

        {/* Search Bar */}
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#f5f5f5',
          borderRadius: 15,
          paddingHorizontal: 15,
          marginBottom: 25
        }}>
          <Ionicons name="search" size={20} color="grey" />
          <TextInput
            style={{
              flex: 1,
              paddingVertical: 15,
              paddingHorizontal: 10,
              fontFamily: 'outfit',
              fontSize: 16
            }}
            placeholder="Search destinations, activities..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Popular Destinations */}
      <View style={{ paddingHorizontal: 25, marginBottom: 30 }}>
        <Text style={{
          fontFamily: 'outfit-bold',
          fontSize: 22,
          marginBottom: 15
        }}>Popular Destinations</Text>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {popularDestinations.map((destination) => (
            <TouchableOpacity
              key={destination.id}
              onPress={() => handleDestinationPress(destination)}
              style={{
                width: 200,
                marginRight: 15,
                backgroundColor: 'white',
                borderRadius: 15,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
                elevation: 5
              }}
            >
              <Image
                source={{ uri: destination.image }}
                style={{
                  width: '100%',
                  height: 120,
                  borderTopLeftRadius: 15,
                  borderTopRightRadius: 15
                }}
              />
              <View style={{ padding: 15 }}>
                <Text style={{
                  fontFamily: 'outfit-bold',
                  fontSize: 16,
                  marginBottom: 5
                }}>{destination.name}</Text>
                <Text style={{
                  fontFamily: 'outfit',
                  fontSize: 12,
                  color: 'grey',
                  marginBottom: 8
                }}>{destination.description}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Ionicons name="star" size={14} color="#FFD700" />
                  <Text style={{
                    fontFamily: 'outfit-medium',
                    fontSize: 12,
                    marginLeft: 4
                  }}>{destination.rating}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Trending Categories */}
      <View style={{ paddingHorizontal: 25, marginBottom: 30 }}>
        <Text style={{
          fontFamily: 'outfit-bold',
          fontSize: 22,
          marginBottom: 15
        }}>Explore by Category</Text>
        
        <View style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between'
        }}>
          {trendingCategories.map((category) => (
            <TouchableOpacity
              key={category.id}
              onPress={() => handleCategoryPress(category)}
              style={{
                width: '48%',
                backgroundColor: category.color + '20',
                borderRadius: 15,
                padding: 20,
                marginBottom: 15,
                alignItems: 'center'
              }}
            >
              <Text style={{ fontSize: 30, marginBottom: 10 }}>{category.icon}</Text>
              <Text style={{
                fontFamily: 'outfit-medium',
                fontSize: 14,
                textAlign: 'center'
              }}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Travel Tips */}
      <View style={{ paddingHorizontal: 25, marginBottom: 30 }}>
        <Text style={{
          fontFamily: 'outfit-bold',
          fontSize: 22,
          marginBottom: 15
        }}>Travel Tips</Text>
        
        {travelTips.map((tip) => (
          <View key={tip.id} style={{
            backgroundColor: '#f8f9fa',
            borderRadius: 15,
            padding: 20,
            marginBottom: 15,
            flexDirection: 'row',
            alignItems: 'center'
          }}>
            <Text style={{ fontSize: 24, marginRight: 15 }}>{tip.icon}</Text>
            <View style={{ flex: 1 }}>
              <Text style={{
                fontFamily: 'outfit-bold',
                fontSize: 16,
                marginBottom: 5
              }}>{tip.title}</Text>
              <Text style={{
                fontFamily: 'outfit',
                fontSize: 14,
                color: 'grey'
              }}>{tip.description}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Quick Start Button */}
      <View style={{ paddingHorizontal: 25, paddingBottom: 30 }}>
        <TouchableOpacity
          onPress={() => router.push('/create-trip/search-place')}
          style={{
            backgroundColor: 'black',
            borderRadius: 15,
            padding: 20,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center'
          }}
        >
          <Ionicons name="add-circle" size={24} color="white" style={{ marginRight: 10 }} />
          <Text style={{
            color: 'white',
            fontFamily: 'outfit-bold',
            fontSize: 16
          }}>Start Planning Your Trip</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}