import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { getProductsByCategory } from '../data/productCatalog';

interface HomeScreenProps {
  navigation: any;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const categories = [
    { name: 'Laptops', icon: '💻', count: getProductsByCategory('Laptops').length },
    { name: 'Smartphones', icon: '📱', count: getProductsByCategory('Smartphones').length },
    { name: 'Headphones', icon: '🎧', count: getProductsByCategory('Headphones').length },
    { name: 'TVs', icon: '📺', count: getProductsByCategory('TVs').length },
    { name: 'Tablets', icon: '📱', count: getProductsByCategory('Tablets').length },
    { name: 'Cameras', icon: '📷', count: getProductsByCategory('Cameras').length },
    { name: 'Smartwatches', icon: '⌚', count: getProductsByCategory('Smartwatches').length },
    { name: 'Gaming', icon: '🎮', count: getProductsByCategory('Gaming').length },
  ];

  const quickSearches = [
    'Lightweight laptop for travel',
    'Budget gaming headphones',
    'Professional camera for photography',
    'Smart TV for living room',
    'Fitness smartwatch',
    'Tablet for reading and drawing',
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>AI Product Advisor</Text>
          <Text style={styles.subtitle}>
            Find the perfect products with AI-powered recommendations
          </Text>
        </View>

        {/* Main Search Button */}
        <TouchableOpacity
          style={styles.mainSearchButton}
          onPress={() => navigation.navigate('Search')}
        >
          <Text style={styles.searchIcon}>🔍</Text>
          <Text style={styles.searchButtonText}>Start Smart Search</Text>
          <Text style={styles.searchButtonSubtext}>
            Describe what you need in natural language
          </Text>
        </TouchableOpacity>

        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Browse by Category</Text>
          <View style={styles.categoriesGrid}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.name}
                style={styles.categoryCard}
                onPress={() => navigation.navigate('Search')}
              >
                <Text style={styles.categoryIcon}>{category.icon}</Text>
                <Text style={styles.categoryName}>{category.name}</Text>
                <Text style={styles.categoryCount}>{category.count} products</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Quick Searches */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Searches</Text>
          <Text style={styles.sectionSubtitle}>
            Try these popular search examples
          </Text>
          {quickSearches.map((search, index) => (
            <TouchableOpacity
              key={index}
              style={styles.quickSearchItem}
              onPress={() => {
                // Navigate to search with pre-filled query
                navigation.navigate('Search', { prefilledQuery: search });
              }}
            >
              <Text style={styles.quickSearchIcon}>✨</Text>
              <Text style={styles.quickSearchText}>{search}</Text>
              <Text style={styles.quickSearchArrow}>→</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Why Use AI Product Advisor?</Text>
          <View style={styles.featuresContainer}>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>🤖</Text>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>AI-Powered Matching</Text>
                <Text style={styles.featureDescription}>
                  Advanced AI understands your needs and finds the best matches
                </Text>
              </View>
            </View>
            
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>💡</Text>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>Smart Explanations</Text>
                <Text style={styles.featureDescription}>
                  Get detailed reasons why each product fits your requirements
                </Text>
              </View>
            </View>
            
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>⚡</Text>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>Natural Language</Text>
                <Text style={styles.featureDescription}>
                  Just describe what you want in plain English
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 16,
    paddingVertical: 24,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#E3F2FD',
    textAlign: 'center',
    marginTop: 8,
  },
  mainSearchButton: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: -24,
    marginBottom: 24,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  searchIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  searchButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  searchButtonSubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  categoryCard: {
    width: '50%',
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  categoryIcon: {
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 4,
  },
  categoryCount: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  quickSearchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  quickSearchIcon: {
    fontSize: 16,
    marginRight: 12,
  },
  quickSearchText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  quickSearchArrow: {
    fontSize: 16,
    color: '#2196F3',
  },
  featuresContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  featureIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});
