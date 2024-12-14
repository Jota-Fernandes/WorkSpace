import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';

const LaboratoristaHomeScreen = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [sampleType, setSampleType] = useState('');
  const [sampleName, setSampleName] = useState('');
  const [sampleId, setSampleId] = useState('');

  const handleOptionPress = () => {
    Alert.alert(
      "Selecione o Tipo de Amostra",
      "Escolha uma das opções abaixo:",
      [
        { text: "PCR Qualitativa", onPress: () => handleSampleTypeChange('PCR Qualitativa') },
        { text: "qPCR", onPress: () => handleSampleTypeChange('qPCR') },
      ],
      { cancelable: true }
    );
  };

  const handleSampleTypeChange = (type) => {
    setSampleType(type);
    setIsRegistering(true);
  };

  const handleRegisterSample = () => {
    Alert.alert(
      "Solicitação de Preparação",
      `Tipo: ${sampleType}\nNome da Amostra: ${sampleName}\nID da Amostra: ${sampleId}`
    );
    setIsRegistering(false);
    setSampleType('');
    setSampleName('');
    setSampleId('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Diagnóstico Molecular</Text>
      <TouchableOpacity style={styles.optionButton} onPress={handleOptionPress}>
        <Text style={styles.optionButtonText}>Selecione uma opção</Text>
      </TouchableOpacity>

      {isRegistering && (
        <View style={styles.registrationContainer}>
          <Text style={styles.registrationTitle}>Cadastro de {sampleType}</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome da Amostra"
            value={sampleName}
            onChangeText={setSampleName}
          />
          <TextInput
            style={styles.input}
            placeholder="ID da Amostra"
            value={sampleId}
            onChangeText={setSampleId}
          />
          <TouchableOpacity style={styles.submitButton} onPress={handleRegisterSample}>
            <Text style={styles.submitButtonText}>Solicitar Preparação</Text>
          </TouchableOpacity>
        </View>
      )}
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
  registrationContainer: {
    marginTop: 20,
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  registrationTitle: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
    width: '100%',
  },
  submitButton: {
    padding: 10,
    backgroundColor: '#28a745',
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default LaboratoristaHomeScreen;
