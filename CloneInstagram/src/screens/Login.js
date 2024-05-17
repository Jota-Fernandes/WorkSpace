import React, {Component} from 'react'
import { connect } from 'react-redux'
import {login} from '../store/actions/user'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput
} from 'react-native'

class Login extends Component {
    state = {
        name: 'Temporario',
        email: '',
        password: ''
    }

    login = () => {
        this.props.onLogin({...this.state})
        this.props.navigation.navigate('Profile')
    }

    render(){
        return (
            <View style={styles.container}>
                <TextInput placeholder='Email' style={styles.input} autoFocus={true}/>
                <TextInput/>
                <TouchableOpacity>
                    <Text style={styles.buttomText}></Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.buttomText}>Criar nova conta</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {

    },
    buttom:{

    },
    buttomText:{

    },
    input:{

    }
})

const mapDispatchToProps = dispatch =>{
    return {
        onLogin: user => dispatch(login(user))
    }
}

export default connect(null, mapDispatchToProps)(Login)