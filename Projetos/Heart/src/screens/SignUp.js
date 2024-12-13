import React from 'react';

import { View, Text, Button, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignUp({ navigation }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [firstQuestion, setFirstQuestion] = React.useState("");
  const [secondQuestion, setSecondQuestion] = React.useState("");
  const [thirdQuestion, setThirdQuestion] = React.useState("");


  const handleCreateUser = async () => {
    if(email === "" || password === "" || confirmPassword === ""){
      Alert.alert("Todos os campos devem estar preenchidos.");
      return;
    }

    if(password !== confirmPassword){
      Alert.alert("As senhas estão diferentes. Elas devem ser iguais");
      return;
    }

    try {
      await AsyncStorage.setItem('userEmail', email);
      await AsyncStorage.setItem('userPassword', password);
      Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!');
      navigation.navigate('Login');
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível salvar os dados');
      console.error(e);
    }
  };

  return (
    <View style={styles.page}>
      <View style={{width: "80%"}}>
        <Text style={styles.h1}>Cadastro</Text>
        <View>
          <Text style={styles.secondaryText}>E-mail</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View>
          <Text style={styles.secondaryText}>Senha</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
          />
        </View>
        <View>
          <Text style={styles.secondaryText}>Confirmar senha</Text>
          <TextInput
            style={styles.input}
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
            secureTextEntry
          />
        </View>
        <TouchableOpacity onPress={handleCreateUser} style={styles.loginButton}>
          <Text style={{textAlign: "center", color: "#ffffff", fontWeight: "bold"}} >Cadastrar-se</Text>
        </TouchableOpacity>
        <Text style={{textAlign: "center"}}>Já possui uma conta? <Text style={{textDecorationLine: "underline"}} onPress={() => navigation.navigate('Login')}>Faça login</Text></Text>
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
    padding: 5,
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
    marginBottom: 2
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
    marginBottom: 15,
  }
});