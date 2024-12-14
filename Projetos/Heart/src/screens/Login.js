import React from 'react';

import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ navigation }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = async () => {
    try {
      const storedEmail = await AsyncStorage.getItem('userEmail');
      const storedPassword = await AsyncStorage.getItem('userPassword');

      if (email === storedEmail && password === storedPassword) {
        navigation.navigate('Main');
      } else {
        Alert.alert('Erro', 'E-mail ou senha incorretos');
      }
    } catch (e) {
      Alert.alert('Erro', 'Ocorreu um erro ao acessar os dados');
      console.error(e);
    }
  };

  return (
    <View style={styles.page}>
      <View style={{width: "80%"}}>
        <Text style={styles.h1}>Login</Text>
        <Text style={styles.secondaryText}>E-mail</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Text style={styles.secondaryText}>Senha</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
          <Text style={styles.textLoginButton}>Entrar</Text>
        </TouchableOpacity>
        <Text style={{textAlign: "center"}}>
          Ainda não possui uma conta? <Text style={{textDecorationLine: "underline"}} onPress={() => navigation.navigate('SignUp')}>Cadastre-se</Text>
          </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffcbd1',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: "sans-serif"
  },
  h1: {
    fontWeight: "bold",
    fontSize: 25,
    textAlign: "center",
    marginBottom: 5,
  },
  input: {
    borderRadius: 5,
    borderColor: "#6d6d6d",
    borderWidth: 2,
    marginBottom: 15,
    padding: 5,
  },
  secondaryText: {
    color: "#6d6d6d",
    marginBottom: 1
  },
  loginButton: {
    borderRadius: 5,
    color: "#ffffff",
    backgroundColor: '#AD0042',
    padding: 8,
    textAlign: "center",
    fontFamily: "sans-serif",
    borderColor: "black",
    borderWidth: 2,
    marginTop: 5,
    marginBottom: 15,
  },
  textLoginButton: {
    textAlign: "center",
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 15,
  },
});