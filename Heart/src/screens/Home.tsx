import React from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { LogoHeart } from "../components/Logo_heart";
import { HeartInput } from "../components/TextInput";
import { Button } from "../components/Button";

export default function Home(){
    return(
        <View style={styles.container}>
            <LogoHeart/>
            <Button/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffcbd1',
      alignItems: 'center',
      justifyContent: 'center',
    }
  });
  