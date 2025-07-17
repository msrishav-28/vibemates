import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../components/Button';
import { tokens } from '../../theme/tokens';

interface WelcomeScreenProps {
  navigation: any;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require('../../../assets/icon.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>Find Your Tribe</Text>
          <Text style={styles.subtitle}>
            Connect with people who share your hobbies and interests
          </Text>
        </View>
      </View>
      <View style={styles.footer}>
        <Button
          title="Get Started"
          onPress={() => navigation.navigate('SignUp')}
        />
        <Button
          title="I already have an account"
          onPress={() => navigation.navigate('SignIn')}
          variant="secondary"
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: tokens.layout.screenPadding,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: tokens.spacing.xl,
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: tokens.typography.sizes.heading1,
    fontWeight: tokens.typography.weights.bold,
    color: tokens.colors.text.primary,
    marginBottom: tokens.spacing.md,
  },
  subtitle: {
    fontSize: tokens.typography.sizes.body,
    color: tokens.colors.text.secondary,
    textAlign: 'center',
    lineHeight: tokens.typography.sizes.body * tokens.typography.lineHeights.normal,
  },
  footer: {
    paddingHorizontal: tokens.layout.screenPadding,
    paddingBottom: tokens.spacing.xl,
    gap: tokens.spacing.md,
  },
});
