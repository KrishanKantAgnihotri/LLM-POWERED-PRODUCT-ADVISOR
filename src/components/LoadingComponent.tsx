import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

interface LoadingComponentProps {
  message?: string;
}

export const LoadingComponent: React.FC<LoadingComponentProps> = ({ 
  message = "AI is analyzing your request..." 
}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#2196F3" />
      <Text style={styles.message}>{message}</Text>
      <View style={styles.dotsContainer}>
        <Text style={styles.dots}>Thinking</Text>
        <View style={styles.animatedDots}>
          <Text style={styles.dot}>.</Text>
          <Text style={styles.dot}>.</Text>
          <Text style={styles.dot}>.</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    backgroundColor: '#f9f9f9',
  },
  message: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dots: {
    fontSize: 14,
    color: '#999',
  },
  animatedDots: {
    flexDirection: 'row',
  },
  dot: {
    fontSize: 14,
    color: '#999',
    marginLeft: 2,
  },
});
