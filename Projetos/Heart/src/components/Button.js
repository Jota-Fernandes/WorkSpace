import React, {useState} from 'react';
import {Text, Pressable, StyleSheet, View} from 'react-native';
import { HeartInput } from './TextInput';
import generatePass from '../services/passwordService';
import * as Clipboard from 'expo-clipboard'

export function Button({navigation}) {
    const [pass, setPass] = useState('')

    function handleGenerateButton(){
        let generateToken = generatePass()
        setPass(generateToken)
    }

    function handleCopyButton(){
        Clipboard.setStringAsync(pass)
    }
  return (
    <>
        <View style={styles.inputContainer}>
            <HeartInput pass = {pass}/>
        </View>
        <Pressable onPress={handleGenerateButton} style={styles.button}>
            <Text style={styles.text}>GERAR</Text>
        </Pressable>
        <Pressable onPress={handleCopyButton} style={styles.button}>
            <Text style={styles.text}>COPIAR</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={()=>{navigation.navigate("Login")}}>
            <Text style={styles.text}>ACESSAR SENHAS SALVAS</Text>
        </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
    text:{
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25
    },
    button:{
        margin: 5,
        alignItems: 'center',
        width: '80%',
        justifyContent: 'center',
        padding: 12,
        backgroundColor: '#F7CACA',
        borderRadius: 15,
        elevation: 3
    },
    inputContainer:{
        width: '50%',
        alignItems: 'center',
        flexDirection: 'column',
        marginBottom: 5
    }
});