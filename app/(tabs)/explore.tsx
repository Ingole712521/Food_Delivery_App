import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Animated, Image, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const offers = [
  {
    id: '1',
    title: '50% OFF on Sushi',
    desc: 'Enjoy half price on all sushi platters!',
    image: 'https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg',
  },
  {
    id: '2',
    title: 'Free Dessert',
    desc: 'Get a free dessert with every pizza order!',
    image: 'https://images.pexels.com/photos/533325/pexels-photo-533325.jpeg',
  },
  {
    id: '3',
    title: 'Buy 1 Get 1 Burger',
    desc: 'Double the delight on all burgers!',
    image: 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg',
  },
];

const restaurants = [
  {
    id: '1',
    name: 'Pizza Palace',
    rating: 4.7,
    image: 'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg',
    cuisine: 'Italian',
  },
  {
    id: '2',
    name: 'Sushi World',
    rating: 4.9,
    image: 'https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg',
    cuisine: 'Japanese',
  },
  {
    id: '3',
    name: 'Burger Hub',
    rating: 4.5,
    image: 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg',
    cuisine: 'American',
  },
];

export default function ExploreScreen() {
  const bannerAnim = useRef(new Animated.Value(-200)).current;

  useEffect(() => {
    Animated.spring(bannerAnim, {
      toValue: 0,
      friction: 6,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <LinearGradient colors={["#4ECDC4", "#45B7D1", "#FF6B6B"]} style={styles.container}>
      <Animated.View style={[styles.banner, { transform: [{ translateY: bannerAnim }] }]}> 
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {offers.map(offer => (
            <View key={offer.id} style={styles.offerCard}>
              <Image source={{ uri: offer.image }} style={styles.offerImage} />
              <View style={styles.offerContent}>
                <Text style={styles.offerTitle}>{offer.title}</Text>
                <Text style={styles.offerDesc}>{offer.desc}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </Animated.View>
      <Text style={styles.sectionTitle}>Popular Restaurants</Text>
      <FlatList
        data={restaurants}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.restaurantCard}>
            <Image source={{ uri: item.image }} style={styles.restaurantImage} />
            <View style={styles.restaurantContent}>
              <Text style={styles.restaurantName}>{item.name}</Text>
              <Text style={styles.restaurantCuisine}>{item.cuisine}</Text>
              <View style={styles.ratingRow}>
                <Ionicons name="star" size={16} color="#FFD700" />
                <Text style={styles.ratingText}>{item.rating}</Text>
              </View>
            </View>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 0,
  },
  banner: {
    height: 180,
    marginBottom: 20,
    paddingLeft: 18,
  },
  offerCard: {
    width: 260,
    height: 160,
    backgroundColor: '#fff',
    borderRadius: 24,
    marginRight: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  offerImage: {
    width: '100%',
    height: 90,
  },
  offerContent: {
    padding: 12,
  },
  offerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#45B7D1',
  },
  offerDesc: {
    fontSize: 14,
    color: '#888',
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 24,
    marginBottom: 10,
  },
  restaurantCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 24,
    marginHorizontal: 18,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    overflow: 'hidden',
  },
  restaurantImage: {
    width: 90,
    height: 90,
    borderTopLeftRadius: 24,
    borderBottomLeftRadius: 24,
  },
  restaurantContent: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
  },
  restaurantCuisine: {
    fontSize: 14,
    color: '#888',
    marginVertical: 2,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  ratingText: {
    fontSize: 15,
    color: '#222',
    marginLeft: 4,
    fontWeight: 'bold',
  },
});
