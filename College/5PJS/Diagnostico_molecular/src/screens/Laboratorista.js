import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';

const LaboratoristaHomeScreen = () => {
  const [sampleName, setSampleName] = useState('');
  const [sampleId, setSampleId] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionPress = (option) => {
    setSelectedOption(option);

    Alert.prompt(
      "Dados da Amostra",
      "Insira o nome da amostra:",
      (name) => {
        if (name) {
          setSampleName(name);
          Alert.prompt(
            "Dados da Amostra",
            "Insira o ID da amostra:",
            (id) => {
              if (id) {
                setSampleId(id);
                handleSubmit(name, id);
              }
            },
            'plain-text',
            '',
            'numeric'
          );
        }
      }
    );
  };

  const handleSubmit = (name, id) => {
    Alert.alert("Preparação Solicitada", `Opção: ${selectedOption}\nNome da Amostra: ${name}\nID da Amostra: ${id}`);
    setSampleName('');
    setSampleId('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Diagnóstico Molecular</Text>
      <Text style={styles.optionTitle}>Selecione uma opção:</Text>
      <TouchableOpacity style={styles.optionButton} onPress={() => handleOptionPress('PCR Qualitativa')}>
        <Text style={styles.optionButtonText}>PCR Qualitativa</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.optionButton} onPress={() => handleOptionPress('qPCR')}>
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
