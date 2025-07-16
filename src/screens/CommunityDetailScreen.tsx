// src/screens/CommunityDetailScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Button } from '../components/Button';
import { tokens } from '../theme/tokens';

interface Comment {
  id: string;
  user: string;
  avatar: string;
  text: string;
  time: string;
}

const COMMENTS: Comment[] = [
  {
    id: '1',
    user: 'Nolan Bator',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200',
    text: "I'll come for a run. Cool idea! 😊",
    time: '2 min',
  },
  {
    id: '2',
    user: 'Lindsey Saris',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200',
    text: 'I will also be running on Sunday. We can organize races for children.',
    time: '1 hour',
  },
];

interface CommunityDetailScreenProps {
  navigation: any;
  route: any;
}

export const CommunityDetailScreen: React.FC<CommunityDetailScreenProps> = ({ navigation, route }) => {
  const [isJoined, setIsJoined] = useState(false);
  const { community } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Icon name="chevron-back" size={24} color={tokens.colors.text.primary} />
          </TouchableOpacity>
          
          <Image source={{ uri: community.image }} style={styles.headerImage} />
          
          <View style={styles.content}>
            <Text style={styles.title}>{community.title}</Text>
            
            <View style={styles.tags}>
              {community.tags.map((tag: string, index: number) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>#{tag}</Text>
                </View>
              ))}
            </View>
            
            <Text style={styles.memberCount}>{community.memberCount} members</Text>
            
            <Text style={styles.description}>
              Join our community for regular {community.title.toLowerCase()} sessions. 
              Connect with like-minded people and enjoy activities together!
            </Text>
            
            <View style={styles.commentsSection}>
              <Text style={styles.commentsTitle}>Comments</Text>
              {COMMENTS.map((comment) => (
                <View key={comment.id} style={styles.comment}>
                  <Image source={{ uri: comment.avatar }} style={styles.commentAvatar} />
                  <View style={styles.commentContent}>
                    <View style={styles.commentHeader}>
                      <Text style={styles.commentUser}>{comment.user}</Text>
                      <Text style={styles.commentTime}>{comment.time}</Text>
                    </View>
                    <Text style={styles.commentText}>{comment.text}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
        
        <View style={styles.footer}>
          <Button
            title={isJoined ? "Leave" : "Join"}
            onPress={() => setIsJoined(!isJoined)}
            variant={isJoined ? "secondary" : "primary"}
          />
        </View>
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
  backButton: {
    position: 'absolute',
    top: 50,
    left: tokens.layout.screenPadding,
    zIndex: 1,
    backgroundColor: tokens.colors.background,
    borderRadius: tokens.radii.full,
    padding: 8,
  },
  headerImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  content: {
    padding: tokens.layout.screenPadding,
  },
  title: {
    fontSize: tokens.typography.sizes.heading1,
    fontWeight: tokens.typography.weights.bold,
    color: tokens.colors.text.primary,
    marginBottom: tokens.spacing.md,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: tokens.spacing.md,
  },
  tag: {
    backgroundColor: tokens.colors.lightGray,
    paddingHorizontal: tokens.spacing.sm,
    paddingVertical: tokens.spacing.xs,
    borderRadius: tokens.radii.sm,
    marginRight: tokens.spacing.xs,
    marginBottom: tokens.spacing.xs,
  },
  tagText: {
    fontSize: tokens.typography.sizes.small,
    color: tokens.colors.text.secondary,
  },
  memberCount: {
    fontSize: tokens.typography.sizes.body,
    color: tokens.colors.text.secondary,
    marginBottom: tokens.spacing.lg,
  },
  description: {
    fontSize: tokens.typography.sizes.body,
    color: tokens.colors.text.primary,
    lineHeight: tokens.typography.lineHeights.relaxed * tokens.typography.sizes.body,
    marginBottom: tokens.spacing.xl,
  },
  commentsSection: {
    marginBottom: tokens.spacing.xl,
  },
  commentsTitle: {
    fontSize: tokens.typography.sizes.heading3,
    fontWeight: tokens.typography.weights.semibold,
    color: tokens.colors.text.primary,
    marginBottom: tokens.spacing.md,
  },
  comment: {
    flexDirection: 'row',
    marginBottom: tokens.spacing.lg,
  },
  commentAvatar: {
    width: 40,
    height: 40,
    borderRadius: tokens.radii.full,
    marginRight: tokens.spacing.sm,
  },
  commentContent: {
    flex: 1,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: tokens.spacing.xs,
  },
  commentUser: {
    fontSize: tokens.typography.sizes.small,
    fontWeight: tokens.typography.weights.semibold,
    color: tokens.colors.text.primary,
  },
  commentTime: {
    fontSize: tokens.typography.sizes.tiny,
    color: tokens.colors.text.tertiary,
  },
  commentText: {
    fontSize: tokens.typography.sizes.body,
    color: tokens.colors.text.primary,
    lineHeight: tokens.typography.lineHeights.normal * tokens.typography.sizes.body,
  },
  footer: {
    padding: tokens.layout.screenPadding,
    borderTopWidth: 1,
    borderTopColor: tokens.colors.lightGray,
  },
});