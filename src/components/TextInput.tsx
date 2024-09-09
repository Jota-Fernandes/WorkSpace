import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';

interface HeartInputProps{
    pass: string
}

export function HeartInput(props : HeartInputProps) {
  return (
        <TextInput 
            style={styles.inputer} 
            placeholder='Click in Generate'
            placeholderTextColor='white'
            value={props.pass}
        />
    );
}

const styles = StyleSheet.create({
    inputer:{
        width: '100%',
        backgroundColor: '#AD0042',
        color: 'white',
        padding: 10,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 25,
        textAlign: 'center'
    }
})