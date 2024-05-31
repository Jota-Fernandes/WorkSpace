import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Image
} from 'react-native';
import { connect } from 'react-redux';
import { login } from '../store/actions/user';
import icon from '../../assets/imgs/clonegram.png'

class Login extends Component {
    state = {
        name: 'temporario',
        email: '',
        password: ''
    };

    handleLogin = () => {
        const { name ,email, password } = this.state;
        this.props.onLogin({ name, email, password });
        this.props.navigation.navigate('Home', { screen: 'Feed' });
    };

    render() {
        return (
            <View style={styles.container}>
                <Image source={icon} style={styles.image}/>
                <Text style={styles.title}>Clonegram</Text>
                <TextInput
                    placeholder='Email'
                    style={styles.input}
                    autoFocus={true}
                    keyboardType='email-address'
                    value={this.state.email}
                    onChangeText={email => this.setState({ email })}
                />
                <TextInput
                    placeholder='Senha'
                    style={styles.input}
                    secureTextEntry={true}
                    value={this.state.password}
                    onChangeText={password => this.setState({ password })}
                />
                <TouchableOpacity onPress={this.handleLogin} style={styles.button}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')} style={styles.button}>
                    <Text style={styles.buttonText}>Criar nova conta...</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        marginTop: 30,
        padding: 10,
        backgroundColor: '#4286f4',
        borderRadius: 10
    },
    buttonText: {
        fontSize: 20,
        color: '#FFF'
    },
    input: {
        marginTop: 20,
        width: '90%',
        backgroundColor: '#EEE',
        height: 40,
        borderWidth: 1,
        borderColor: '#333',
        borderRadius: 10
    },
    image: {
        height: 100,
        width: 100,
    },
    title: {
        color: '#000',
        fontFamily: 'shelter',
        height: 50,
        fontSize: 30
    }
});

const mapDispatchToProps = dispatch => {
    return {
        onLogin: user => dispatch(login(user))
    };
};

export default connect(null, mapDispatchToProps)(Login);
