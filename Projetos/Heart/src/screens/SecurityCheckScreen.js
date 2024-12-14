// SecurityCheckScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SecurityCheckScreen({ navigation, route }) {
  const { passwordGroups } = route.params;
  
  const [answers, setAnswers] = useState(['', '', '']);
  const [attemptsLeft, setAttemptsLeft] = useState(3);
  const [lockedOut, setLockedOut] = useState(false);

  const correctAnswers = ['barata', 'chapadao', 'jihad']; // Respostas corretas esperadas

  useEffect(() => {
    checkLockoutStatus();
  }, []);

  const checkLockoutStatus = async () => {
    const lastAttempt = await AsyncStorage.getItem('lastAttempt');
    if (lastAttempt) {
      const timePassed = (new Date().getTime() - parseInt(lastAttempt)) / (1000 * 60 * 60); // em horas
      if (timePassed < 24) {
        setLockedOut(true);
      }
    }
  };

  const handleCheckAnswers = async () => {
    if (answers.join('') === correctAnswers.join('')) {
      navigation.navigate('PasswordScreen', { passwordGroups });
    } else {
      const newAttempts = attemptsLeft - 1;
      setAttemptsLeft(newAttempts);
      if (newAttempts === 0) {
        await AsyncStorage.setItem('lastAttempt', new Date().getTime().toString());
        setLockedOut(true);
        Alert.alert('Erro', 'Você errou 3 vezes. Tente novamente em 24 horas.');
      } else {
        Alert.alert('Erro', `Resposta incorreta. Restam ${newAttempts} tentativas.`);
      }
    }
  };

  return (
    <View style={styles.container}>
      {lockedOut ? (
        <Text style={styles.lockedText}>Você está bloqueado. Tente novamente em 24 horas.</Text>
      ) : (
        <>
          <Text style={styles.question}>Pergunta 1: Qual o nome do seu primeiro animal de estimação?</Text>
          <TextInput
            style={styles.input}
            value={answers[0]}
            onChangeText={(text) => setAnswers([text, answers[1], answers[2]])}
          />
          
          <Text style={styles.question}>Pergunta 2: Qual sua cidade natal?</Text>
          <TextInput
            style={styles.input}
            value={answers[1]}
            onChangeText={(text) => setAnswers([answers[0], text, answers[2]])}
          />
          
          <Text style={styles.question}>Pergunta 3: Qual o nome da sua escola primária?</Text>
          <TextInput
            style={styles.input}
            value={answers[2]}
            onChangeText={(text) => setAnswers([answers[0], answers[1], text])}
          />

          <TouchableOpacity style={styles.button} onPress={handleCheckAnswers}>
            <Text style={styles.buttonText}>Verificar</Text>
          </TouchableOpacity>
        </>
      )}

      {/* Botão Voltar discreto na parte inferior */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    justifyContent: 'flex-start',
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  question: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    borderColor: '#D3D3D3',
    borderWidth: 1,
  },
  button: {
    backgroundColor: '#2E8B57',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  lockedText: {
    color: '#FF0000',
    fontSize: 18,
    textAlign: 'center',
  },
  backButton: {
    position: 'absolute',
    bottom: 20,
    left: '50%',
    transform: [{ translateX: -20 }],
    backgroundColor: '#FF6347',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
});
