import React, {Component} from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import {Gravatar} from 'react-native-gravatar'

class Profile extends Component{
    logout = () =>{
        this.props.navigation.navigate('Login')
    }
    render(){
        const options ={email: 'fulanodetal@gmai.com', secure: true}
        return(
            <View style={styles.container}>
                <Gravatar options={options} styles={styles.avatar}/>
                <Text styles={styles.nickname}>Fulano de tal</Text>
                <Text styles={styles.email}>fulanodetal@gmail.com</Text>
                <TouchableOpacity onPress={this.logout} styles={styles.buttom}>
                    <Text styles={styles.buttomText}>Sair</Text>
                </TouchableOpacity >
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginTop: 100
    },
    nickname:{
        marginTop: 30,
        fontSize: 30,
        fontWeight: 'bold'
    },
    email:{
        marginTop: 20,
        fontSize: 25
    },
    buttom:{
        marginTop: 30,
        padding: 10,
        backgroundColor: '#4286f4'
    },
    buttomText:{
        fontSize: 20,
        color: '#FFF'
    }
})

export default Profile