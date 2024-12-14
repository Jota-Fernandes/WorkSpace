import React from 'react';

import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';

export default function Welcome({ navigation }) {

  return (
    <View style={styles.page}>
      <View style={{width: "80%"}}>
        <Text style={styles.h1}>Olá! :)</Text>
        <Text style={styles.secondaryText}>Bem-vindo ao <Text style={{fontWeight: "bold"}}>PassKeeper</Text>, um local onde você pode salvar e gerenciar as suas senhas de outros apps</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")} style={styles.loginButton}>
          <Text style={styles.textLoginButton}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")} style={styles.signUpButton}>
          <Text style={styles.textSignUpButton}>Cadastrar-se</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
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
  secondaryText: {
    textAlign: "center",
    color: "#6d6d6d",
    marginBottom: 20
  },
  loginButton: {
    borderRadius: 5,
    color: "#ffffff",
    backgroundColor: "#3780ff",
    padding: 8,
    textAlign: "center",
    fontFamily: "sans-serif",
    borderColor: "#3780ff",
    borderWidth: 2,
    marginBottom: 15,
  },
  textLoginButton: {
    textAlign: "center",
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 15,
  },
  signUpButton: {
    borderRadius: 5,
    color: "#3780ff",
    backgroundColor: "transparent",
    borderColor: "#3780ff",
    borderWidth: 2,
    padding: 8,
    textAlign: "center",
    fontFamily: "sans-serif",
  },
  textSignUpButton: {
    textAlign: "center",
    color: "#3780ff",
    fontWeight: "bold",
    fontSize: 15,
  },
});