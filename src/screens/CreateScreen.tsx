// src/screens/CreateScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Button } from '../components/Button';
import { InterestButton } from '../components/InterestButton';
import { tokens } from '../theme/tokens';

const HOBBY_CATEGORIES = [
  { id: '1', label: 'Sports', icon: 'fitness-outline', color: tokens.colors.violet },
  { id: '2', label: 'Arts', icon: 'color-palette-outline', color: tokens.colors.pink },
  { id: '3', label: 'Music', icon: 'musical-notes-outline', color: tokens.colors.cyan },
  { id: '4', label: 'Cooking', icon: 'restaurant-outline', color: tokens.colors.lemon },
  { id: '5', label: 'Tech', icon: 'laptop-outline', color: tokens.colors.mint },
  { id: '6', label: 'Books', icon: 'book-outline', color: tokens.colors.peach },
];

interface CreateScreenProps {
  navigation: any;
}

export const CreateScreen: React.FC<CreateScreenProps> = ({ navigation }) => {
  const [communityName, setCommunityName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [location, setLocation] = useState('');

  const handleCreate = () => {
    if (!communityName || !description || !selectedCategory) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    Alert.alert(
      'Success',
      'Community created successfully!',
      [{ text: 'OK', onPress: () => navigation.navigate('HomeTab') }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="close-outline" size={24} color={tokens.colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.title}>Create Community</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.label}>Community Name *</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter community name"
            value={communityName}
            onChangeText={setCommunityName}
            placeholderTextColor={tokens.colors.text.tertiary}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Description *</Text>
          <TextInput
            style={[styles.textInput, styles.textArea]}
            placeholder="Describe your community and what activities you'll do together..."
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            placeholderTextColor={tokens.colors.text.tertiary}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Category *</Text>
          <View style={styles.categoryGrid}>
            {HOBBY_CATEGORIES.map((category) => (
              <InterestButton
                key={category.id}
                label={category.label}
                icon={category.icon}
                selected={selectedCategory === category.id}
                color={category.color}
                onPress={() => setSelectedCategory(category.id)}
              />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Location</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Where will you meet? (optional)"
            value={location}
            onChangeText={setLocation}
            placeholderTextColor={tokens.colors.text.tertiary}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Community Guidelines</Text>
          <View style={styles.guideline}>
            <Icon name="checkmark-circle" size={20} color={tokens.colors.success} />
            <Text style={styles.guidelineText}>Be respectful and inclusive</Text>
          </View>
          <View style={styles.guideline}>
            <Icon name="checkmark-circle" size={20} color={tokens.colors.success} />
            <Text style={styles.guidelineText}>Keep activities on-topic</Text>
          </View>
          <View style={styles.guideline}>
            <Icon name="checkmark-circle" size={20} color={tokens.colors.success} />
            <Text style={styles.guidelineText}>No spam or self-promotion</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Create Community"
          onPress={handleCreate}
          disabled={!communityName || !description || !selectedCategory}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: tokens.colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: tokens.layout.screenPadding,
    paddingVertical: tokens.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: tokens.colors.lightGray,
  },
  title: {
    fontSize: tokens.typography.sizes.heading3,
    fontWeight: tokens.typography.weights.bold,
    color: tokens.colors.text.primary,
  },
  content: {
    flex: 1,
    paddingHorizontal: tokens.layout.screenPadding,
  },
  section: {
    marginTop: tokens.spacing.xl,
  },
  label: {
    fontSize: tokens.typography.sizes.body,
    fontWeight: tokens.typography.weights.semibold,
    color: tokens.colors.text.primary,
    marginBottom: tokens.spacing.sm,
  },
  textInput: {
    backgroundColor: tokens.colors.lightGray,
    borderRadius: tokens.radii.button,
    paddingHorizontal: tokens.spacing.md,
    paddingVertical: tokens.spacing.md,
    fontSize: tokens.typography.sizes.body,
    color: tokens.colors.text.primary,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: tokens.typography.sizes.heading3,
    fontWeight: tokens.typography.weights.semibold,
    color: tokens.colors.text.primary,
    marginBottom: tokens.spacing.md,
  },
  guideline: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: tokens.spacing.sm,
  },
  guidelineText: {
    fontSize: tokens.typography.sizes.body,
    color: tokens.colors.text.secondary,
    marginLeft: tokens.spacing.sm,
  },
  footer: {
    padding: tokens.layout.screenPadding,
    borderTopWidth: 1,
    borderTopColor: tokens.colors.lightGray,
  },
});
