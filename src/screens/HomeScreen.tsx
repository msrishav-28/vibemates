// src/screens/HomeScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, FlatList, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Header } from '../components/Header';
import { FilterPills } from '../components/FilterPills';
import { CommunityCard } from '../components/CommunityCard';
import { useUserStore, useCommunitiesStore } from '../store';
import { MOCK_COMMUNITIES } from '../data/mockData';
import { Community } from '../types';
import { tokens } from '../theme/tokens';

const FILTERS = ['For you', 'Most popular'];

interface HomeScreenProps {
  navigation: any;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [activeFilter, setActiveFilter] = useState('For you');
  const { user, interests } = useUserStore();
  const { communities, setCommunities, joinCommunity, isJoined } = useCommunitiesStore();

  useEffect(() => {
    // Load communities from mock data
    setCommunities(MOCK_COMMUNITIES);
  }, [setCommunities]);

  const sportCommunities = communities.filter(c => c.category === 'Sport');
  const cookingCommunities = communities.filter(c => c.category === 'Cooking');
  const artCommunities = communities.filter(c => c.category === 'Art');

  const handleCommunityPress = (community: Community) => {
    navigation.navigate('CommunityDetail', { communityId: community.id });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        userName={user?.name || "Welcome"}
        userAvatar={user?.avatar || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200"}
        onSearchPress={() => navigation.navigate('Search')}
      />
      
      <FilterPills
        filters={FILTERS}
        activeFilter={activeFilter}
        onFilterPress={setActiveFilter}
        showCreateButton
      />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {sportCommunities.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Sport communities</Text>
              <Text style={styles.activeCount}>{sportCommunities.length} active</Text>
            </View>
            
            <FlatList
              horizontal
              data={sportCommunities}
              keyExtractor={item => item.id}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}
              renderItem={({ item }) => (
                <CommunityCard
                  title={item.title}
                  memberCount={item.memberCount}
                  tags={item.tags}
                  image={item.image}
                  onPress={() => handleCommunityPress(item)}
                />
              )}
            />
          </View>
        )}
        
        {cookingCommunities.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Cooking communities</Text>
              <Text style={styles.activeCount}>{cookingCommunities.length} active</Text>
            </View>
            
            <FlatList
              horizontal
              data={cookingCommunities}
              keyExtractor={item => item.id}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}
              renderItem={({ item }) => (
                <CommunityCard
                  title={item.title}
                  memberCount={item.memberCount}
                  tags={item.tags}
                  image={item.image}
                  onPress={() => handleCommunityPress(item)}
                />
              )}
            />
          </View>
        )}

        {artCommunities.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Art & Creative</Text>
              <Text style={styles.activeCount}>{artCommunities.length} active</Text>
            </View>
            
            <FlatList
              horizontal
              data={artCommunities}
              keyExtractor={item => item.id}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}
              renderItem={({ item }) => (
                <CommunityCard
                  title={item.title}
                  memberCount={item.memberCount}
                  tags={item.tags}
                  image={item.image}
                  onPress={() => handleCommunityPress(item)}
                />
              )}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: tokens.colors.background,
  },
  section: {
    marginBottom: tokens.spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: tokens.layout.screenPadding,
    marginBottom: tokens.spacing.md,
  },
  sectionTitle: {
    fontSize: tokens.typography.sizes.heading3,
    fontWeight: tokens.typography.weights.semibold,
    color: tokens.colors.text.primary,
  },
  activeCount: {
    fontSize: tokens.typography.sizes.small,
    color: tokens.colors.text.secondary,
  },
  viewAll: {
    fontSize: tokens.typography.sizes.small,
    color: tokens.colors.info,
    fontWeight: tokens.typography.weights.medium,
  },
  horizontalList: {
    paddingHorizontal: tokens.layout.screenPadding,
  },
});