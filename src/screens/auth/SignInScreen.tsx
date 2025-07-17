import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { Button } from '../../components/Button';
import { tokens } from '../../theme/tokens';
import { authService } from '../../services/auth';

interface SignInScreenProps {
  navigation: any;
}

export const SignInScreen: React.FC<SignInScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignIn = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await authService.signIn(email, password);
      navigation.navigate('Home');
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Icon name="chevron-back" size={24} color={tokens.colors.text.primary} />
          </TouchableOpacity>

          <View style={styles.header}>
            <Text style={styles.title}>Welcome back</Text>
            <Text style={styles.subtitle}>Sign in to continue</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                placeholderTextColor={tokens.colors.text.tertiary}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[styles.input, styles.passwordInput]}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Enter your password"
                  placeholderTextColor={tokens.colors.text.tertiary}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() => setShowPassword(!showPassword)}>
                  <Icon
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    color={tokens.colors.text.secondary}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot password?</Text>
            </TouchableOpacity>

            {error ? <Text style={styles.error}>{error}</Text> : null}
          </View>

          <View style={styles.footer}>
            <Button
              title="Sign In"
              onPress={handleSignIn}
              loading={loading}
              disabled={loading}
            />

            <View style={styles.signUpContainer}>
              <Text style={styles.signUpText}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.signUpLink}>Sign up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: tokens.colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  backButton: {
    marginLeft: tokens.spacing.md,
    marginTop: tokens.spacing.md,
  },
  header: {
    paddingHorizontal: tokens.layout.screenPadding,
    marginTop: tokens.spacing.xl,
    marginBottom: tokens.spacing.xl,
  },
  title: {
    fontSize: tokens.typography.sizes.heading1,
    fontWeight: tokens.typography.weights.bold,
    color: tokens.colors.text.primary,
    marginBottom: tokens.spacing.sm,
  },
  subtitle: {
    fontSize: tokens.typography.sizes.body,
    color: tokens.colors.text.secondary,
  },
  form: {
    paddingHorizontal: tokens.layout.screenPadding,
    flex: 1,
  },
  inputContainer: {
    marginBottom: tokens.spacing.lg,
  },
  label: {
    fontSize: tokens.typography.sizes.small,
    fontWeight: tokens.typography.weights.medium,
    color: tokens.colors.text.primary,
    marginBottom: tokens.spacing.sm,
  },
  input: {
    backgroundColor: tokens.colors.lightGray,
    borderRadius: tokens.radii.button,
    paddingHorizontal: tokens.spacing.md,
    paddingVertical: tokens.spacing.md,
    fontSize: tokens.typography.sizes.body,
    color: tokens.colors.text.primary,
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordInput: {
    paddingRight: tokens.spacing.xl + tokens.spacing.md,
  },
  eyeButton: {
    position: 'absolute',
    right: tokens.spacing.md,
    top: '50%',
    transform: [{ translateY: -10 }],
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: tokens.spacing.lg,
  },
  forgotPasswordText: {
    fontSize: tokens.typography.sizes.small,
    color: tokens.colors.info,
    fontWeight: tokens.typography.weights.medium,
  },
  error: {
    fontSize: tokens.typography.sizes.small,
    color: tokens.colors.danger,
    marginBottom: tokens.spacing.md,
  },
  footer: {
    paddingHorizontal: tokens.layout.screenPadding,
    paddingBottom: tokens.spacing.xl,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: tokens.spacing.lg,
  },
  signUpText: {
    fontSize: tokens.typography.sizes.body,
    color: tokens.colors.text.secondary,
  },
  signUpLink: {
    fontSize: tokens.typography.sizes.body,
    color: tokens.colors.info,
    fontWeight: tokens.typography.weights.semibold,
  },
});
