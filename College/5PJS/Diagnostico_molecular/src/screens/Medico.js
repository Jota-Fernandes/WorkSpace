import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const MedicoHomeScreen = () => {
  const [selectedTestType, setSelectedTestType] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tipo de teste</Text>

      <Text style={styles.subTitle}>Buscar paciente</Text>
      <TextInput 
        style={styles.input}
        placeholder="Número do registro"
      />

      <View style={styles.testTypeContainer}>
        <Text style={styles.subTitle}>Tipo de Exame</Text>
        <View style={styles.radioContainer}>
          <TouchableOpacity 
            style={styles.radioButton}
            onPress={() => setSelectedTestType('PCR Qualitativa')}
          >
            <View style={selectedTestType === 'PCR Qualitativa' ? styles.radioButtonSelected : styles.radioButtonUnselected} />
            <Text style={styles.radioText}>PCR Qualitativa</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.radioButton}
            onPress={() => setSelectedTestType('qPCR')}
          >
            <View style={selectedTestType === 'qPCR' ? styles.radioButtonSelected : styles.radioButtonUnselected} />
            <Text style={styles.radioText}>qPCR</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.treatmentContainer}>
        <Text style={styles.subTitle}>Recomendar Tratamento</Text>
        <TextInput 
          style={styles.input}
          placeholder="Descrever tratamento"
          multiline
        />
      </View>
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
  subTitle: {
    fontSize: 18,
    marginVertical: 10,
  },
  input: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  testTypeContainer: {
    width: '80%',
    marginBottom: 20,
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButtonUnselected: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
    marginRight: 10,
  },
  radioButtonSelected: {
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: '#007bff',
    marginRight: 10,
  },
  radioText: {
    fontSize: 16,
  },
  treatmentContainer: {
    width: '80%',
  },
});

export default MedicoHomeScreen;
