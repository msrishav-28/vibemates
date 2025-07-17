import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { useUserStore } from '../store';
import { api } from '../services/api'; // Ensure this path is correct
import { tokens } from '../theme/tokens'; // Ensure this path is correct

// A simple button component for hobbies
const HobbyButton = ({ title, onPress, isSelected }: { title: string; onPress: () => void; isSelected: boolean; }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.hobbyButton, isSelected && styles.selectedHobbyButton]}
  >
    <Text style={[styles.hobbyText, isSelected && styles.selectedHobbyText]}>{title}</Text>
  </TouchableOpacity>
);

export const HobbySelectionScreen = () => {
  const { setOnboarded } = useUserStore(state => ({ setOnboarded: state.setOnboarded }));
  const [selectedHobbies, setSelectedHobbies] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(false);

  // You can replace this with a list from your API if needed
  const availableHobbies = ['Reading', 'Gaming', 'Hiking', 'Cooking', 'Coding', 'Sports', 'Music', 'Art'];

  const toggleHobby = (hobby: string) => {
    setSelectedHobbies(prev =>
      prev.includes(hobby) ? prev.filter(h => h !== hobby) : [...prev, hobby]
    );
  };

  const handleOnboardingComplete = async () => {
    console.log('--- Step 1: handleOnboardingComplete function was called! ---');
    if (selectedHobbies.length === 0) {
      Alert.alert('Please select at least one hobby.');
      return;
    }

    setLoading(true);
    try {
      // Update the user profile with interests AND onboarding status
      await api.users.updateProfile({ 
        interests: selectedHobbies,
        isOnboarded: true  // ← MAKE SURE THIS LINE IS HERE
      });

      // Update local state
      setOnboarded(true);
      
      console.log('--- Onboarding completed successfully! ---');
    } catch (error) {
      console.error("Failed to complete onboarding:", error);
      Alert.alert('Error', 'Could not save your hobbies. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Select Your Hobbies</Text>
        <Text style={styles.subtitle}>Choose a few things you're interested in.</Text>
        <View style={styles.hobbyContainer}>
          {availableHobbies.map(hobby => (
            <HobbyButton
              key={hobby}
              title={hobby}
              isSelected={selectedHobbies.includes(hobby)}
              onPress={() => toggleHobby(hobby)}
            />
          ))}
        </View>
      </View>
      <TouchableOpacity
        style={styles.continueButton}
        onPress={handleOnboardingComplete}
        disabled={loading}
      >
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.continueButtonText}>Continue</Text>}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  hobbyContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 30,
  },
  hobbyButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    margin: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedHobbyButton: {
    backgroundColor: tokens.colors.primary,
    borderColor: tokens.colors.primary,
  },
  hobbyText: {
    fontSize: 16,
    color: '#000',
  },
  selectedHobbyText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  continueButton: {
    backgroundColor: tokens.colors.primary,
    margin: 20,
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});