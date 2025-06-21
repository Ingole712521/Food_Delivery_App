import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const popularFoods = [
  {
    id: '1',
    name: 'Margherita Pizza',
    price: 8.99,
    rating: 4.8,
    image: 'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg',
    category: 'Pizza',
    time: '20-25 min'
  },
  {
    id: '2',
    name: 'Veggie Burger',
    price: 6.49,
    rating: 4.6,
    image: 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg',
    category: 'Burgers',
    time: '15-20 min'
  },
  {
    id: '3',
    name: 'Sushi Platter',
    price: 12.99,
    rating: 4.9,
    image: 'https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg',
    category: 'Sushi',
    time: '10-15 min'
  },
  {
    id: '4',
    name: 'Chocolate Cake',
    price: 4.99,
    rating: 4.7,
    image: 'https://images.pexels.com/photos/533325/pexels-photo-533325.jpeg',
    category: 'Desserts',
    time: '5-10 min'
  },
  {
    id: '5',
    name: 'Lemonade',
    price: 2.99,
    rating: 4.5,
    image: 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg',
    category: 'Drinks',
    time: '2-3 min'
  }
];

const offers = [
  {
    id: '1',
    title: '50% OFF',
    subtitle: 'On First Order',
    color: '#FF6B6B',
    icon: 'gift'
  },
  {
    id: '2',
    title: 'Free Delivery',
    subtitle: 'Orders above $20',
    color: '#4ECDC4',
    icon: 'bicycle'
  },
  {
    id: '3',
    title: 'Buy 1 Get 1',
    subtitle: 'On Selected Items',
    color: '#45B7D1',
    icon: 'restaurant'
  }
];

const restaurants = [
  {
    id: '1',
    name: 'Pizza Palace',
    rating: 4.8,
    deliveryTime: '20-30 min',
    image: 'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg',
    cuisine: 'Italian'
  },
  {
    id: '2',
    name: 'Burger House',
    rating: 4.6,
    deliveryTime: '15-25 min',
    image: 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg',
    cuisine: 'American'
  },
  {
    id: '3',
    name: 'Sushi Master',
    rating: 4.9,
    deliveryTime: '25-35 min',
    image: 'https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg',
    cuisine: 'Japanese'
  }
];

export default function HomeScreen() {
  const slideAnim = useRef(new Animated.Value(100)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const headerAnim = useRef(new Animated.Value(-50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        useNativeDriver: true,
      }),
      Animated.spring(headerAnim, {
        toValue: 0,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const renderFoodCard = (food: any, index: number) => (
    <Animated.View
      key={food.id}
      style={[
        styles.foodCard,
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
        onPress={() => router.push(`/food-detail?id=${food.id}`)}
        activeOpacity={0.9}
      >
        <View style={styles.foodImageContainer}>
          <Image source={{ uri: food.image }} style={styles.foodImage} />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.7)']}
            style={styles.imageOverlay}
          />
          <View style={styles.foodBadge}>
            <Text style={styles.foodCategory}>{food.category}</Text>
          </View>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={12} color="#FFD700" />
            <Text style={styles.ratingText}>{food.rating}</Text>
          </View>
        </View>
        
        <View style={styles.foodInfo}>
          <Text style={styles.foodName}>{food.name}</Text>
          <View style={styles.foodMeta}>
            <View style={styles.timeContainer}>
              <Ionicons name="time-outline" size={12} color="#666" />
              <Text style={styles.timeText}>{food.time}</Text>
            </View>
            <Text style={styles.foodPrice}>${food.price}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  const renderOfferCard = (offer: any, index: number) => (
    <Animated.View
      key={offer.id}
      style={[
        styles.offerCard,
        {
          backgroundColor: offer.color,
          opacity: fadeAnim,
          transform: [
            { translateX: slideAnim },
            { scale: scaleAnim }
          ],
        },
      ]}
    >
      <Ionicons name={offer.icon} size={32} color="#fff" />
      <Text style={styles.offerTitle}>{offer.title}</Text>
      <Text style={styles.offerSubtitle}>{offer.subtitle}</Text>
    </Animated.View>
  );

  const renderRestaurantCard = (restaurant: any, index: number) => (
    <Animated.View
      key={restaurant.id}
      style={[
        styles.restaurantCard,
        {
          opacity: fadeAnim,
          transform: [
            { translateX: slideAnim },
            { scale: scaleAnim }
          ],
        },
      ]}
    >
      <Image source={{ uri: restaurant.image }} style={styles.restaurantImage} />
      <View style={styles.restaurantInfo}>
        <Text style={styles.restaurantName}>{restaurant.name}</Text>
        <Text style={styles.restaurantCuisine}>{restaurant.cuisine}</Text>
        <View style={styles.restaurantMeta}>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={12} color="#FFD700" />
            <Text style={styles.ratingText}>{restaurant.rating}</Text>
          </View>
          <Text style={styles.deliveryTime}>{restaurant.deliveryTime}</Text>
        </View>
      </View>
    </Animated.View>
  );

  return (
    <LinearGradient colors={['#45B7D1', '#4ECDC4']} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Animated.View style={[styles.header, { transform: [{ translateY: headerAnim }], opacity: fadeAnim }]}>
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.greeting}>Hello, Nehal! 👋</Text>
              <Text style={styles.subtitle}>What would you like to eat today?</Text>
            </View>
            <TouchableOpacity style={styles.profileButton}>
              <Ionicons name="person" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Search Bar */}
        <Animated.View style={[styles.searchContainer, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
          <TouchableOpacity style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#666" />
            <Text style={styles.searchText}>Search for food...</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="options" size={20} color="#fff" />
          </TouchableOpacity>
        </Animated.View>

        {/* Offers Section */}
        <Animated.View style={[styles.section, { opacity: fadeAnim }]}>
          <Text style={styles.sectionTitle}>Special Offers</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.offersScroll}>
            {offers.map(renderOfferCard)}
          </ScrollView>
        </Animated.View>

        {/* Popular Foods */}
        <Animated.View style={[styles.section, { opacity: fadeAnim }]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Foods</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.foodsScroll}>
            {popularFoods.map(renderFoodCard)}
          </ScrollView>
        </Animated.View>

        {/* Popular Restaurants */}
        <Animated.View style={[styles.section, { opacity: fadeAnim }]}>
          <Text style={styles.sectionTitle}>Popular Restaurants</Text>
          <View style={styles.restaurantsContainer}>
            {restaurants.map(renderRestaurantCard)}
          </View>
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
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  profileButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  searchText: {
    fontSize: 16,
    color: '#666',
    marginLeft: 8,
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  viewAllText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '600',
  },
  offersScroll: {
    paddingHorizontal: 20,
  },
  offerCard: {
    width: 120,
    height: 100,
    borderRadius: 16,
    padding: 16,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  offerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 8,
    textAlign: 'center',
  },
  offerSubtitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  foodsScroll: {
    paddingHorizontal: 20,
  },
  foodCard: {
    width: 160,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
    overflow: 'hidden',
  },
  foodImageContainer: {
    position: 'relative',
    height: 120,
  },
  foodImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 40,
  },
  foodBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  foodCategory: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#333',
  },
  ratingContainer: {
    position: 'absolute',
    top: 8,
    right: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  ratingText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 2,
  },
  foodInfo: {
    padding: 12,
  },
  foodName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  foodMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 10,
    color: '#666',
    marginLeft: 2,
  },
  foodPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#45B7D1',
  },
  restaurantsContainer: {
    paddingHorizontal: 20,
  },
  restaurantCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    marginBottom: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  restaurantImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 12,
  },
  restaurantInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  restaurantCuisine: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  restaurantMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deliveryTime: {
    fontSize: 10,
    color: '#666',
  },
});
