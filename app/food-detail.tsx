import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';

interface FoodItem {
  id: string;
  name: string;
  desc: string;
  price: number;
  image: string;
  category: string;
  available: boolean;
  ingredients: string[];
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  preparationTime: string;
  rating: number;
  reviews: number;
}

const foodData: { [key: string]: FoodItem } = {
  '1': {
    id: '1',
    name: 'Margherita Pizza',
    desc: 'Classic delight with fresh tomatoes, mozzarella cheese, and aromatic basil. Our signature pizza features a crispy thin crust and authentic Italian flavors.',
    price: 8.99,
    image: 'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg',
    category: 'Pizza',
    available: true,
    ingredients: ['Fresh tomatoes', 'Mozzarella cheese', 'Basil', 'Olive oil', 'Pizza dough'],
    nutrition: {
      calories: 285,
      protein: 12,
      carbs: 35,
      fat: 11,
    },
    preparationTime: '20-25 minutes',
    rating: 4.8,
    reviews: 124,
  },
  '2': {
    id: '2',
    name: 'Veggie Burger',
    desc: 'Loaded with fresh vegetables, melted cheese, and our special sauce. A healthy and delicious alternative to traditional burgers.',
    price: 6.49,
    image: 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg',
    category: 'Burgers',
    available: true,
    ingredients: ['Veggie patty', 'Lettuce', 'Tomato', 'Cheese', 'Special sauce', 'Bun'],
    nutrition: {
      calories: 320,
      protein: 15,
      carbs: 28,
      fat: 18,
    },
    preparationTime: '15-20 minutes',
    rating: 4.6,
    reviews: 89,
  },
  '3': {
    id: '3',
    name: 'Sushi Platter',
    desc: 'Assorted sushi rolls with fresh fish, avocado, and cucumber. Served with wasabi, ginger, and soy sauce.',
    price: 12.99,
    image: 'https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg',
    category: 'Sushi',
    available: false,
    ingredients: ['Fresh salmon', 'Tuna', 'Avocado', 'Cucumber', 'Rice', 'Nori'],
    nutrition: {
      calories: 180,
      protein: 22,
      carbs: 15,
      fat: 6,
    },
    preparationTime: '10-15 minutes',
    rating: 4.9,
    reviews: 156,
  },
  '4': {
    id: '4',
    name: 'Chocolate Cake',
    desc: 'Rich and creamy chocolate cake with chocolate ganache frosting. Perfect for dessert lovers.',
    price: 4.99,
    image: 'https://images.pexels.com/photos/533325/pexels-photo-533325.jpeg',
    category: 'Desserts',
    available: true,
    ingredients: ['Chocolate', 'Flour', 'Eggs', 'Sugar', 'Butter', 'Cream'],
    nutrition: {
      calories: 420,
      protein: 6,
      carbs: 45,
      fat: 24,
    },
    preparationTime: '5-10 minutes',
    rating: 4.7,
    reviews: 67,
  },
  '5': {
    id: '5',
    name: 'Lemonade',
    desc: 'Freshly squeezed lemonade with a hint of mint. Refreshing and perfect for hot days.',
    price: 2.99,
    image: 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg',
    category: 'Drinks',
    available: true,
    ingredients: ['Fresh lemons', 'Sugar', 'Water', 'Mint leaves'],
    nutrition: {
      calories: 120,
      protein: 0,
      carbs: 30,
      fat: 0,
    },
    preparationTime: '2-3 minutes',
    rating: 4.5,
    reviews: 43,
  },
};

export default function FoodDetailScreen() {
  const { id } = useLocalSearchParams();
  const food = foodData[id as string];
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  
  const slideAnim = useRef(new Animated.Value(300)).current;
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

  const handleAddToCart = async () => {
    if (!food.available) {
      Alert.alert('Not Available', 'This item is currently not available.');
      return;
    }

    setIsAddingToCart(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsAddingToCart(false);
    
    Alert.alert(
      '🎉 Added to Cart!',
      `${quantity}x ${food.name} has been added to your cart.`,
      [
        { 
          text: 'Continue Shopping', 
          style: 'default',
          onPress: () => router.back()
        },
        { 
          text: '🛒 View Cart', 
          onPress: () => router.push('/(tabs)/cart'),
          style: 'default'
        }
      ],
      { cancelable: false }
    );
  };

  if (!food) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Food item not found</Text>
      </View>
    );
  }

  return (
    <LinearGradient colors={['#FF6B6B', '#4ECDC4']} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Food Details</Text>
          <TouchableOpacity style={styles.shareButton}>
            <Ionicons name="share-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Food Image */}
        <Animated.View style={[styles.imageContainer, { transform: [{ scale: scaleAnim }] }]}>
          <Image source={{ uri: food.image }} style={styles.foodImage} />
          <View style={styles.availabilityBadge}>
            <View style={[styles.availabilityDot, { backgroundColor: food.available ? '#4CAF50' : '#FF6B6B' }]} />
            <Text style={styles.availabilityText}>
              {food.available ? 'Available' : 'Not Available'}
            </Text>
          </View>
        </Animated.View>

        {/* Food Info */}
        <Animated.View style={[styles.content, { transform: [{ translateY: slideAnim }], opacity: fadeAnim }]}>
          <View style={styles.titleSection}>
            <Text style={styles.foodName}>{food.name}</Text>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text style={styles.ratingText}>{food.rating}</Text>
              <Text style={styles.reviewsText}>({food.reviews} reviews)</Text>
            </View>
          </View>

          <Text style={styles.price}>${food.price.toFixed(2)}</Text>
          <Text style={styles.description}>{food.desc}</Text>

          {/* Preparation Time */}
          <View style={styles.infoRow}>
            <Ionicons name="time-outline" size={20} color="#45B7D1" />
            <Text style={styles.infoText}>Preparation: {food.preparationTime}</Text>
          </View>

          {/* Ingredients */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ingredients</Text>
            <View style={styles.ingredientsList}>
              {food.ingredients.map((ingredient, index) => (
                <View key={index} style={styles.ingredientItem}>
                  <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
                  <Text style={styles.ingredientText}>{ingredient}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Nutrition */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Nutrition (per serving)</Text>
            <View style={styles.nutritionGrid}>
              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionValue}>{food.nutrition.calories}</Text>
                <Text style={styles.nutritionLabel}>Calories</Text>
              </View>
              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionValue}>{food.nutrition.protein}g</Text>
                <Text style={styles.nutritionLabel}>Protein</Text>
              </View>
              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionValue}>{food.nutrition.carbs}g</Text>
                <Text style={styles.nutritionLabel}>Carbs</Text>
              </View>
              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionValue}>{food.nutrition.fat}g</Text>
                <Text style={styles.nutritionLabel}>Fat</Text>
              </View>
            </View>
          </View>

          {/* Quantity Selector */}
          <View style={styles.quantitySection}>
            <Text style={styles.quantityLabel}>Quantity:</Text>
            <View style={styles.quantityControls}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                <Ionicons name="remove" size={20} color={quantity <= 1 ? '#ccc' : '#45B7D1'} />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => setQuantity(quantity + 1)}
              >
                <Ionicons name="add" size={20} color="#45B7D1" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Add to Cart Button */}
          <TouchableOpacity
            style={[
              styles.addToCartButton,
              !food.available && styles.addToCartButtonDisabled
            ]}
            onPress={handleAddToCart}
            disabled={!food.available || isAddingToCart}
            activeOpacity={0.8}
          >
            {isAddingToCart ? (
              <View style={styles.loadingContainer}>
                <Animated.View style={[styles.loadingSpinner, { transform: [{ rotate: slideAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '360deg'],
                }) }] }]}>
                  <Ionicons name="refresh" size={20} color="#fff" />
                </Animated.View>
                <Text style={styles.addToCartText}>Adding to Cart...</Text>
              </View>
            ) : (
              <>
                <Ionicons name="cart" size={24} color="#fff" />
                <Text style={styles.addToCartText}>
                  {food.available ? `Add to Cart - $${(food.price * quantity).toFixed(2)}` : 'Not Available'}
                </Text>
              </>
            )}
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  errorText: {
    fontSize: 18,
    color: '#666',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  shareButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    position: 'relative',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  foodImage: {
    width: '100%',
    height: 250,
    borderRadius: 20,
  },
  availabilityBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  availabilityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  availabilityText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  content: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 24,
    minHeight: 600,
  },
  titleSection: {
    marginBottom: 12,
  },
  foodName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 4,
  },
  reviewsText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#45B7D1',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 8,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  ingredientsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    marginBottom: 8,
  },
  ingredientText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
  },
  nutritionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nutritionItem: {
    alignItems: 'center',
    flex: 1,
  },
  nutritionValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#45B7D1',
  },
  nutritionLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  quantitySection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  quantityLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginHorizontal: 16,
    minWidth: 30,
    textAlign: 'center',
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#45B7D1',
    paddingVertical: 16,
    borderRadius: 16,
    shadowColor: '#45B7D1',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  addToCartButtonDisabled: {
    backgroundColor: '#ccc',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loadingSpinner: {
    marginRight: 8,
  },
  addToCartText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 8,
  },
});
