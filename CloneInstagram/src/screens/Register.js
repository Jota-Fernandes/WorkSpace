import React, {Component} from 'react'
import {
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity,
    TextInput
} from 'react-native'

class Register extends Component {
    state = {
        name: '',
        email: '',
        password: ''
    }

    render(){
        return (
            <View>
                <TextInput/>
                <TextInput/>
                <TextInput/>
                <TouchableOpacity>
                    <Text></Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    buttom:{
        marginTop: 30,
        padding: 10,
        backgroundColor: '#4286f4'
    },
    buttomText:{

    },
    input:{
        marginTop:20,
        width: '90%',
        backgroundColor: '#EEE',
        heaight: 40
    }
})