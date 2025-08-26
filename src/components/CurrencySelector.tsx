import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { SUPPORTED_CURRENCIES, getCurrentCurrency, setCurrentCurrency, Currency } from '../utils/helpers';

interface CurrencySelectorProps {
  onCurrencyChange?: (currency: Currency) => void;
}

export const CurrencySelector: React.FC<CurrencySelectorProps> = ({ onCurrencyChange }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(getCurrentCurrency());

  const handleCurrencySelect = (currency: Currency) => {
    setSelectedCurrency(currency);
    setCurrentCurrency(currency.code);
    setIsModalVisible(false);
    onCurrencyChange?.(currency);
  };

  const renderCurrencyItem = ({ item }: { item: Currency }) => (
    <TouchableOpacity
      style={[
        styles.currencyItem,
        selectedCurrency.code === item.code && styles.selectedCurrencyItem
      ]}
      onPress={() => handleCurrencySelect(item)}
    >
      <View style={styles.currencyInfo}>
        <Text style={styles.currencySymbol}>{item.symbol}</Text>
        <View style={styles.currencyDetails}>
          <Text style={styles.currencyCode}>{item.code}</Text>
          <Text style={styles.currencyName}>{item.name}</Text>
        </View>
      </View>
      {selectedCurrency.code === item.code && (
        <Text style={styles.checkmark}>✓</Text>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.selector}
        onPress={() => setIsModalVisible(true)}
      >
        <Text style={styles.selectorSymbol}>{selectedCurrency.symbol}</Text>
        <Text style={styles.selectorCode}>{selectedCurrency.code}</Text>
        <Text style={styles.arrow}>▼</Text>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <SafeAreaView style={styles.modal}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select Currency</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={SUPPORTED_CURRENCIES}
            renderItem={renderCurrencyItem}
            keyExtractor={(item) => item.code}
            style={styles.currencyList}
            showsVerticalScrollIndicator={false}
          />
        </SafeAreaView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 8,
  },
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  selectorSymbol: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2196F3',
    marginRight: 4,
  },
  selectorCode: {
    fontSize: 14,
    fontWeight: '600',
    color: '#495057',
    marginRight: 4,
  },
  arrow: {
    fontSize: 10,
    color: '#6c757d',
  },
  modal: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212529',
  },
  closeButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  currencyList: {
    flex: 1,
  },
  currencyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f8f9fa',
  },
  selectedCurrencyItem: {
    backgroundColor: '#e3f2fd',
  },
  currencyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  currencySymbol: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2196F3',
    width: 40,
    textAlign: 'center',
  },
  currencyDetails: {
    marginLeft: 12,
    flex: 1,
  },
  currencyCode: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212529',
  },
  currencyName: {
    fontSize: 14,
    color: '#6c757d',
    marginTop: 2,
  },
  checkmark: {
    fontSize: 18,
    color: '#2196F3',
    fontWeight: 'bold',
  },
});
