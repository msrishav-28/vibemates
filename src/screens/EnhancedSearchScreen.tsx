import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SearchBar } from '../components/SearchBar';
import { FilterChip } from '../components/FilterChip';
import { CommunityCard } from '../components/CommunityCard';
import { EventCard } from '../components/EventCard';
import { UserCard } from '../components/UserCard';
import { useDebounce } from '../hooks/useDebounce';
import { tokens } from '../theme/tokens';

type SearchFilter = 'all' | 'communities' | 'events' | 'people';

export const EnhancedSearchScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<SearchFilter>('all');
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const filters: { key: SearchFilter; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'communities', label: 'Communities' },
    { key: 'events', label: 'Events' },
    { key: 'people', label: 'People' },
  ];

  // Mock data - replace with actual search results
  const mockCommunities = [
    {
      id: '1',
      title: 'Local Photographers',
      memberCount: 234,
      tags: ['Photography', 'Art'],
      image: 'https://picsum.photos/300/200?random=1',
    },
    {
      id: '2',
      title: 'Weekend Hikers',
      memberCount: 156,
      tags: ['Hiking', 'Outdoors'],
      image: 'https://picsum.photos/300/200?random=2',
    },
  ];

  const mockEvents = [
    {
      id: '1',
      title: 'Photography Workshop',
      time: 'Today 2:00 PM',
      location: 'Central Park',
      attendees: 24,
      category: 'Photography',
      distance: '1.2km',
    },
    {
      id: '2',
      title: 'Morning Hike',
      time: 'Tomorrow 7:00 AM',
      location: 'Griffith Observatory',
      attendees: 12,
      category: 'Hiking',
      distance: '3.5km',
    },
  ];

  const mockUsers = [
    {
      id: '1',
      name: 'Sarah Johnson',
      location: 'Downtown LA',
      interests: ['Photography', 'Art', 'Coffee'],
      mutualConnections: 3,
      distance: '2.1km',
    },
    {
      id: '2',
      name: 'Mike Chen',
      location: 'Santa Monica',
      interests: ['Hiking', 'Fitness', 'Cooking'],
      mutualConnections: 1,
      distance: '5.2km',
    },
  ];

  const renderResults = () => {
    if (!debouncedSearchQuery.trim()) {
      return (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>
            Start typing to search for communities, events, and people
          </Text>
        </View>
      );
    }

    return (
      <ScrollView style={styles.results}>
        {(activeFilter === 'all' || activeFilter === 'communities') && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Communities</Text>
            {mockCommunities.map((community) => (
              <CommunityCard
                key={community.id}
                title={community.title}
                memberCount={community.memberCount}
                tags={community.tags}
                image={community.image}
                onPress={() => console.log('Community pressed:', community.title)}
              />
            ))}
          </View>
        )}

        {(activeFilter === 'all' || activeFilter === 'events') && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Events</Text>
            {mockEvents.map((event) => (
              <EventCard
                key={event.id}
                title={event.title}
                time={event.time}
                location={event.location}
                attendees={event.attendees}
                category={event.category}
                distance={event.distance}
              />
            ))}
          </View>
        )}

        {(activeFilter === 'all' || activeFilter === 'people') && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>People</Text>
            {mockUsers.map((user) => (
              <UserCard
                key={user.id}
                name={user.name}
                location={user.location}
                interests={user.interests}
                mutualConnections={user.mutualConnections}
                distance={user.distance}
              />
            ))}
          </View>
        )}
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search communities, events, people..."
      />
      
      <ScrollView 
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
        contentContainerStyle={styles.filterContent}
      >
        {filters.map((filter) => (
          <FilterChip
            key={filter.key}
            label={filter.label}
            selected={activeFilter === filter.key}
            onPress={() => setActiveFilter(filter.key)}
          />
        ))}
      </ScrollView>

      {renderResults()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: tokens.colors.background,
  },
  filterContainer: {
    maxHeight: 50,
  },
  filterContent: {
    paddingHorizontal: tokens.spacing.lg,
    paddingBottom: tokens.spacing.md,
  },
  results: {
    flex: 1,
  },
  section: {
    marginBottom: tokens.spacing.xl,
  },
  sectionTitle: {
    fontSize: tokens.typography.sizes.heading3,
    fontWeight: tokens.typography.weights.semibold,
    color: tokens.colors.text.primary,
    marginHorizontal: tokens.spacing.lg,
    marginBottom: tokens.spacing.md,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: tokens.spacing.xl,
  },
  emptyStateText: {
    fontSize: tokens.typography.sizes.body,
    color: tokens.colors.text.tertiary,
    textAlign: 'center',
  },
});
