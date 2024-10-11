import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import cadeado_heart from '../../assets/cadeado_heart.png';

export function LogoHeart() {
  return (
    <View style={styles.logoContainer}>
        <Text style={styles.title}>Heart Code</Text>
        <Image style={styles.logo} source={cadeado_heart}/>
    </View>
  );
}

const styles = StyleSheet.create({
    title:{
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 30,
        color: '#AD0042'
    },
    logo:{
        width: 200,
        height: 200,
    },
    logoContainer:{
        flexDirection: 'column',
        elevation: 5,
        width: '80%',
        alignItems: 'center',
        marginBottom: 60,
        paddingTop: 20,
        paddingBottom: 10,
        backgroundColor: '#F7CACA',
        borderRadius: 100
    }
})