import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PasswrodsScreen({route, navigation }){
    const { passwordGroups } = route.params;

    const handleDeletePasswordGroup = async (groupName) => {
      Alert.alert(
        'Excluir Grupo',
        `Tem certeza que deseja excluir o grupo "${groupName}"?`,
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'Excluir',
            onPress: async () => {
              const updatedGroups = passwordGroups.filter(group => group.name !== groupName);
              await AsyncStorage.setItem('passwordGroups', JSON.stringify(updatedGroups));
              Alert.alert('Sucesso', 'Grupo excluído com sucesso.');
              navigation.navigate('Main'); // Navega de volta para a tela principal
            },
          },
        ]
      );
    };

    return (
        <View style={styles.container}>
             <Text style={styles.title}>Grupos de Senhas</Text>

        <FlatList
        data={passwordGroups}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
            <View style={styles.passwordGroup}>
            <Text style={styles.groupName}>Grupo: {item.name}</Text>
            <Text style={styles.password}>Senha: {item.password}</Text>
            <TouchableOpacity onPress={() => handleDeletePasswordGroup(item.name)}>
                <Text style={styles.deleteText}>❌</Text>
            </TouchableOpacity>
            </View>
  )}
  ListEmptyComponent={<Text style={styles.emptyText}>Nenhum grupo de senhas salvo.</Text>}
/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      marginTop: 50,
      flex: 1,
      justifyContent: 'flex-start',
      padding: 20,
      backgroundColor: '#F5F5F5',
    },
    title: {
      fontSize: 24,
      color: '#000000',
      marginBottom: 20,
      textAlign: 'center',
    },
    passwordGroup: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#D3D3D3',
    },
    groupName: {
      color: '#000000',
      fontSize: 18,
    },
    password: {
      color: '#000000',
      fontSize: 16,
    },
    deleteText: {
      fontSize: 24,
      color: '#FF6347',
    },
    emptyText: {
      color: '#000000',
      fontSize: 16,
      textAlign: 'center',
      marginTop: 20,
    },
  });