import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  Image,
  TextInput
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

interface MapScreenProps {
  navigation: any;
}

const NEARBY_COMMUNITIES = [
  {
    id: '1',
    title: 'Morning Runners',
    distance: '0.2 km',
    members: 24,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200',
  },
  {
    id: '2',
    title: 'Photography Club',
    distance: '0.5 km',
    members: 18,
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=200',
  },
  {
    id: '3',
    title: 'Book Reading',
    distance: '0.8 km',
    members: 32,
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200',
  },
];

export const MapScreen: React.FC<MapScreenProps> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={24} color="#2D3436" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Explore Map</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Icon name="options-outline" size={24} color="#2D3436" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Icon name="search" size={20} color="#74788D" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search communities near you"
            placeholderTextColor="#74788D"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.locationButton}>
          <Icon name="locate" size={20} color="#6C5CE7" />
        </TouchableOpacity>
      </View>

      {/* Map Placeholder */}
      <View style={styles.mapContainer}>
        <View style={styles.mapPlaceholder}>
          <Icon name="map" size={48} color="#B0B3B8" />
          <Text style={styles.mapText}>Interactive Map View</Text>
          <Text style={styles.mapSubtext}>Showing communities in your area</Text>
        </View>
        
        {/* Location Pins Overlay */}
        <View style={[styles.pin, { top: 120, left: 80 }]}>
          <View style={styles.pinInner} />
        </View>
        <View style={[styles.pin, { top: 180, right: 100 }]}>
          <View style={styles.pinInner} />
        </View>
        <View style={[styles.pin, { bottom: 160, left: 120 }]}>
          <View style={styles.pinInner} />
        </View>
      </View>

      {/* Nearby Communities */}
      <View style={styles.bottomSheet}>
        <View style={styles.bottomSheetHandle} />
        <Text style={styles.bottomSheetTitle}>Nearby Communities</Text>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.communitiesList}
        >
          {NEARBY_COMMUNITIES.map((community) => (
            <TouchableOpacity 
              key={community.id} 
              style={styles.communityCard}
              onPress={() => navigation.navigate('CommunityDetail', { community })}
            >
              <Image source={{ uri: community.image }} style={styles.communityImage} />
              <View style={styles.communityInfo}>
                <Text style={styles.communityTitle}>{community.title}</Text>
                <View style={styles.communityMeta}>
                  <Icon name="location" size={12} color="#74788D" />
                  <Text style={styles.communityDistance}>{community.distance}</Text>
                  <Text style={styles.communityMembers}> • {community.members} members</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3436',
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#2D3436',
    marginLeft: 8,
  },
  locationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F3F2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#E8F4FD',
  },
  mapPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3436',
    marginTop: 16,
  },
  mapSubtext: {
    fontSize: 14,
    color: '#74788D',
    marginTop: 8,
  },
  pin: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#6C5CE7',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6C5CE7',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  pinInner: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'white',
  },
  bottomSheet: {
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 16,
    paddingHorizontal: 20,
    paddingBottom: 34,
    maxHeight: 200,
  },
  bottomSheetHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#D1D5DB',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  bottomSheetTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3436',
    marginBottom: 16,
  },
  communitiesList: {
    paddingRight: 20,
  },
  communityCard: {
    width: 140,
    marginRight: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  communityImage: {
    width: '100%',
    height: 80,
    resizeMode: 'cover',
  },
  communityInfo: {
    padding: 12,
  },
  communityTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D3436',
    marginBottom: 6,
  },
  communityMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  communityDistance: {
    fontSize: 11,
    color: '#74788D',
    marginLeft: 2,
  },
  communityMembers: {
    fontSize: 11,
    color: '#74788D',
  },
});