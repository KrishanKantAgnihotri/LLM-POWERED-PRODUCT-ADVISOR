import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Product, Recommendation } from '../types';
import { formatCurrency, formatRating, getMatchPercentage, getScoreColor, getScoreLabel, getCurrentCurrency } from '../utils/helpers';

interface ProductCardProps {
  product: Product;
  recommendation?: Recommendation;
  onPress: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  recommendation, 
  onPress 
}) => {
  const matchPercentage = recommendation ? getMatchPercentage(recommendation.score) : null;
  const scoreColor = recommendation ? getScoreColor(recommendation.score) : '#666';
  const scoreLabel = recommendation ? getScoreLabel(recommendation.score) : '';

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {/* Product Image Placeholder */}
      <View style={styles.imagePlaceholder}>
        <Text style={styles.imageText}>{product.category}</Text>
      </View>

      <View style={styles.content}>
        {/* Header with name and match score */}
        <View style={styles.header}>
          <Text style={styles.productName} numberOfLines={1}>
            {product.name}
          </Text>
          {matchPercentage && (
            <View style={[styles.matchBadge, { backgroundColor: scoreColor }]}>
              <Text style={styles.matchText}>{matchPercentage}%</Text>
            </View>
          )}
        </View>

        {/* Brand and Category */}
        <View style={styles.brandRow}>
          <Text style={styles.brand}>{product.brand}</Text>
          <Text style={styles.category}>• {product.category}</Text>
        </View>

        {/* Description */}
        <Text style={styles.description} numberOfLines={2}>
          {product.description}
        </Text>

        {/* Price and Rating */}
        <View style={styles.footer}>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{formatCurrency(product.price)}</Text>
            {getCurrentCurrency().code !== 'USD' && (
              <Text style={styles.originalPrice}>
                {formatCurrency(product.price, 'USD')}
              </Text>
            )}
          </View>
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>⭐ {formatRating(product.rating)}</Text>
            <Text style={styles.reviews}>({product.reviews})</Text>
          </View>
        </View>

        {/* Match Label */}
        {scoreLabel && (
          <Text style={[styles.scoreLabel, { color: scoreColor }]}>
            {scoreLabel}
          </Text>
        )}

        {/* Top Reason */}
        {recommendation && recommendation.reasons.length > 0 && (
          <View style={styles.reasonContainer}>
            <Text style={styles.reasonText} numberOfLines={2}>
              💡 {recommendation.reasons[0]}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  imagePlaceholder: {
    height: 120,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  productName: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 8,
  },
  matchBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  matchText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  brand: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  category: {
    fontSize: 14,
    color: '#999',
    marginLeft: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  originalPrice: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
    fontStyle: 'italic',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  reviews: {
    fontSize: 12,
    color: '#999',
    marginLeft: 4,
  },
  scoreLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
  },
  reasonContainer: {
    backgroundColor: '#f8f9fa',
    padding: 8,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#2196F3',
  },
  reasonText: {
    fontSize: 12,
    color: '#555',
    fontStyle: 'italic',
  },
});
