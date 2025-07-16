// src/screens/ProfileScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { tokens } from '../theme/tokens';

const USER_DATA = {
  name: 'Makenna Donin',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
  location: 'San Francisco, CA',
  joinDate: 'Joined March 2024',
  interests: ['Running', 'Yoga', 'Cooking', 'Photography'],
  stats: {
    communities: 5,
    events: 12,
    friends: 48,
  },
};

interface ProfileScreenProps {
  navigation: any;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationSharing, setLocationSharing] = useState(true);

  const ProfileStat = ({ label, value }: { label: string; value: number }) => (
    <View style={styles.stat}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );

  const MenuItem = ({ 
    icon, 
    title, 
    rightElement, 
    onPress 
  }: { 
    icon: string; 
    title: string; 
    rightElement?: React.ReactNode; 
    onPress?: () => void;
  }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuItemLeft}>
        <Icon name={icon} size={24} color={tokens.colors.text.secondary} />
        <Text style={styles.menuItemText}>{title}</Text>
      </View>
      {rightElement || <Icon name="chevron-forward" size={20} color={tokens.colors.text.tertiary} />}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.profileInfo}>
            <Image source={{ uri: USER_DATA.avatar }} style={styles.avatar} />
            <Text style={styles.name}>{USER_DATA.name}</Text>
            <Text style={styles.location}>
              <Icon name="location-outline" size={16} color={tokens.colors.text.tertiary} />
              {' '}{USER_DATA.location}
            </Text>
            <Text style={styles.joinDate}>{USER_DATA.joinDate}</Text>
          </View>

          <View style={styles.stats}>
            <ProfileStat label="Communities" value={USER_DATA.stats.communities} />
            <ProfileStat label="Events" value={USER_DATA.stats.events} />
            <ProfileStat label="Friends" value={USER_DATA.stats.friends} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Interests</Text>
          <View style={styles.interests}>
            {USER_DATA.interests.map((interest, index) => (
              <View key={index} style={styles.interestTag}>
                <Text style={styles.interestText}>{interest}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          
          <MenuItem
            icon="notifications-outline"
            title="Notifications"
            rightElement={
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: tokens.colors.lightGray, true: tokens.colors.primary }}
                thumbColor={tokens.colors.background}
              />
            }
          />
          
          <MenuItem
            icon="location-outline"
            title="Location Sharing"
            rightElement={
              <Switch
                value={locationSharing}
                onValueChange={setLocationSharing}
                trackColor={{ false: tokens.colors.lightGray, true: tokens.colors.primary }}
                thumbColor={tokens.colors.background}
              />
            }
          />
          
          <MenuItem
            icon="person-outline"
            title="Edit Profile"
            onPress={() => console.log('Edit Profile')}
          />
          
          <MenuItem
            icon="shield-outline"
            title="Privacy & Safety"
            onPress={() => console.log('Privacy')}
          />
          
          <MenuItem
            icon="help-circle-outline"
            title="Help & Support"
            onPress={() => console.log('Help')}
          />
          
          <MenuItem
            icon="information-circle-outline"
            title="About"
            onPress={() => console.log('About')}
          />
        </View>

        <TouchableOpacity style={styles.logoutButton}>
          <Icon name="log-out-outline" size={20} color={tokens.colors.danger} />
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: tokens.colors.background,
  },
  header: {
    alignItems: 'center',
    paddingVertical: tokens.spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: tokens.colors.lightGray,
  },
  profileInfo: {
    alignItems: 'center',
    marginBottom: tokens.spacing.xl,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: tokens.radii.full,
    marginBottom: tokens.spacing.md,
  },
  name: {
    fontSize: tokens.typography.sizes.heading2,
    fontWeight: tokens.typography.weights.bold,
    color: tokens.colors.text.primary,
    marginBottom: tokens.spacing.xs,
  },
  location: {
    fontSize: tokens.typography.sizes.body,
    color: tokens.colors.text.secondary,
    marginBottom: tokens.spacing.xs,
  },
  joinDate: {
    fontSize: tokens.typography.sizes.small,
    color: tokens.colors.text.tertiary,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: tokens.spacing.xl,
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: tokens.typography.sizes.heading2,
    fontWeight: tokens.typography.weights.bold,
    color: tokens.colors.text.primary,
  },
  statLabel: {
    fontSize: tokens.typography.sizes.small,
    color: tokens.colors.text.secondary,
    marginTop: tokens.spacing.xs,
  },
  section: {
    paddingHorizontal: tokens.layout.screenPadding,
    paddingVertical: tokens.spacing.xl,
  },
  sectionTitle: {
    fontSize: tokens.typography.sizes.heading3,
    fontWeight: tokens.typography.weights.semibold,
    color: tokens.colors.text.primary,
    marginBottom: tokens.spacing.md,
  },
  interests: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  interestTag: {
    backgroundColor: tokens.colors.lightGray,
    paddingHorizontal: tokens.spacing.md,
    paddingVertical: tokens.spacing.sm,
    borderRadius: tokens.radii.chip,
    marginRight: tokens.spacing.sm,
    marginBottom: tokens.spacing.sm,
  },
  interestText: {
    fontSize: tokens.typography.sizes.small,
    color: tokens.colors.text.primary,
    fontWeight: tokens.typography.weights.medium,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: tokens.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: tokens.colors.lightGray,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: tokens.typography.sizes.body,
    color: tokens.colors.text.primary,
    marginLeft: tokens.spacing.md,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: tokens.layout.screenPadding,
    marginVertical: tokens.spacing.xl,
    paddingVertical: tokens.spacing.md,
  },
  logoutText: {
    fontSize: tokens.typography.sizes.body,
    color: tokens.colors.danger,
    fontWeight: tokens.typography.weights.medium,
    marginLeft: tokens.spacing.sm,
  },
});
