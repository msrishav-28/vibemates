import * as Location from 'expo-location';

export interface LocationCoords {
  latitude: number;
  longitude: number;
}

export const getCurrentLocation = async (): Promise<LocationCoords | null> => {
  try {
    // Request permissions
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
      return null;
    }

    // Get current position
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });

    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
  } catch (error) {
    console.error('Error getting location:', error);
    return null;
  }
};

export const calculateDistance = (
  coord1: LocationCoords,
  coord2: LocationCoords
): number => {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = deg2rad(coord2.latitude - coord1.latitude);
  const dLon = deg2rad(coord2.longitude - coord1.longitude);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(coord1.latitude)) *
      Math.cos(deg2rad(coord2.latitude)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  return distance * 1000; // Convert to meters
};

const deg2rad = (deg: number): number => {
  return deg * (Math.PI / 180);
};

export const getLocationName = async (coords: LocationCoords): Promise<string> => {
  try {
    const [result] = await Location.reverseGeocodeAsync(coords);
    if (result) {
      return `${result.city || result.subregion || result.region || 'Unknown Location'}`;
    }
    return 'Unknown Location';
  } catch (error) {
    console.error('Error getting location name:', error);
    return 'Unknown Location';
  }
};
