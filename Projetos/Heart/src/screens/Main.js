import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MainScreen({ navigation }) {
  const [groupName, setGroupName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordGroups, setPasswordGroups] = useState([]);

  useEffect(() => {
    loadPasswordGroups();
  }, []);

  const loadPasswordGroups = async () => {
    try {
      const storedGroups = await AsyncStorage.getItem('passwordGroups');
      if (storedGroups) {
        setPasswordGroups(JSON.parse(storedGroups));
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os grupos de senhas.');
    }
  };

  const savePasswordGroup = async () => {
    if (groupName === '' || password === '') {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    const newGroup = { name: groupName, password };
    const updatedGroups = [...passwordGroups, newGroup];

    try {
      await AsyncStorage.setItem('passwordGroups', JSON.stringify(updatedGroups));
      setPasswordGroups(updatedGroups);
      setGroupName('');
      setPassword('');
      Alert.alert('Sucesso', 'Grupo de senhas salvo com sucesso.');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar o grupo de senhas.');
    }
  };

  const goToSecurityCheck = () => {
    navigation.navigate('SecurityCheck', { passwordGroups });
  };

  // Adiciona um listener para atualizar a lista de grupos ao voltar para a tela
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadPasswordGroups);
    return unsubscribe; // Cleanup the listener on unmount
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Armazenar Senhas</Text>

      <TextInput
        style={styles.input}
        placeholder="Título para senha"
        value={groupName}
        onChangeText={setGroupName}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={savePasswordGroup}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button2} onPress={goToSecurityCheck}>
        <Text style={styles.buttonText}>Ver senhas salvas</Text>
      </TouchableOpacity>

      <FlatList
        data={passwordGroups}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <Text style={styles.groupText}>{item.name}</Text>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum grupo de senhas salvo.</Text>}
      />

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 20,
    backgroundColor: '#ffcbd1',
    marginTop: 50
  },
  title: {
    fontSize: 24,
    color: 'black',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    borderColor: '#D3D3D3',
    borderWidth: 1,
  },
  button: {
    backgroundColor: '#AD0042',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  button2: {
    backgroundColor: '#AD0042',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  groupText: {
    color: 'black',
    fontSize: 16,
    marginTop: 10,
  },
  emptyText: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  backButton: {
    position: 'absolute',
    bottom: 20,
    left: '55%',
    transform: [{ translateX: -25 }],
    backgroundColor: '#FF6347',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
});
