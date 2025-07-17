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
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header with image and navigation */}
        <View style={styles.header}>
          <Image source={{ uri: community.image }} style={styles.headerImage} />
          <View style={styles.headerOverlay}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <Icon name="chevron-back" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareButton}>
              <Icon name="share-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.memberBadge}>
            <Icon name="people" size={14} color="white" />
            <Text style={styles.memberBadgeText}>{community.memberCount}</Text>
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.title}>{community.title}</Text>
          
          <View style={styles.tagsRow}>
            {community.tags.slice(0, 3).map((tag: string, index: number) => (
              <Text key={index} style={styles.tagText}>
                #{tag}{index < Math.min(2, community.tags.length - 1) ? ' ' : ''}
              </Text>
            ))}
          </View>

          <Text style={styles.description}>
            Join our vibrant community for regular {community.title.toLowerCase()} sessions. 
            Connect with passionate members, share experiences, and discover new aspects 
            of your favorite hobby. Everyone welcome!
          </Text>

          {/* Activity Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>24</Text>
              <Text style={styles.statLabel}>Events</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>5.0</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>2.1k</Text>
              <Text style={styles.statLabel}>Posts</Text>
            </View>
          </View>

          {/* Comments Section */}
          <View style={styles.commentsSection}>
            <View style={styles.commentsSectionHeader}>
              <Text style={styles.commentsTitle}>Recent Activity</Text>
              <Text style={styles.viewAllComments}>View All</Text>
            </View>
            
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
      
      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.chatButton}>
          <Icon name="chatbubble-outline" size={20} color="#6C5CE7" />
          <Text style={styles.chatButtonText}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.joinButton, isJoined && styles.joinedButton]}
          onPress={() => setIsJoined(!isJoined)}
        >
          <Text style={[styles.joinButtonText, isJoined && styles.joinedButtonText]}>
            {isJoined ? "Joined" : "Join Community"}
          </Text>
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
  scrollView: {
    flex: 1,
  },
  header: {
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: 280,
    resizeMode: 'cover',
  },
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    zIndex: 2,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  memberBadge: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  memberBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
  content: {
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
    paddingTop: 24,
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2D3436',
    marginBottom: 8,
  },
  tagsRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  tagText: {
    fontSize: 14,
    color: '#74788D',
    fontWeight: '500',
  },
  description: {
    fontSize: 16,
    color: '#2D3436',
    lineHeight: 24,
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    marginBottom: 24,
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2D3436',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#74788D',
    fontWeight: '500',
  },
  commentsSection: {
    marginBottom: 24,
  },
  commentsSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  commentsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3436',
  },
  viewAllComments: {
    fontSize: 14,
    color: '#6C5CE7',
    fontWeight: '500',
  },
  comment: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  commentAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  commentContent: {
    flex: 1,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  commentUser: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D3436',
  },
  commentTime: {
    fontSize: 12,
    color: '#74788D',
  },
  commentText: {
    fontSize: 14,
    color: '#2D3436',
    lineHeight: 20,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 34,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  chatButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#6C5CE7',
    paddingVertical: 12,
    borderRadius: 12,
    marginRight: 8,
  },
  chatButtonText: {
    color: '#6C5CE7',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  joinButton: {
    flex: 2,
    backgroundColor: '#6C5CE7',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    marginLeft: 8,
  },
  joinedButton: {
    backgroundColor: '#E8F5E8',
  },
  joinButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  joinedButtonText: {
    color: '#2E7D32',
  },
});