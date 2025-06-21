import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Animated, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const orders = [
  {
    id: '1',
    orderNumber: '#ORD-001',
    items: ['Margherita Pizza', 'Coke'],
    total: 12.99,
    status: 'Delivered',
    date: '2024-06-01',
    time: '2:30 PM',
  },
  {
    id: '2',
    orderNumber: '#ORD-002',
    items: ['Sushi Platter', 'Green Tea'],
    total: 18.99,
    status: 'On the way',
    date: '2024-06-02',
    time: '1:15 PM',
  },
  {
    id: '3',
    orderNumber: '#ORD-003',
    items: ['Veggie Burger', 'French Fries'],
    total: 9.99,
    status: 'Preparing',
    date: '2024-06-02',
    time: '12:45 PM',
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Delivered':
      return '#4CAF50';
    case 'On the way':
      return '#FF9800';
    case 'Preparing':
      return '#2196F3';
    default:
      return '#666';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'Delivered':
      return 'checkmark-circle';
    case 'On the way':
      return 'bicycle';
    case 'Preparing':
      return 'restaurant';
    default:
      return 'time';
  }
};

export default function OrdersScreen() {
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: 0,
      friction: 8,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <LinearGradient colors={['#4ECDC4', '#45B7D1']} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>My Orders</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={orders}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
          <Animated.View
            style={[
              styles.orderCard,
              {
                transform: [{ translateY: slideAnim }],
                opacity: slideAnim,
              },
            ]}
          >
            <View style={styles.orderHeader}>
              <Text style={styles.orderNumber}>{item.orderNumber}</Text>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
                <Ionicons name={getStatusIcon(item.status)} size={16} color="#fff" />
                <Text style={styles.statusText}>{item.status}</Text>
              </View>
            </View>

            <View style={styles.orderItems}>
              {item.items.map((food, idx) => (
                <Text key={idx} style={styles.itemText}>• {food}</Text>
              ))}
            </View>

            <View style={styles.orderFooter}>
              <View>
                <Text style={styles.dateText}>{item.date}</Text>
                <Text style={styles.timeText}>{item.time}</Text>
              </View>
              <Text style={styles.totalText}>${item.total.toFixed(2)}</Text>
            </View>

            <TouchableOpacity style={styles.trackButton}>
              <Ionicons name="location" size={16} color="#45B7D1" />
              <Text style={styles.trackText}>Track Order</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      />
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
    alignItems: 'center',
    justifyContent: 'space-between',
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  orderItems: {
    marginBottom: 12,
  },
  itemText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  dateText: {
    fontSize: 12,
    color: '#999',
  },
  timeText: {
    fontSize: 12,
    color: '#999',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#45B7D1',
  },
  trackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  trackText: {
    color: '#45B7D1',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
}); 