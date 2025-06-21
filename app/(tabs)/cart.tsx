import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Animated, TouchableOpacity, Alert, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const dummyCart = [
  { 
    id: '1', 
    name: 'Margherita Pizza', 
    price: 8.99, 
    qty: 1, 
    image: 'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg',
    description: 'Classic delight with fresh tomatoes and mozzarella'
  },
  { 
    id: '2', 
    name: 'Veggie Burger', 
    price: 6.49, 
    qty: 2, 
    image: 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg',
    description: 'Loaded with fresh vegetables and special sauce'
  },
  { 
    id: '3', 
    name: 'French Fries', 
    price: 3.99, 
    qty: 1, 
    image: 'https://images.pexels.com/photos/1582166/pexels-photo-1582166.jpeg',
    description: 'Crispy golden fries with sea salt'
  },
];

export default function CartScreen() {
  const [cartItems, setCartItems] = useState(dummyCart);
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

  const updateQuantity = (id: string, newQty: number) => {
    if (newQty <= 0) {
      setCartItems(prev => prev.filter(item => item.id !== id));
    } else {
      setCartItems(prev => 
        prev.map(item => 
          item.id === id ? { ...item, qty: newQty } : item
        )
      );
    }
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0).toFixed(2);
  const itemCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert('Empty Cart', 'Please add some items to your cart first.');
      return;
    }
    
    Alert.alert(
      'Proceed to Checkout',
      `Total: $${total}\nItems: ${itemCount}`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Checkout', onPress: () => Alert.alert('Success', 'Order placed successfully!') }
      ]
    );
  };

  const renderCartItem = ({ item, index }: { item: any; index: number }) => (
    <Animated.View 
      style={[
        styles.cartItem,
        { 
          transform: [{ translateX: slideAnim }, { scale: scaleAnim }],
          opacity: fadeAnim,
        }
      ]}
    >
      <View style={styles.itemImageContainer}>
        <Image source={{ uri: item.image }} style={styles.itemImage} />
        <View style={styles.imageOverlay} />
      </View>
      
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
        <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
      </View>

      <View style={styles.quantityControls}>
        <TouchableOpacity
          style={styles.quantityBtn}
          onPress={() => updateQuantity(item.id, item.qty - 1)}
          activeOpacity={0.7}
        >
          <Ionicons name="remove" size={16} color="#45B7D1" />
        </TouchableOpacity>
        <Text style={styles.quantityText}>{item.qty}</Text>
        <TouchableOpacity
          style={styles.quantityBtn}
          onPress={() => updateQuantity(item.id, item.qty + 1)}
          activeOpacity={0.7}
        >
          <Ionicons name="add" size={16} color="#45B7D1" />
        </TouchableOpacity>
      </View>

      <Text style={styles.itemTotal}>${(item.price * item.qty).toFixed(2)}</Text>
    </Animated.View>
  );

  return (
    <LinearGradient colors={['#45B7D1', '#4ECDC4']} style={styles.container}>
      <Animated.View style={[styles.header, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
        <Text style={styles.title}>Your Cart</Text>
        <View style={styles.cartInfo}>
          <Ionicons name="cart" size={20} color="#fff" />
          <Text style={styles.itemCount}>{itemCount} items</Text>
        </View>
      </Animated.View>

      {cartItems.length === 0 ? (
        <Animated.View style={[styles.emptyCart, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
          <View style={styles.emptyCartIcon}>
            <Ionicons name="cart-outline" size={80} color="rgba(255, 255, 255, 0.5)" />
          </View>
          <Text style={styles.emptyCartText}>Your cart is empty</Text>
          <Text style={styles.emptyCartSubtext}>Add some delicious food to get started!</Text>
          <TouchableOpacity style={styles.browseButton} onPress={() => router.push('/')}>
            <Ionicons name="restaurant" size={20} color="#fff" />
            <Text style={styles.browseText}>Browse Menu</Text>
          </TouchableOpacity>
        </Animated.View>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={item => item.id}
          renderItem={renderCartItem}
          contentContainerStyle={{ paddingBottom: 140 }}
          showsVerticalScrollIndicator={false}
        />
      )}

      {cartItems.length > 0 && (
        <Animated.View style={[styles.summary, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal:</Text>
            <Text style={styles.summaryValue}>${total}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery:</Text>
            <Text style={styles.summaryValue}>$2.99</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Tax:</Text>
            <Text style={styles.summaryValue}>${(parseFloat(total) * 0.08).toFixed(2)}</Text>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.totalValue}>${(parseFloat(total) + 2.99 + parseFloat(total) * 0.08).toFixed(2)}</Text>
          </View>
          
          <TouchableOpacity style={styles.checkoutBtn} onPress={handleCheckout} activeOpacity={0.8}>
            <LinearGradient colors={['#45B7D1', '#4ECDC4']} style={styles.checkoutGradient}>
              <Ionicons name="card" size={24} color="#fff" />
              <Text style={styles.checkoutText}>Proceed to Checkout</Text>
            </LinearGradient>
          </TouchableOpacity>
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  cartInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  itemCount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 4,
  },
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyCartIcon: {
    marginBottom: 20,
  },
  emptyCartText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  emptyCartSubtext: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginBottom: 30,
  },
  browseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
  },
  browseText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 8,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  itemImageContainer: {
    position: 'relative',
    marginRight: 12,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 12,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    color: '#45B7D1',
    fontWeight: '600',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 20,
    padding: 4,
  },
  quantityBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginHorizontal: 12,
    minWidth: 20,
    textAlign: 'center',
  },
  itemTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#45B7D1',
  },
  summary: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#666',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 12,
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#45B7D1',
  },
  checkoutBtn: {
    marginTop: 16,
    borderRadius: 16,
    shadowColor: '#45B7D1',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  checkoutGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 16,
  },
  checkoutText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
}); 