// src/screens/HobbySelectionScreen.tsx
import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { InterestButton } from '../components/InterestButton';
import { Button } from '../components/Button';
import { useUserStore } from '../store';
import { INTERESTS_DATA } from '../constants/interests';
import { tokens } from '../theme/tokens';

interface HobbySelectionScreenProps {
  navigation: any;
}

export const HobbySelectionScreen: React.FC<HobbySelectionScreenProps> = ({ navigation }) => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const { setInterests, setOnboarded } = useUserStore();

  const toggleInterest = (id: string) => {
    setSelectedInterests(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleStart = () => {
    if (selectedInterests.length > 0) {
      // Save selected interests to store
      const selectedLabels = selectedInterests.map(id => {
        const interest = INTERESTS_DATA.find(i => i.id === id);
        return interest?.label || '';
      }).filter(Boolean);
      
      setInterests(selectedLabels);
      setOnboarded(true);
      navigation.navigate('Home');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Select hobbies{'\n'}& interests.</Text>
        
        <FlatList
          data={INTERESTS_DATA}
          numColumns={3}
          keyExtractor={item => item.id}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.grid}
          renderItem={({ item }) => (
            <InterestButton
              label={item.label}
              icon={item.icon}
              selected={selectedInterests.includes(item.id)}
              color={item.color}
              onPress={() => toggleInterest(item.id)}
            />
          )}
        />
      </View>
      
      <View style={styles.footer}>
        <Button
          title="Start →"
          onPress={handleStart}
          disabled={selectedInterests.length === 0}
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
  content: {
    flex: 1,
    paddingHorizontal: tokens.layout.screenPadding,
  },
  title: {
    fontSize: tokens.typography.sizes.heading1,
    fontWeight: tokens.typography.weights.bold,
    color: tokens.colors.text.primary,
    marginTop: tokens.spacing.xl,
    marginBottom: tokens.spacing.xl,
  },
  grid: {
    paddingBottom: tokens.spacing.xl,
  },
  row: {
    justifyContent: 'space-between',
  },
  footer: {
    paddingHorizontal: tokens.layout.screenPadding,
    paddingBottom: tokens.spacing.lg,
  },
});