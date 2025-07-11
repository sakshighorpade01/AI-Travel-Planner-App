import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { auth, db } from '../../configs/FirebaseConfig';
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
      fetchUserProfile(currentUser.uid);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserProfile = async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        setUserProfile(userDoc.data());
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await signOut(auth);
              router.replace('/');
            } catch (error) {
              console.error('Error logging out:', error);
              Alert.alert('Error', 'Failed to logout. Please try again.');
            }
          },
        },
      ]
    );
  };

  const profileMenuItems = [
    {
      id: 1,
      title: 'Personal Information',
      icon: 'person-outline',
      onPress: () => Alert.alert('Coming Soon', 'Personal information editing will be available soon!')
    },
    {
      id: 2,
      title: 'Travel Preferences',
      icon: 'settings-outline',
      onPress: () => Alert.alert('Coming Soon', 'Travel preferences will be available soon!')
    },
    {
      id: 3,
      title: 'Notifications',
      icon: 'notifications-outline',
      onPress: () => Alert.alert('Coming Soon', 'Notification settings will be available soon!')
    },
    {
      id: 4,
      title: 'Privacy & Security',
      icon: 'shield-outline',
      onPress: () => Alert.alert('Coming Soon', 'Privacy settings will be available soon!')
    },
    {
      id: 5,
      title: 'Help & Support',
      icon: 'help-circle-outline',
      onPress: () => Alert.alert('Coming Soon', 'Help and support will be available soon!')
    },
    {
      id: 6,
      title: 'About App',
      icon: 'information-circle-outline',
      onPress: () => Alert.alert('About', 'AI Travel Planner v1.0.0\n\nPlan your trips with AI-powered recommendations and personalized itineraries.')
    }
  ];

  const statsData = [
    { label: 'Trips Planned', value: userProfile?.tripsCount || 0, icon: 'location' },
    { label: 'Destinations', value: userProfile?.destinationsCount || 0, icon: 'globe' },
    { label: 'Days Traveled', value: userProfile?.daysTraveled || 0, icon: 'calendar' }
  ];

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
        <Text style={{ fontFamily: 'outfit', fontSize: 16 }}>Loading profile...</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
        <Text style={{ fontFamily: 'outfit', fontSize: 16, marginBottom: 20 }}>Please sign in to view your profile</Text>
        <TouchableOpacity
          onPress={() => router.push('/auth/sign-in')}
          style={{
            backgroundColor: 'black',
            paddingHorizontal: 30,
            paddingVertical: 15,
            borderRadius: 15
          }}
        >
          <Text style={{ color: 'white', fontFamily: 'outfit-medium' }}>Sign In</Text>
        </TouchableOpacity>
      </View>
    );
  }

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
        }}>Profile</Text>
      </View>

      {/* User Info Section */}
      <View style={{
        paddingHorizontal: 25,
        marginBottom: 30
      }}>
        <View style={{
          backgroundColor: '#f8f9fa',
          borderRadius: 20,
          padding: 25,
          alignItems: 'center'
        }}>
          <View style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: '#e9ecef',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 15
          }}>
            <Ionicons name="person" size={40} color="#6c757d" />
          </View>
          
          <Text style={{
            fontFamily: 'outfit-bold',
            fontSize: 20,
            marginBottom: 5
          }}>
            {userProfile?.fullName || user.displayName || 'Traveler'}
          </Text>
          
          <Text style={{
            fontFamily: 'outfit',
            fontSize: 14,
            color: 'grey',
            marginBottom: 15
          }}>
            {user.email}
          </Text>

          <TouchableOpacity
            onPress={() => Alert.alert('Coming Soon', 'Profile editing will be available soon!')}
            style={{
              backgroundColor: 'black',
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderRadius: 20
            }}
          >
            <Text style={{ color: 'white', fontFamily: 'outfit-medium', fontSize: 12 }}>
              Edit Profile
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Stats Section */}
      <View style={{
        paddingHorizontal: 25,
        marginBottom: 30
      }}>
        <Text style={{
          fontFamily: 'outfit-bold',
          fontSize: 20,
          marginBottom: 15
        }}>Your Travel Stats</Text>
        
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>
          {statsData.map((stat, index) => (
            <View key={index} style={{
              flex: 1,
              backgroundColor: '#f8f9fa',
              borderRadius: 15,
              padding: 20,
              marginHorizontal: 5,
              alignItems: 'center'
            }}>
              <Ionicons name={stat.icon} size={24} color="#007AFF" style={{ marginBottom: 8 }} />
              <Text style={{
                fontFamily: 'outfit-bold',
                fontSize: 18
              }}>{stat.value}</Text>
              <Text style={{
                fontFamily: 'outfit',
                fontSize: 12,
                color: 'grey',
                textAlign: 'center'
              }}>{stat.label}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Menu Items */}
      <View style={{
        paddingHorizontal: 25,
        marginBottom: 30
      }}>
        <Text style={{
          fontFamily: 'outfit-bold',
          fontSize: 20,
          marginBottom: 15
        }}>Settings</Text>
        
        {profileMenuItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={item.onPress}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 15,
              borderBottomWidth: 1,
              borderBottomColor: '#f0f0f0'
            }}
          >
            <Ionicons name={item.icon} size={20} color="#007AFF" style={{ marginRight: 15 }} />
            <Text style={{
              fontFamily: 'outfit-medium',
              fontSize: 16,
              flex: 1
            }}>{item.title}</Text>
            <Ionicons name="chevron-forward" size={16} color="grey" />
          </TouchableOpacity>
        ))}
      </View>

      {/* Logout Button */}
      <View style={{
        paddingHorizontal: 25,
        paddingBottom: 30
      }}>
        <TouchableOpacity
          onPress={handleLogout}
          style={{
            backgroundColor: '#ff4757',
            borderRadius: 15,
            padding: 20,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center'
          }}
        >
          <Ionicons name="log-out-outline" size={20} color="white" style={{ marginRight: 10 }} />
          <Text style={{
            color: 'white',
            fontFamily: 'outfit-bold',
            fontSize: 16
          }}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}