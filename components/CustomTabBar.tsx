import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

interface TabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
}

export default function CustomTabBar({ state, descriptors, navigation }: TabBarProps) {
  const animatedValues = useRef(
    state.routes.map(() => new Animated.Value(0))
  ).current;

  useEffect(() => {
    const currentIndex = state.index;
    animatedValues.forEach((anim, index) => {
      Animated.spring(anim, {
        toValue: index === currentIndex ? 1 : 0,
        friction: 8,
        useNativeDriver: true,
      }).start();
    });
  }, [state.index]);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.98)', 'rgba(255, 255, 255, 0.95)']}
        style={styles.tabBar}
      >
        <View style={styles.tabBarContent}>
          {state.routes.map((route: any, index: number) => {
            const { options } = descriptors[route.key];
            const label = options.tabBarLabel ?? options.title ?? route.name;
            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            const getIconName = () => {
              switch (route.name) {
                case 'index':
                  return isFocused ? 'home' : 'home-outline';
                case 'explore':
                  return isFocused ? 'search' : 'search-outline';
                case 'cart':
                  return isFocused ? 'cart' : 'cart-outline';
                case 'profile':
                  return isFocused ? 'person' : 'person-outline';
                default:
                  return 'home-outline';
              }
            };

            const scale = animatedValues[index].interpolate({
              inputRange: [0, 1],
              outputRange: [1, 1.1],
            });

            const translateY = animatedValues[index].interpolate({
              inputRange: [0, 1],
              outputRange: [0, -8],
            });

            return (
              <TouchableOpacity
                key={route.key}
                onPress={onPress}
                style={styles.tabButton}
                activeOpacity={0.8}
              >
                <Animated.View
                  style={[
                    styles.tabContent,
                    {
                      transform: [{ scale }, { translateY }],
                    },
                  ]}
                >
                  <Animated.View
                    style={[
                      styles.iconContainer,
                      {
                        backgroundColor: isFocused ? '#45B7D1' : 'transparent',
                        transform: [
                          {
                            scale: animatedValues[index].interpolate({
                              inputRange: [0, 1],
                              outputRange: [1, 1.2],
                            }),
                          },
                        ],
                      },
                    ]}
                  >
                    <Ionicons
                      name={getIconName()}
                      size={24}
                      color={isFocused ? '#fff' : '#45B7D1'}
                    />
                  </Animated.View>
                  <Animated.Text
                    style={[
                      styles.tabLabel,
                      {
                        color: isFocused ? '#45B7D1' : '#666',
                        fontWeight: isFocused ? 'bold' : '600',
                        transform: [
                          {
                            scale: animatedValues[index].interpolate({
                              inputRange: [0, 1],
                              outputRange: [1, 1.05],
                            }),
                          },
                        ],
                      },
                    ]}
                  >
                    {label}
                  </Animated.Text>
                  {isFocused && (
                    <Animated.View
                      style={[
                        styles.activeIndicator,
                        {
                          opacity: animatedValues[index],
                          transform: [
                            {
                              scale: animatedValues[index].interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, 1],
                              }),
                            },
                          ],
                        },
                      ]}
                    />
                  )}
                </Animated.View>
              </TouchableOpacity>
            );
          })}
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabBar: {
    height: 90,
    paddingBottom: 25,
    paddingTop: 10,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 15,
  },
  tabBarContent: {
    flexDirection: 'row',
    flex: 1,
    paddingHorizontal: 10,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabContent: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    position: 'relative',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
    shadowColor: '#45B7D1',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -2,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#45B7D1',
  },
}); 