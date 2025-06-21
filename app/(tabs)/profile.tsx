import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const userStats = {
  totalOrders: 47,
  totalSpent: 284.50,
  favoriteItems: 12,
  loyaltyPoints: 1250,
};

const recentOrders = [
  { id: '1', name: 'Margherita Pizza', date: '2024-01-15', status: 'Delivered', amount: 12.99 },
  { id: '2', name: 'Veggie Burger Combo', date: '2024-01-14', status: 'Delivered', amount: 15.49 },
  { id: '3', name: 'Sushi Platter', date: '2024-01-13', status: 'Delivered', amount: 18.99 },
  { id: '4', name: 'Chocolate Cake', date: '2024-01-12', status: 'Delivered', amount: 6.99 },
];

const quickActions = [
  { id: '1', title: 'My Orders', icon: 'receipt-outline', color: '#45B7D1', route: 'orders' },
  { id: '2', title: 'Notifications', icon: 'notifications-outline', color: '#FF6B6B', route: 'notifications' },
  { id: '3', title: 'Favorites', icon: 'heart-outline', color: '#FFD93D', route: 'favorites' },
  { id: '4', title: 'Settings', icon: 'settings-outline', color: '#6C5CE7', route: 'settings' },
  { id: '5', title: 'Help & Support', icon: 'help-circle-outline', color: '#00B894', route: 'support' },
  { id: '6', title: 'About App', icon: 'information-circle-outline', color: '#FD79A8', route: 'about' },
];

export default function ProfileScreen() {
  const [selectedTab, setSelectedTab] = useState('profile');
  const slideAnim = useRef(new Animated.Value(100)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

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

  const handleQuickAction = (action: any) => {
    if (action.route === 'orders') {
      router.push('/orders');
    } else if (action.route === 'notifications') {
      router.push('/notifications');
    } else {
      Alert.alert('Coming Soon', `${action.title} feature will be available soon!`);
    }
  };

  const handleEditProfile = () => {
    Alert.alert('Edit Profile', 'Profile editing feature coming soon!');
  };

  return (
    <LinearGradient colors={['#45B7D1', '#4ECDC4']} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
            <Ionicons name="create-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </Animated.View>

        {/* User Info Card */}
        <Animated.View style={[styles.userCard, { transform: [{ scale: scaleAnim }], opacity: fadeAnim }]}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={40} color="#45B7D1" />
            </View>
            <View style={styles.verifiedBadge}>
              <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
            </View>
          </View>
          
          <Text style={styles.userName}>Nehal Ingole</Text>
          <Text style={styles.userEmail}>nehal.ingole@example.com</Text>
          <Text style={styles.userPhone}>+1 (555) 123-4567</Text>
          
          <View style={styles.membershipBadge}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.membershipText}>Premium Member</Text>
          </View>
        </Animated.View>

        {/* Stats Section */}
        <Animated.View style={[styles.statsSection, { transform: [{ translateY: slideAnim }], opacity: fadeAnim }]}>
          <Text style={styles.sectionTitle}>Your Stats</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Ionicons name="receipt" size={24} color="#45B7D1" />
              <Text style={styles.statValue}>{userStats.totalOrders}</Text>
              <Text style={styles.statLabel}>Total Orders</Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="card" size={24} color="#FF6B6B" />
              <Text style={styles.statValue}>${userStats.totalSpent}</Text>
              <Text style={styles.statLabel}>Total Spent</Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="heart" size={24} color="#FFD93D" />
              <Text style={styles.statValue}>{userStats.favoriteItems}</Text>
              <Text style={styles.statLabel}>Favorites</Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="trophy" size={24} color="#6C5CE7" />
              <Text style={styles.statValue}>{userStats.loyaltyPoints}</Text>
              <Text style={styles.statLabel}>Points</Text>
            </View>
          </View>
        </Animated.View>

        {/* Recent Orders */}
        <Animated.View style={[styles.recentOrdersSection, { transform: [{ translateY: slideAnim }], opacity: fadeAnim }]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Orders</Text>
            <TouchableOpacity onPress={() => router.push('/orders')}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          {recentOrders.map((order, index) => (
            <View key={order.id} style={styles.orderItem}>
              <View style={styles.orderInfo}>
                <Text style={styles.orderName}>{order.name}</Text>
                <Text style={styles.orderDate}>{order.date}</Text>
                <View style={styles.orderStatus}>
                  <View style={[styles.statusDot, { backgroundColor: '#4CAF50' }]} />
                  <Text style={styles.statusText}>{order.status}</Text>
                </View>
              </View>
              <Text style={styles.orderAmount}>${order.amount}</Text>
            </View>
          ))}
        </Animated.View>

        {/* Quick Actions */}
        <Animated.View style={[styles.quickActionsSection, { transform: [{ translateY: slideAnim }], opacity: fadeAnim }]}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            {quickActions.map((action) => (
              <TouchableOpacity
                key={action.id}
                style={styles.actionCard}
                onPress={() => handleQuickAction(action)}
                activeOpacity={0.8}
              >
                <View style={[styles.actionIcon, { backgroundColor: action.color }]}>
                  <Ionicons name={action.icon} size={24} color="#fff" />
                </View>
                <Text style={styles.actionTitle}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        {/* App Info */}
        <Animated.View style={[styles.appInfoSection, { opacity: fadeAnim }]}>
          <Text style={styles.appVersion}>Food Delivery App v1.0.0</Text>
          <Text style={styles.appCopyright}>© 2024 All rights reserved</Text>
        </Animated.View>
      </ScrollView>
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
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    padding: 24,
    marginHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  userPhone: {
    fontSize: 16,
    color: '#666',
    marginBottom: 12,
  },
  membershipBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3CD',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  membershipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#856404',
    marginLeft: 4,
  },
  statsSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  recentOrdersSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAllText: {
    fontSize: 14,
    color: '#45B7D1',
    fontWeight: '600',
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  orderInfo: {
    flex: 1,
  },
  orderName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  orderDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  orderStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '600',
  },
  orderAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#45B7D1',
  },
  quickActionsSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '48%',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  appInfoSection: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingBottom: 40,
  },
  appVersion: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
  },
  appCopyright: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
  },
}); 