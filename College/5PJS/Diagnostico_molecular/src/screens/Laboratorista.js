import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const LaboratoristaHomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Diagnóstico Molecular</Text>
      <Text style={styles.optionTitle}>Selecione uma opção:</Text>
      <TouchableOpacity style={styles.optionButton}>
        <Text style={styles.optionButtonText}>PCR Qualitativa</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.optionButton}>
        <Text style={styles.optionButtonText}>qPCR</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  optionTitle: {
    fontSize: 18,
    marginVertical: 20,
  },
  optionButton: {
    width: '80%',
    padding: 10,
    backgroundColor: '#28a745',
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  optionButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default LaboratoristaHomeScreen;
