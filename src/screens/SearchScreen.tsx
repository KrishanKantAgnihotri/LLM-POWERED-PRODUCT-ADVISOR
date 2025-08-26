import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Alert,
  FlatList,
  Animated,
  Dimensions,
} from 'react-native';
import { useApp, useAppActions } from '../context/AppContext';
import { SearchInput } from '../components/SearchInput';
import { ProductCard } from '../components/ProductCard';
import { LoadingComponent } from '../components/LoadingComponent';
import { ErrorComponent } from '../components/ErrorComponent';
import { CurrencySelector } from '../components/CurrencySelector';
import { aiService } from '../services/aiService';
import { generateId, formatCurrency } from '../utils/helpers';
import { Product } from '../types';

interface SearchScreenProps {
  navigation: any;
}

export const SearchScreen: React.FC<SearchScreenProps> = ({ navigation }) => {
  const { state } = useApp();
  const { 
    setQuery, 
    setLoading, 
    setRecommendations, 
    setError, 
    addQuery,
    clearRecommendations 
  } = useAppActions();

  const [searchQuery, setSearchQuery] = useState(state.currentQuery);
  const [forceRerender, setForceRerender] = useState(0);
  const fadeAnim = new Animated.Value(0);

  const { width: screenWidth } = Dimensions.get('window');

  // Debug effect to monitor state changes
  useEffect(() => {
    console.log('State updated:', {
      isLoading: state.isLoading,
      error: state.error,
      recommendationsCount: state.recommendations.length,
      recommendations: state.recommendations.map(r => r.product?.name).slice(0, 3)
    });
  }, [state.isLoading, state.error, state.recommendations]);

  const handleCurrencyChange = () => {
    // Force re-render to update prices
    setForceRerender(prev => prev + 1);
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      Alert.alert('Empty Search', 'Please enter what you\'re looking for');
      return;
    }

    try {
      setQuery(searchQuery);
      setLoading(true);
      clearRecommendations();

      // Get AI recommendations
      const recommendations = await aiService.getRecommendations(searchQuery);
      
      if (recommendations.length === 0) {
        setError('No products found matching your criteria. Try a different search.');
      } else {
        console.log('Setting recommendations:', recommendations.length, 'items');
        console.log('First recommendation:', recommendations[0]?.product?.name);
        setRecommendations(recommendations);
        
        // Reset and animate results appearance
        fadeAnim.setValue(0);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
        
        // Add query to history
        addQuery({
          id: generateId(),
          query: searchQuery,
          timestamp: new Date(),
          recommendations,
        });
      }
    } catch (error) {
      console.error('Search error:', error);
      setError('Failed to get recommendations. Please check your internet connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleProductPress = (product: Product) => {
    navigation.navigate('ProductDetail', { product });
  };

  const handleRetry = () => {
    setError(null);
    fadeAnim.setValue(0);
    handleSearch();
  };

  const renderRecommendationItem = ({ item, index }: { item: any; index: number }) => {
    console.log(`Rendering item ${index}:`, item.product?.name || 'Unknown product');
    return (
      <View style={styles.recommendationItem}>
        <View style={styles.rankBadge}>
          <Text style={styles.rankText}>#{index + 1}</Text>
        </View>
        <ProductCard
          product={item.product}
          recommendation={item}
          onPress={() => handleProductPress(item.product)}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Enhanced Header with Gradient Effect */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerTop}>
            <Text style={styles.title}>AI Product Advisor</Text>
            <CurrencySelector onCurrencyChange={handleCurrencyChange} />
          </View>
          <Text style={styles.subtitle}>
            Tell me what you need, and I'll find the perfect products for you!
          </Text>
        </View>
        <View style={styles.headerDecoration} />
      </View>

      {/* Enhanced Search Input */}
      <View style={styles.searchContainer}>
        <SearchInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmit={handleSearch}
          isLoading={state.isLoading}
          placeholder={`Example: I need a lightweight laptop under ${formatCurrency(1500)} with long battery life`}
        />
      </View>

      {/* Content Area with Better Layout */}
      <View style={styles.content}>
        {state.isLoading ? (
          <LoadingComponent message="AI is analyzing your request and finding the best matches..." />
        ) : state.error ? (
          <ErrorComponent message={state.error} onRetry={handleRetry} />
        ) : state.recommendations.length > 0 ? (
          <View style={styles.resultsWrapper}>
            {/* Enhanced Results Header */}
            <View style={styles.resultsHeader}>
              <Text style={styles.resultsTitle}>
                🎯 Found {state.recommendations.length} great matches for you!
              </Text>
              <Text style={styles.resultsSubtitle}>
                Ranked by how well they match your needs
              </Text>
              <View style={styles.resultsDecoration} />
            </View>

            {/* FlatList for Better Performance and Scrolling */}
            <FlatList
              data={state.recommendations}
              renderItem={renderRecommendationItem}
              keyExtractor={(item, index) => `${item.product?.id || index}`}
              style={styles.resultsList}
              contentContainerStyle={styles.resultsContent}
              showsVerticalScrollIndicator={false}
              bounces={true}
              removeClippedSubviews={false}
              maxToRenderPerBatch={10}
              windowSize={10}
              onLayout={() => console.log('FlatList onLayout called')}
              ListEmptyComponent={() => {
                console.log('FlatList is empty, recommendations length:', state.recommendations.length);
                return (
                  <View style={{ padding: 20, alignItems: 'center' }}>
                    <Text>No recommendations to display</Text>
                  </View>
                );
              }}
              ListFooterComponent={
                <View style={styles.footer}>
                  <View style={styles.footerCard}>
                    <Text style={styles.footerIcon}>💡</Text>
                    <Text style={styles.footerText}>
                      Tip: Try more specific searches for better recommendations!
                    </Text>
                  </View>
                </View>
              }
            />
          </View>
        ) : (
          <ScrollView 
            style={styles.emptyScrollView}
            contentContainerStyle={styles.emptyState}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.emptyContent}>
              <Text style={styles.emptyEmoji}>🔍✨</Text>
              <Text style={styles.emptyTitle}>Ready to find your perfect product?</Text>
              <Text style={styles.emptyMessage}>
                Describe what you're looking for in natural language. Prices shown in your selected currency. For example:
              </Text>
              <View style={styles.exampleContainer}>
                <View style={styles.exampleItem}>
                  <Text style={styles.exampleBullet}>💻</Text>
                  <Text style={styles.exampleText}>"Lightweight laptop under {formatCurrency(1200)}"</Text>
                </View>
                <View style={styles.exampleItem}>
                  <Text style={styles.exampleBullet}>🎧</Text>
                  <Text style={styles.exampleText}>"Gaming headphones under {formatCurrency(200)}"</Text>
                </View>
                <View style={styles.exampleItem}>
                  <Text style={styles.exampleBullet}>�</Text>
                  <Text style={styles.exampleText}>"Budget smartphone with good camera"</Text>
                </View>
                <View style={styles.exampleItem}>
                  <Text style={styles.exampleBullet}>🌟</Text>
                  <Text style={styles.exampleText}>"Premium tablet for professional work"</Text>
                </View>
              </View>
            </View>
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 16,
    paddingVertical: 24,
    paddingTop: 40,
    position: 'relative',
    overflow: 'hidden',
  },
  headerContent: {
    zIndex: 2,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerDecoration: {
    position: 'absolute',
    top: -50,
    right: -50,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
  },
  subtitle: {
    fontSize: 16,
    color: '#E3F2FD',
    textAlign: 'center',
    lineHeight: 22,
  },
  searchContainer: {
    backgroundColor: '#fff',
    marginTop: -20,
    marginHorizontal: 16,
    borderRadius: 16,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    zIndex: 3,
  },
  content: {
    flex: 1,
    marginTop: 16,
  },
  resultsWrapper: {
    flex: 1,
  },
  resultsHeader: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    position: 'relative',
  },
  resultsDecoration: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: '#4CAF50',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  resultsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a202c',
    marginBottom: 6,
    textAlign: 'center',
  },
  resultsSubtitle: {
    fontSize: 15,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 12,
  },
  resultsList: {
    flex: 1,
  },
  resultsContent: {
    paddingBottom: 20,
  },
  recommendationItem: {
    position: 'relative',
    marginBottom: 8,
  },
  rankBadge: {
    position: 'absolute',
    top: 12,
    left: 24,
    backgroundColor: '#FF5722',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 6,
    zIndex: 10,
    shadowColor: '#FF5722',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  rankText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  footer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  footerCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  footerIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  footerText: {
    flex: 1,
    fontSize: 14,
    color: '#64748b',
    fontStyle: 'italic',
    lineHeight: 20,
  },
  emptyScrollView: {
    flex: 1,
  },
  emptyState: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingVertical: 40,
  },
  emptyContent: {
    alignItems: 'center',
  },
  emptyEmoji: {
    fontSize: 80,
    marginBottom: 24,
    textAlign: 'center',
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a202c',
    textAlign: 'center',
    marginBottom: 12,
  },
  emptyMessage: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  exampleContainer: {
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  exampleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  exampleBullet: {
    fontSize: 20,
    marginRight: 16,
    width: 32,
    textAlign: 'center',
  },
  exampleText: {
    flex: 1,
    fontSize: 15,
    color: '#475569',
    fontWeight: '500',
  },
});
