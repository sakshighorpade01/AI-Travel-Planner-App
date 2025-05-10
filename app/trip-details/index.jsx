import { View, Text, Image, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import moment from 'moment';
import FlightInfo from '../../components/TripDetails/FlightInfo';
import HotelList from '../../components/TripDetails/HotelList';
import PlannedTrip from '../../components/TripDetails/PlannedTrip';

export default function TripDetails() {
  const navigation = useNavigation();
  const { trip } = useLocalSearchParams();
  const [tripDetails, setTripDetails] = useState(null);
  const [tripPlan, setTripPlan] = useState(null);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: '',
    });

    try {
      const parsedTrip = JSON.parse(trip);
      setTripDetails(parsedTrip);

      // 🧠 Normalize tripPlan from either JSON or plain text
      let plan = parsedTrip.tripPlan;
      if (typeof plan?.planText === 'string') {
        try {
          plan = JSON.parse(plan.planText);
        } catch (err) {
          console.warn('⚠️ Failed to parse planText:', err);
          plan = {};
        }
      }
      setTripPlan(plan);
    } catch (e) {
      console.warn('⚠️ Failed to parse trip param:', e);
    }
  }, []);

  if (!tripDetails?.tripData?.locationInfo) {
    return (
      <View style={{ padding: 20 }}>
        <Text>Loading trip details...</Text>
      </View>
    );
  }

  const { startDate, endDate } = tripDetails.tripData;

  const formattedStartDate = startDate && moment(startDate).isValid()
    ? moment(startDate).format('DD MMM YYYY')
    : 'Start date unavailable';

  const formattedEndDate = endDate && moment(endDate).isValid()
    ? moment(endDate).format('DD MMM YYYY')
    : 'End date unavailable';

  const imageUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${tripDetails.tripData.locationInfo.photoRef}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`;

  return (
    <ScrollView>
      <Image
        source={{ uri: imageUrl }}
        style={{
          width: '100%',
          height: 280,
        }}
      />
      <View
        style={{
          padding: 15,
          backgroundColor: 'white',
          minHeight: '100%',
          marginTop: -30,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}
      >
        <Text
          style={{
            fontSize: 22,
            fontFamily: 'outfit-bold',
          }}
        >
          {tripPlan?.travelPlan?.location || 'Trip Location'}
        </Text>

        <Text
          style={{
            fontFamily: 'outfit',
            fontSize: 16,
            color: 'grey',
            marginTop: 5,
          }}
        >
          📅 {formattedStartDate} → {formattedEndDate}
        </Text>

        <Text style={{
          fontFamily: 'outfit',
          fontSize: 17,
          color: 'grey'
        }}>
          🚌 {tripDetails.tripData.traveller.title}
        </Text>

        {/* Flight Info */}
        <FlightInfo flightData={tripPlan?.flightDetails} />

        {/* Hotels List */}
        <HotelList hotelList={tripPlan?.hotelOptions} />

        {/* Trip Day planner Info */}
        <PlannedTrip details={tripPlan?.dailyItinerary} />
      </View>
    </ScrollView>
  );
}
