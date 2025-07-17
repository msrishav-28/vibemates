// src/screens/HomeScreen.tsx
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  FlatList, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity,
  Image,
  Dimensions,
  Animated
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useUserStore, useCommunitiesStore } from '../store';
import { MOCK_COMMUNITIES } from '../data/mockData';
import { Community } from '../types';

const { width } = Dimensions.get('window');

const FILTERS = ['For you', 'Most popular', 'Nearby', 'New'];

interface HomeScreenProps {
  navigation: any;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [activeFilter, setActiveFilter] = useState('For you');
  const { user, interests } = useUserStore();
  const { communities, setCommunities } = useCommunitiesStore();
  
  useEffect(() => {
    // Load mock communities on component mount
    setCommunities(MOCK_COMMUNITIES);
  }, [setCommunities]);

  // Filter communities based on user interests and selected filter
  const getFilteredCommunities = () => {
    let filtered = [...MOCK_COMMUNITIES];
    
    switch (activeFilter) {
      case 'For you':
        // Show communities that match user interests
        if (interests.length > 0) {
          filtered = filtered.filter(community => 
            community.tags.some(tag => 
              interests.some(interest => 
                interest.toLowerCase().includes(tag.toLowerCase()) ||
                tag.toLowerCase().includes(interest.toLowerCase())
              )
            )
          );
        }
        break;
      case 'Most popular':
        filtered = filtered.sort((a, b) => b.memberCount - a.memberCount);
        break;
      case 'Nearby':
        // In production, this would use actual location
        filtered = filtered.sort((a, b) => (a.id > b.id ? 1 : -1));
        break;
      case 'New':
        filtered = filtered.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      default:
        break;
    }
    
    return filtered;
  };

  // Get communities by category
  const getSportCommunities = () => 
    MOCK_COMMUNITIES.filter(c => c.category === 'Sport').slice(0, 3);
  
  const getCookingCommunities = () => 
    MOCK_COMMUNITIES.filter(c => c.category === 'Cooking').slice(0, 3);

  const renderCommunityCard = ({ item }: { item: Community }) => (
    <TouchableOpacity
      style={styles.communityCard}
      onPress={() => navigation.navigate('CommunityDetail', { community: item })}
      activeOpacity={0.9}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.communityImage} />
        <View style={styles.memberBadge}>
          <Icon name="people" size={12} color="white" />
          <Text style={styles.memberCount}>{item.memberCount}</Text>
        </View>
      </View>
      <View style={styles.communityInfo}>
        <Text style={styles.communityTitle} numberOfLines={2}>{item.title}</Text>
        <View style={styles.tagsContainer}>
          {item.tags.slice(0, 3).map((tag, index) => (
            <Text key={index} style={styles.tag}>#{tag} </Text>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <Image
              source={{ 
                uri: user?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face'
              }}
              style={styles.avatar}
            />
            <View style={styles.userTextInfo}>
              <Text style={styles.greeting}>Welcome back,</Text>
              <Text style={styles.userName}>{user?.name || 'Makenna Donin'}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.searchButton} activeOpacity={0.7}>
            <Icon name="search-outline" size={22} color="#74788D" />
          </TouchableOpacity>
        </View>

        {/* Filter Tabs */}
        <View style={styles.filterContainer}>
          {FILTERS.map((filter, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.filterTab, activeFilter === filter && styles.activeFilterTab]}
              onPress={() => setActiveFilter(filter)}
              activeOpacity={0.8}
            >
              <Text style={[styles.filterText, activeFilter === filter && styles.activeFilterText]}>
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.createButton} activeOpacity={0.8}>
            <Icon name="add" size={14} color="white" />
            <Text style={styles.createText}>Create</Text>
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
          {/* Sport Communities Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Sport communities</Text>
              <View style={styles.activeIndicator}>
                <Text style={styles.activeText}>4 active</Text>
              </View>
            </View>
            
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false} 
              contentContainerStyle={styles.horizontalScroll}
            >
              {getSportCommunities().map((community, index) => (
                <TouchableOpacity
                  key={community.id}
                  style={[styles.communityCard, { marginLeft: index === 0 ? 20 : 12 }]}
                  onPress={() => navigation.navigate('CommunityDetail', { community })}
                  activeOpacity={0.9}
                >
                  <View style={styles.imageContainer}>
                    <Image source={{ uri: community.image }} style={styles.communityImage} />
                    <View style={styles.memberBadge}>
                      <Icon name="people-outline" size={12} color="white" />
                      <Text style={styles.memberCount}>{community.memberCount}</Text>
                    </View>
                  </View>
                  <View style={styles.communityInfo}>
                    <Text style={styles.communityTitle}>{community.title}</Text>
                    <View style={styles.tagsContainer}>
                      {community.tags.slice(0, 3).map((tag, tagIndex) => (
                        <Text key={tagIndex} style={styles.tag}>#{tag}</Text>
                      ))}
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Cooking Posts Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Cooking posts</Text>
              <TouchableOpacity>
                <Text style={styles.viewAllText}>View all</Text>
              </TouchableOpacity>
            </View>
            
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalScroll}
            >
              {getCookingCommunities().map((post, index) => (
                <TouchableOpacity
                  key={post.id}
                  style={[styles.cookingCard, { marginLeft: index === 0 ? 20 : 12 }]}
                  activeOpacity={0.9}
                >
                  <Image source={{ uri: post.image }} style={styles.cookingImage} />
                  <Text style={styles.cookingTitle}>{post.title}</Text>
                  <View style={styles.cookingTags}>
                    {post.tags.map((tag, tagIndex) => (
                      <Text key={tagIndex} style={styles.cookingTag}>#{tag}</Text>
                    ))}
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </ScrollView>

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navButton} activeOpacity={0.7}>
            <Icon name="home" size={24} color="#6C5CE7" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton} activeOpacity={0.7}>
            <Icon name="add-outline" size={24} color="#A0A3BD" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton} activeOpacity={0.7}>
            <Icon name="search-outline" size={24} color="#A0A3BD" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton} activeOpacity={0.7}>
            <Icon name="paper-plane-outline" size={24} color="#A0A3BD" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingTop: 8,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userTextInfo: {
    justifyContent: 'center',
  },
  greeting: {
    fontSize: 14,
    color: '#74788D',
    fontWeight: '400',
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3436',
    marginTop: 2,
  },
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 24,
    marginTop: 8,
    alignItems: 'center',
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'transparent',
    marginRight: 12,
  },
  activeFilterTab: {
    backgroundColor: '#F3F2FF',
  },
  filterText: {
    fontSize: 14,
    color: '#74788D',
    fontWeight: '500',
  },
  activeFilterText: {
    color: '#6C5CE7',
    fontWeight: '600',
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6C5CE7',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginLeft: 'auto',
  },
  createText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3436',
  },
  activeIndicator: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  activeText: {
    fontSize: 12,
    color: '#1976D2',
    fontWeight: '500',
  },
  viewAllText: {
    fontSize: 14,
    color: '#6C5CE7',
    fontWeight: '500',
  },
  horizontalScroll: {
    paddingRight: 20,
  },
  communityCard: {
    width: 160,
    marginRight: 0,
    backgroundColor: 'white',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  imageContainer: {
    position: 'relative',
  },
  communityImage: {
    width: '100%',
    height: 120,
  },
  memberBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  memberCount: {
    color: 'white',
    fontSize: 11,
    fontWeight: '500',
    marginLeft: 2,
  },
  communityInfo: {
    padding: 12,
  },
  communityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3436',
    marginBottom: 6,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    fontSize: 12,
    color: '#74788D',
    marginRight: 4,
  },
  cookingCard: {
    width: 100,
    marginRight: 0,
  },
  cookingImage: {
    width: '100%',
    height: 80,
    borderRadius: 12,
    marginBottom: 8,
  },
  cookingTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D3436',
    marginBottom: 4,
  },
  cookingTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cookingTag: {
    fontSize: 11,
    color: '#74788D',
    marginRight: 4,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  navButton: {
    padding: 8,
  },
});