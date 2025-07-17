// src/screens/HobbySelectionScreen.tsx
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  Dimensions,
  Animated,
  ScrollView 
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useUserStore } from '../store';
import { INTERESTS_DATA } from '../constants/interests';

const { width } = Dimensions.get('window');
const CARD_SIZE = (width - 72) / 3; // 3 cards per row with better spacing

interface HobbySelectionScreenProps {
  navigation: any;
}

export const HobbySelectionScreen: React.FC<HobbySelectionScreenProps> = ({ navigation }) => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const { setInterests, setOnboarded } = useUserStore();
  const [animatedValues] = useState(() =>
    INTERESTS_DATA.map(() => new Animated.Value(1))
  );

  const toggleInterest = (id: string) => {
    const index = INTERESTS_DATA.findIndex(item => item.id === id);
    
    // Animate tap
    Animated.sequence([
      Animated.timing(animatedValues[index], {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValues[index], {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    setSelectedInterests(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleStart = () => {
    if (selectedInterests.length > 0) {
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
      <View style={styles.header}>
        <Text style={styles.title}>Select hobbies</Text>
        <Text style={styles.subtitle}>& interests.</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.grid}>
          {INTERESTS_DATA.map((interest, index) => {
            const isSelected = selectedInterests.includes(interest.id);
            return (
              <Animated.View
                key={interest.id}
                style={[
                  { transform: [{ scale: animatedValues[index] }] }
                ]}
              >
                <TouchableOpacity
                  style={[
                    styles.interestCard,
                    isSelected && styles.selectedCard,
                    { backgroundColor: isSelected ? interest.color + '20' : 'white' }
                  ]}
                  onPress={() => toggleInterest(interest.id)}
                  activeOpacity={0.8}
                >
                  <Icon 
                    name={interest.icon} 
                    size={32} 
                    color={isSelected ? interest.color : '#74788D'} 
                  />
                  <Text style={[
                    styles.interestText,
                    isSelected && { color: interest.color, fontWeight: '600' }
                  ]}>
                    {interest.label}
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.startButton,
            selectedInterests.length === 0 && styles.disabledButton
          ]}
          onPress={handleStart}
          disabled={selectedInterests.length === 0}
          activeOpacity={0.9}
        >
          <Text style={styles.startButtonText}>
            Start {selectedInterests.length > 0 ? `(${selectedInterests.length})` : ''}
          </Text>
          <Icon name="arrow-forward" size={18} color="white" style={styles.arrowIcon} />
        </TouchableOpacity>
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
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    color: '#2D3436',
    lineHeight: 40,
  },
  subtitle: {
    fontSize: 32,
    fontWeight: '600',
    color: '#2D3436',
    lineHeight: 40,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  interestCard: {
    width: CARD_SIZE,
    height: CARD_SIZE,
    backgroundColor: 'white',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: '#6C5CE7',
    shadowColor: '#6C5CE7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    transform: [{ scale: 1.02 }], // Subtle scale for selection
  },
  interestText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
    color: '#74788D',
    textAlign: 'center',
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 34,
    paddingTop: 20,
  },
  startButton: {
    backgroundColor: '#2D3436',
    height: 56,
    borderRadius: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  disabledButton: {
    backgroundColor: '#DDD6FE',
    shadowOpacity: 0,
    elevation: 0,
  },
  startButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  arrowIcon: {
    marginLeft: 4,
  },
});