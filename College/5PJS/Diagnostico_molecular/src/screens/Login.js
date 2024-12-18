import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');

  useEffect(() => {
    const storeAdminCredentials = async () => {
      const adminData = {
        userType: 'Administrador',
        email: 'root',
        password: 'password',
      };
      await AsyncStorage.setItem('@user_root', JSON.stringify(adminData));
    };

    storeAdminCredentials();
  }, []);

  const handleLogin = async () => {
    if (email && password && userType) {
      try {
        const userData = await AsyncStorage.getItem(`@user_${email}`);
        if (userData) {
          const user = JSON.parse(userData);
          if (user.password === password && user.userType === userType) {
            Alert.alert("Login Bem-sucedido", `Bem-vindo, ${user.email}!`);
            switch(userType) {
              case 'Laboratorista':
                navigation.navigate('Laboratorista');
                break;
              case 'Medico':
                navigation.navigate('Medico');
                break;
              case 'Administrador':
                navigation.navigate('Administrador');
                break;
              default:
                navigation.navigate('Usuario');
                break;
            }
          } else {
            Alert.alert("Erro", "Senha ou tipo de usuário incorretos.");
          }
        } else {
          Alert.alert("Erro", "Usuário não encontrado.");
        }
      } catch (error) {
        Alert.alert("Erro", "Não foi possível realizar o login. Tente novamente.");
      }
    } else {
      Alert.alert("Erro", "Por favor, insira todas as informações necessárias.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Text style={styles.optionTitle}>Selecione o tipo de usuário:</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.userButton,
            userType === 'Medico' && styles.selectedButton,
          ]}
          onPress={() => setUserType('Medico')}
        >
          <Text style={styles.userButtonText}>Médico</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.userButton,
            userType === 'Administrador' && styles.selectedButton,
          ]}
          onPress={() => setUserType('Administrador')}
        >
          <Text style={styles.userButtonText}>Administrador</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.userButton,
            userType === 'Laboratorista' && styles.selectedButton,
          ]}
          onPress={() => setUserType('Laboratorista')}
        >
          <Text style={styles.userButtonText}>Laboratorista</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
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
  input: {
    width: '80%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  optionTitle: {
    fontSize: 18,
    marginVertical: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  userButton: {
    padding: 10,
    backgroundColor: '#ccc',
    borderRadius: 5,
    margin: 5,
  },
  selectedButton: {
    backgroundColor: '#007bff',
  },
  userButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  button: {
    width: '80%',
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default LoginScreen;
