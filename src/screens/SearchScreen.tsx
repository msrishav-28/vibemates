import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  FlatList, 
  TouchableOpacity,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { MOCK_COMMUNITIES } from '../data/mockData';
import { Community } from '../types';

interface SearchScreenProps {
  navigation: any;
  route?: {
    params?: {
      category?: string;
    };
  };
}

export const SearchScreen: React.FC<SearchScreenProps> = ({ navigation, route }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCommunities, setFilteredCommunities] = useState<Community[]>(MOCK_COMMUNITIES);
  const [selectedCategory, setSelectedCategory] = useState<string>(route?.params?.category || 'All');

  const categories = ['All', 'Sport', 'Cooking', 'Art', 'Technology'];

  useEffect(() => {
    let filtered = MOCK_COMMUNITIES;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(community => community.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(community =>
        community.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        community.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        community.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    setFilteredCommunities(filtered);
  }, [searchQuery, selectedCategory]);

  const renderCommunityItem = ({ item }: { item: Community }) => (
    <TouchableOpacity
      style={styles.communityItem}
      onPress={() => navigation.navigate('CommunityDetail', { community: item })}
    >
      <Image source={{ uri: item.image }} style={styles.communityImage} />
      <View style={styles.communityInfo}>
        <Text style={styles.communityTitle}>{item.title}</Text>
        <Text style={styles.communityDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.communityMeta}>
          <Icon name="people" size={14} color="#74788D" />
          <Text style={styles.memberCount}>{item.memberCount} members</Text>
          <Text style={styles.category}>• {item.category}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Icon name="chevron-back" size={24} color="#2D3436" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Search Communities</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Icon name="search" size={20} color="#74788D" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search communities, interests..."
            placeholderTextColor="#74788D"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Icon name="close-circle" size={20} color="#74788D" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Category Filters */}
      <View style={styles.categoriesContainer}>
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.categoryButton,
                selectedCategory === item && styles.activeCategoryButton
              ]}
              onPress={() => setSelectedCategory(item)}
            >
              <Text style={[
                styles.categoryText,
                selectedCategory === item && styles.activeCategoryText
              ]}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          contentContainerStyle={styles.categoriesList}
        />
      </View>

      {/* Results */}
      <View style={styles.resultsContainer}>
        <Text style={styles.resultsCount}>
          {filteredCommunities.length} communities found
        </Text>
        
        <FlatList
          data={filteredCommunities}
          renderItem={renderCommunityItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.communitiesList}
        />
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
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3436',
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'white',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#2D3436',
    marginLeft: 8,
  },
  categoriesContainer: {
    backgroundColor: 'white',
    paddingVertical: 12,
  },
  categoriesList: {
    paddingHorizontal: 20,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'transparent',
    marginRight: 12,
  },
  activeCategoryButton: {
    backgroundColor: '#F3F2FF',
  },
  categoryText: {
    fontSize: 14,
    color: '#74788D',
    fontWeight: '500',
  },
  activeCategoryText: {
    color: '#6C5CE7',
    fontWeight: '600',
  },
  resultsContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  resultsCount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3436',
    marginBottom: 16,
  },
  communitiesList: {
    paddingBottom: 20,
  },
  communityItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  communityImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 16,
  },
  communityInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  communityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3436',
    marginBottom: 6,
  },
  communityDescription: {
    fontSize: 14,
    color: '#74788D',
    lineHeight: 20,
    marginBottom: 8,
  },
  communityMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  memberCount: {
    fontSize: 12,
    color: '#74788D',
    marginLeft: 4,
  },
  category: {
    fontSize: 12,
    color: '#74788D',
    marginLeft: 4,
  },
});