import { View, Text, Image } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { CreateTripContext } from '../../context/CreateTripContext';
import { AI_PROMPT } from '../../constants/Options';
import { generateTripPlan } from '../../configs/AiModel';
import { useRouter } from 'expo-router';
import { auth, db } from './../../configs/FirebaseConfig';
import { setDoc, doc } from 'firebase/firestore';

export default function GenerateTrip() {
  const { tripData, setTripData } = useContext(CreateTripContext);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const user = auth.currentUser;

  useEffect(() => {
    GenerateAiTrip();
  }, []);

  const GenerateAiTrip = async () => {
    setLoading(true);

    const FINAL_PROMPT = AI_PROMPT
      .replaceAll('{location}', tripData?.locationInfo?.name)
      .replaceAll('{totalDays}', tripData.totalNoOfDays)
      .replaceAll('{totalNight}', tripData.totalNoOfDays - 1)
      .replaceAll('{traveller}', tripData?.traveller?.title)
      .replaceAll('{budget}', tripData?.budget);

    console.log('🧠 Final Prompt:', FINAL_PROMPT);

    try {
      const response = await generateTripPlan(FINAL_PROMPT);
      console.log('📨 Raw Gemini response:', response);

      let cleanResponse = response.trim().replace(/```(?:json)?\s*([\s\S]*?)\s*```/, '$1').trim();

      let parsedResponse;

      // Try direct parse
      try {
        parsedResponse = JSON.parse(cleanResponse);
        console.log('✅ Parsed as JSON:', parsedResponse);
      } catch (err) {
        // Fallback: extract inner JSON from text using regex
        console.warn('⚠️ First JSON parse failed, trying inner extraction...');
        const jsonMatch = cleanResponse.match(/{[\s\S]+}$/);
        if (jsonMatch) {
          try {
            parsedResponse = JSON.parse(jsonMatch[0]);
            console.log('✅ Extracted JSON from planText:', parsedResponse);
          } catch (innerErr) {
            console.error('❌ Inner JSON parse also failed:', innerErr);
            parsedResponse = { planText: cleanResponse };
          }
        } else {
          parsedResponse = { planText: cleanResponse };
        }
      }

      setTripData({ ...tripData, generatedPlan: parsedResponse });

      const docId = Date.now().toString();

      const cleanTripData = {
        ...tripData,
        startDate: tripData?.startDate?.toISOString?.() || tripData?.startDate,
        endDate: tripData?.endDate?.toISOString?.() || tripData?.endDate,
      };

      await setDoc(doc(db, 'UserTrips', docId), {
        userEmail: user?.email,
        tripPlan: parsedResponse,
        tripData: cleanTripData,
        createdAt: new Date().toISOString(),
        docId,
      });

      router.push('(tabs)/mytrip');
    } catch (error) {
      console.error('❌ Error generating AI trip:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ paddingTop: 72, backgroundColor: 'white', height: '100%' }}>
      <Text style={{ fontFamily: 'outfit-bold', fontSize: 35, textAlign: 'center' }}>
        Please Wait...
      </Text>
      <Text style={{ fontFamily: 'outfit-medium', fontSize: 16, textAlign: 'center', marginTop: 40 }}>
        We are working to generate your dream trip
      </Text>
      <Image
        source={require('./../../assets/images/plane1.gif')}
        style={{ width: '100%', height: 300, resizeMode: 'contain' }}
      />
      <Text style={{ fontFamily: 'outfit', color: 'grey', fontSize: 20, textAlign: 'center' }}>
        Do not Go Back
      </Text>
    </View>
  );
}
