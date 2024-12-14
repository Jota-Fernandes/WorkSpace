import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AdministradorHomeScreen = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [userType, setUserType] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleRegisterClick = () => {
    Alert.alert(
      "Selecione o Tipo de Usuário",
      "Escolha uma das opções abaixo:",
      [
        { text: "Médico", onPress: () => handleUserTypeChange('médico') },
        { text: "Laboratorista", onPress: () => handleUserTypeChange('laboratorista') },
        { text: "Administrador", onPress: () => handleUserTypeChange('administrador') },
      ],
      { cancelable: true }
    );
  };

  const handleUserTypeChange = (type) => {
    setUserType(type);
    setIsRegistering(true);
  };

  const handleRegisterUser = async () => {
    try {
      const userData = {
        userType,
        login,
        password,
      };
      await AsyncStorage.setItem(`@user_${login}`, JSON.stringify(userData));
      Alert.alert("Usuário Cadastrado", `Tipo: ${userType}\nLogin: ${login}`);
      setIsRegistering(false);
      setUserType('');
      setLogin('');
      setPassword('');
    } catch (error) {
      Alert.alert("Erro", "Não foi possível cadastrar o usuário. Tente novamente.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Módulo de Auditoria</Text>
      <TouchableOpacity style={styles.optionButton} onPress={handleRegisterClick}>
        <Text style={styles.optionButtonText}>Cadastro de Usuário</Text>
      </TouchableOpacity>

      {isRegistering && (
        <View style={styles.registrationContainer}>
          <Text style={styles.registrationTitle}>Cadastro de {userType.charAt(0).toUpperCase() + userType.slice(1)}</Text>
          <TextInput
            style={styles.input}
            placeholder="Login"
            value={login}
            onChangeText={setLogin}
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity style={styles.submitButton} onPress={handleRegisterUser}>
            <Text style={styles.submitButtonText}>Cadastrar</Text>
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
  optionButton: {
    width: '80%',
    padding: 10,
    backgroundColor: '#dc3545',
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  selectedButton: {
    backgroundColor: '#28a745',
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
    backgroundColor: '#dc3545',
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default AdministradorHomeScreen;