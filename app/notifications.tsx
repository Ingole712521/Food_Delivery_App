import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const notifications = [
  {
    id: '1',
    type: 'order',
    title: 'Order Delivered! 🎉',
    message: 'Your Margherita Pizza has been delivered. Enjoy your meal!',
    time: '2 minutes ago',
    read: false,
    icon: 'checkmark-circle',
    color: '#4CAF50',
    action: 'Rate Order'
  },
  {
    id: '2',
    type: 'promo',
    title: 'Special Offer! 🎁',
    message: 'Get 20% off on all pizzas this weekend. Use code: PIZZA20',
    time: '1 hour ago',
    read: false,
    icon: 'gift',
    color: '#FF6B6B',
    action: 'View Offer'
  },
  {
    id: '3',
    type: 'order',
    title: 'Order Status Update',
    message: 'Your Veggie Burger is being prepared and will be ready in 15 minutes.',
    time: '2 hours ago',
    read: true,
    icon: 'restaurant',
    color: '#45B7D1',
    action: 'Track Order'
  },
  {
    id: '4',
    type: 'system',
    title: 'Payment Successful',
    message: 'Your payment of $15.49 has been processed successfully.',
    time: '3 hours ago',
    read: true,
    icon: 'card',
    color: '#4ECDC4',
    action: 'View Receipt'
  },
  {
    id: '5',
    type: 'promo',
    title: 'New Restaurant Added! 🍕',
    message: 'Check out our new Italian restaurant with authentic recipes.',
    time: '1 day ago',
    read: true,
    icon: 'restaurant',
    color: '#FFD93D',
    action: 'Explore'
  },
  {
    id: '6',
    type: 'order',
    title: 'Order Cancelled',
    message: 'Your order has been cancelled as requested. Refund will be processed within 3-5 days.',
    time: '2 days ago',
    read: true,
    icon: 'close-circle',
    color: '#FF6B6B',
    action: 'View Details'
  },
  {
    id: '7',
    type: 'system',
    title: 'App Update Available',
    message: 'A new version of Food Delivery App is available with exciting features.',
    time: '3 days ago',
    read: true,
    icon: 'download',
    color: '#6C5CE7',
    action: 'Update Now'
  },
  {
    id: '8',
    type: 'promo',
    title: 'Birthday Special! 🎂',
    message: 'Happy Birthday! Enjoy 50% off on your next order. Valid until tomorrow.',
    time: '1 week ago',
    read: true,
    icon: 'cake',
    color: '#FD79A8',
    action: 'Claim Offer'
  }
];

export default function NotificationsScreen() {
  const [unreadCount, setUnreadCount] = useState(notifications.filter(n => !n.read).length);
  const slideAnim = useRef(new Animated.Value(100)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleNotificationPress = (notification: any) => {
    if (!notification.read) {
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
    
    switch (notification.type) {
      case 'order':
        Alert.alert(notification.title, notification.message, [
          { text: 'OK', style: 'default' },
          { text: notification.action, onPress: () => Alert.alert('Action', `${notification.action} feature coming soon!`) }
        ]);
        break;
      case 'promo':
        Alert.alert(notification.title, notification.message, [
          { text: 'Dismiss', style: 'cancel' },
          { text: notification.action, onPress: () => Alert.alert('Offer', 'Offer details will be shown here!') }
        ]);
        break;
      default:
        Alert.alert(notification.title, notification.message);
    }
  };

  const markAllAsRead = () => {
    setUnreadCount(0);
    Alert.alert('Success', 'All notifications marked as read!');
  };

  const clearAllNotifications = () => {
    Alert.alert(
      'Clear All Notifications',
      'Are you sure you want to clear all notifications?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear All', style: 'destructive', onPress: () => Alert.alert('Cleared', 'All notifications cleared!') }
      ]
    );
  };

  return (
    <LinearGradient colors={['#45B7D1', '#4ECDC4']} style={styles.container}>
      {/* Header */}
      <Animated.View style={[styles.header, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton} onPress={markAllAsRead}>
            <Ionicons name="checkmark-done" size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton} onPress={clearAllNotifications}>
            <Ionicons name="trash" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </Animated.View>

      {/* Notification Count */}
      <Animated.View style={[styles.countContainer, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
        <View style={styles.countBadge}>
          <Ionicons name="notifications" size={20} color="#fff" />
          <Text style={styles.countText}>{unreadCount} unread</Text>
        </View>
      </Animated.View>

      {/* Notifications List */}
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {notifications.map((notification, index) => (
          <Animated.View
            key={notification.id}
            style={[
              styles.notificationCard,
              {
                opacity: fadeAnim,
                transform: [
                  { translateX: slideAnim },
                  { scale: scaleAnim }
                ],
              },
            ]}
          >
            <TouchableOpacity
              style={styles.notificationContent}
              onPress={() => handleNotificationPress(notification)}
              activeOpacity={0.8}
            >
              {/* Icon */}
              <View style={[styles.iconContainer, { backgroundColor: notification.color }]}>
                <Ionicons name={notification.icon} size={24} color="#fff" />
              </View>

              {/* Content */}
              <View style={styles.contentContainer}>
                <View style={styles.titleRow}>
                  <Text style={styles.notificationTitle}>{notification.title}</Text>
                  {!notification.read && <View style={styles.unreadDot} />}
                </View>
                <Text style={styles.notificationMessage}>{notification.message}</Text>
                <View style={styles.bottomRow}>
                  <Text style={styles.timeText}>{notification.time}</Text>
                  <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.actionText}>{notification.action}</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Arrow */}
              <Ionicons name="chevron-forward" size={20} color="#ccc" />
            </TouchableOpacity>
          </Animated.View>
        ))}
      </ScrollView>

      {/* Empty State (if no notifications) */}
      {notifications.length === 0 && (
        <Animated.View style={[styles.emptyState, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
          <Ionicons name="notifications-off" size={80} color="rgba(255, 255, 255, 0.5)" />
          <Text style={styles.emptyTitle}>No Notifications</Text>
          <Text style={styles.emptySubtitle}>You're all caught up!</Text>
        </Animated.View>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerActions: {
    flexDirection: 'row',
  },
  headerButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  countContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  countBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  countText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 6,
  },
  scrollView: {
    flex: 1,
  },
  notificationCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    marginHorizontal: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  notificationContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  contentContainer: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF6B6B',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 8,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 12,
    color: '#999',
  },
  actionButton: {
    backgroundColor: '#45B7D1',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
}); 