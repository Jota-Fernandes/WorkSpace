import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const MedicoHomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resultados Laboratoriais</Text>
      <Text style={styles.optionTitle}>Selecione uma opção:</Text>
      <TouchableOpacity style={styles.optionButton}>
        <Text style={styles.optionButtonText}>Resultado 1</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.optionButton}>
        <Text style={styles.optionButtonText}>Resultado 2</Text>
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
    backgroundColor: '#007bff',
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  optionButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default MedicoHomeScreen;
