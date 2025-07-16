import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';
import { SearchBar } from '../components/SearchBar';
import { FilterChip } from '../components/FilterChip';
import { useLocation } from '../hooks/useLocation';
import { tokens } from '../theme/tokens';

interface MapMarkerData {
  id: string;
  title: string;
  description: string;
  type: 'community' | 'event';
  category: string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
  memberCount?: number;
  attendeeCount?: number;
}

export const EnhancedMapScreen: React.FC = () => {
  const { location, loading, error } = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'communities' | 'events'>('all');
  const [mapMarkers, setMapMarkers] = useState<MapMarkerData[]>([]);

  const filters = [
    { key: 'all' as const, label: 'All' },
    { key: 'communities' as const, label: 'Communities' },
    { key: 'events' as const, label: 'Events' },
  ];

  // Mock markers data
  const mockMarkers: MapMarkerData[] = [
    {
      id: '1',
      title: 'Photography Meetup',
      description: 'Weekly photography group',
      type: 'community',
      category: 'Photography',
      coordinate: { latitude: 34.0522, longitude: -118.2437 },
      memberCount: 234,
    },
    {
      id: '2',
      title: 'Hiking Group',
      description: 'Weekend hiking adventures',
      type: 'community',
      category: 'Hiking',
      coordinate: { latitude: 34.0822, longitude: -118.2637 },
      memberCount: 156,
    },
    {
      id: '3',
      title: 'Coffee & Code',
      description: 'Developer meetup this Saturday',
      type: 'event',
      category: 'Technology',
      coordinate: { latitude: 34.0422, longitude: -118.2537 },
      attendeeCount: 45,
    },
  ];

  useEffect(() => {
    // Filter markers based on selected filter
    let filteredMarkers = mockMarkers;
    
    if (selectedFilter !== 'all') {
      filteredMarkers = mockMarkers.filter(marker => 
        selectedFilter === 'communities' ? marker.type === 'community' : marker.type === 'event'
      );
    }
    
    // Apply search filter
    if (searchQuery.trim()) {
      filteredMarkers = filteredMarkers.filter(marker =>
        marker.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        marker.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setMapMarkers(filteredMarkers);
  }, [selectedFilter, searchQuery]);

  const getMarkerColor = (type: 'community' | 'event'): string => {
    return type === 'community' ? tokens.colors.primary : tokens.colors.info;
  };

  const handleLocationError = () => {
    Alert.alert(
      'Location Access',
      'Unable to access your location. Please enable location services and try again.',
      [{ text: 'OK' }]
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Getting your location...</Text>
      </View>
    );
  }

  if (error || !location) {
    return (
      <View style={styles.errorContainer}>
        <Icon name="location-outline" size={48} color={tokens.colors.mediumGray} />
        <Text style={styles.errorText}>Unable to load map</Text>
        <TouchableOpacity style={styles.retryButton} onPress={handleLocationError}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search nearby communities and events..."
        />
        
        <View style={styles.filterContainer}>
          {filters.map((filter) => (
            <FilterChip
              key={filter.key}
              label={filter.label}
              selected={selectedFilter === filter.key}
              onPress={() => setSelectedFilter(filter.key)}
            />
          ))}
        </View>
      </View>

      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        {mapMarkers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}
            pinColor={getMarkerColor(marker.type)}
          >
            <View style={[
              styles.customMarker,
              { backgroundColor: getMarkerColor(marker.type) }
            ]}>
              <Icon
                name={marker.type === 'community' ? 'people' : 'calendar'}
                size={16}
                color={tokens.colors.text.inverse}
              />
            </View>
          </Marker>
        ))}
      </MapView>

      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: tokens.colors.primary }]} />
          <Text style={styles.legendText}>Communities</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: tokens.colors.info }]} />
          <Text style={styles.legendText}>Events</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: tokens.colors.background,
  },
  searchContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: tokens.colors.background,
    paddingTop: tokens.spacing.md,
    paddingBottom: tokens.spacing.sm,
    ...tokens.shadows.sm,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: tokens.spacing.lg,
  },
  map: {
    flex: 1,
    marginTop: 140, // Account for search container
  },
  customMarker: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: tokens.colors.background,
  },
  legendContainer: {
    position: 'absolute',
    bottom: tokens.spacing.xl,
    left: tokens.spacing.lg,
    backgroundColor: tokens.colors.background,
    borderRadius: tokens.radii.md,
    padding: tokens.spacing.md,
    ...tokens.shadows.default,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: tokens.spacing.xs,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: tokens.spacing.sm,
  },
  legendText: {
    fontSize: tokens.typography.sizes.small,
    color: tokens.colors.text.secondary,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: tokens.colors.background,
  },
  loadingText: {
    fontSize: tokens.typography.sizes.body,
    color: tokens.colors.text.secondary,
    marginTop: tokens.spacing.md,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: tokens.colors.background,
    paddingHorizontal: tokens.spacing.xl,
  },
  errorText: {
    fontSize: tokens.typography.sizes.body,
    color: tokens.colors.text.secondary,
    textAlign: 'center',
    marginVertical: tokens.spacing.md,
  },
  retryButton: {
    backgroundColor: tokens.colors.primary,
    paddingHorizontal: tokens.spacing.lg,
    paddingVertical: tokens.spacing.md,
    borderRadius: tokens.radii.button,
  },
  retryText: {
    fontSize: tokens.typography.sizes.body,
    fontWeight: tokens.typography.weights.semibold,
    color: tokens.colors.text.inverse,
  },
});
