import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AdministradorHomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Módulo de Auditoria</Text>
      <TouchableOpacity style={styles.optionButton}>
        <Text style={styles.optionButtonText}>Cadastro de Usuário</Text>
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
  optionButton: {
    width: '80%',
    padding: 10,
    backgroundColor: '#dc3545',
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  optionButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default AdministradorHomeScreen;
