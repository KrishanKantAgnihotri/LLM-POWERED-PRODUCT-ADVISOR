import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Product } from '../types';
import { formatCurrency, formatRating, getKeySpecs } from '../utils/helpers';

interface ProductDetailScreenProps {
  route: {
    params: {
      product: Product;
    };
  };
  navigation: any;
}

export const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({ 
  route, 
  navigation 
}) => {
  const { product } = route.params;
  const keySpecs = getKeySpecs(product.specifications);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header Image */}
        <View style={styles.imageContainer}>
          <Text style={styles.categoryTag}>{product.category}</Text>
          <Text style={styles.imageText}>{product.brand}</Text>
        </View>

        {/* Product Info */}
        <View style={styles.contentContainer}>
          {/* Title and Price */}
          <View style={styles.headerSection}>
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.brandName}>by {product.brand}</Text>
            <View style={styles.priceRatingRow}>
              <Text style={styles.price}>{formatCurrency(product.price)}</Text>
              <View style={styles.ratingContainer}>
                <Text style={styles.rating}>⭐ {formatRating(product.rating)}</Text>
                <Text style={styles.reviews}>({product.reviews} reviews)</Text>
              </View>
            </View>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{product.description}</Text>
          </View>

          {/* Key Specifications */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Key Specifications</Text>
            <View style={styles.specsGrid}>
              {keySpecs.map((spec, index) => (
                <View key={index} style={styles.specItem}>
                  <Text style={styles.specLabel}>{spec.key}</Text>
                  <Text style={styles.specValue}>{spec.value}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Features */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Key Features</Text>
            {product.features.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>

          {/* Full Specifications */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Full Specifications</Text>
            <View style={styles.fullSpecsContainer}>
              {Object.entries(product.specifications).map(([key, value]) => (
                <View key={key} style={styles.fullSpecRow}>
                  <Text style={styles.fullSpecKey}>{key}</Text>
                  <Text style={styles.fullSpecValue}>{String(value)}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Tags */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Product Tags</Text>
            <View style={styles.tagsContainer}>
              {product.tags.map((tag, index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Back Button */}
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>← Back to Search</Text>
      </TouchableOpacity>
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
  imageContainer: {
    height: 200,
    backgroundColor: '#e3f2fd',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  categoryTag: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#2196F3',
    color: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    fontSize: 12,
    fontWeight: '600',
  },
  imageText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1976D2',
  },
  contentContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    paddingTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  headerSection: {
    marginBottom: 24,
  },
  productName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  brandName: {
    fontSize: 16,
    color: '#666',
    marginBottom: 12,
  },
  priceRatingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  reviews: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  specsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  specItem: {
    width: '50%',
    paddingHorizontal: 8,
    marginBottom: 12,
  },
  specLabel: {
    fontSize: 12,
    color: '#999',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  specValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
    marginTop: 2,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  bulletPoint: {
    fontSize: 16,
    color: '#2196F3',
    marginRight: 8,
    marginTop: 2,
  },
  featureText: {
    flex: 1,
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
  },
  fullSpecsContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 16,
  },
  fullSpecRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  fullSpecKey: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
    flex: 1,
  },
  fullSpecValue: {
    fontSize: 14,
    color: '#333',
    textAlign: 'right',
    flex: 1,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  tag: {
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    margin: 4,
  },
  tagText: {
    fontSize: 12,
    color: '#1976D2',
    fontWeight: '600',
  },
  backButton: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: '#2196F3',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
