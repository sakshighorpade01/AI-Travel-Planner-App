import { View, Text } from 'react-native';
import React from 'react';

export default function PlannedTrip({ details }) {
  if (!details || !Array.isArray(details) || details.length === 0) {
    return (
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontFamily: 'outfit', fontSize: 16, color: 'gray' }}>
          No plan details available.
        </Text>
      </View>
    );
  }

  return (
    <View style={{ marginTop: 20 }}>
      <Text style={{ fontFamily: 'outfit-bold', fontSize: 20 }}>
        🏕️ Plan Details
      </Text>

      {details.map((day, index) => {
        const items = day.schedule || day.activities || [];

        return (
          <View
            key={index}
            style={{
              marginTop: 15,
              borderWidth: 1,
              padding: 10,
              borderRadius: 15,
              borderColor: 'gray',
            }}
          >
            <Text
              style={{
                fontFamily: 'outfit-bold',
                fontSize: 18,
                marginBottom: 6,
              }}
            >
              🗓️ Day {day.day || index + 1}: {day.theme || 'No Theme'}
            </Text>

            {items.map((item, idx) => (
              <View key={idx} style={{ marginBottom: 10 }}>
                <Text style={{ fontFamily: 'outfit-medium', fontSize: 16 }}>
                  🕒 {item.time || item.timeOfDay || 'Time not specified'}
                </Text>
                <Text style={{ fontFamily: 'outfit-bold', fontSize: 15 }}>
                  📍 {item.placeName || item.activity || 'Activity not specified'}
                </Text>
                <Text
                  style={{
                    fontFamily: 'outfit',
                    fontSize: 14,
                    color: 'gray',
                  }}
                >
                  {item.details || item.description || ''}
                </Text>
                {item.bestTimeToVisit && (
                  <Text
                    style={{
                      fontFamily: 'outfit',
                      fontSize: 13,
                      color: 'darkgray',
                    }}
                  >
                    🕰️ Best Time: {item.bestTimeToVisit}
                  </Text>
                )}
                {item.travelTimeToNext || item.travelTimeFromPrevious ? (
                  <Text style={{ fontSize: 12, color: 'gray' }}>
                    🚗 Travel: {item.travelTimeToNext || item.travelTimeFromPrevious}
                  </Text>
                ) : null}
              </View>
            ))}
          </View>
        );
      })}
    </View>
  );
}
