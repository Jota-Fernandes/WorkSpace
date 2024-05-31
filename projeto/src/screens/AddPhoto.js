import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPost } from '../store/actions/posts';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Image,
    Dimensions,
    Platform,
    ScrollView,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';

class AddPhoto extends Component {
    state = {
        image: null,
        comment: ''
    };

    pickImage = () => {
        ImagePicker.launchCamera({
            mediaType: 'photo',
            maxWidth: 800,
            maxHeight: 600,
            includeBase64: true,
        }, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                this.setState({
                    image: { uri: response.assets[0].uri }
                });
            }
        });
    }

    save = async () => {
        this.props.onAddPost({
            id: Math.random(),
            nickname: this.props.name,
            email: this.props.email,
            image: this.state.image,
            comments: [{
                nickname: this.props.name,
                comment: this.state.comment
            }]
        });
        this.setState({ image: null, comment: '' });
        this.props.navigation.navigate('Feed');
    };

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.title}>Compartilhe sua imagem</Text>
                    {this.state.image && (
                        <View style={styles.imageContainer}>
                            <Image source={this.state.image} style={styles.image} />
                        </View>
                    )}
                    <TouchableOpacity onPress={this.pickImage} style={styles.button}>
                        <Text style={styles.buttonText}>Escolha uma foto</Text>
                    </TouchableOpacity>
                    <TextInput
                        placeholder='Digite um comentário'
                        style={styles.input}
                        value={this.state.comment}
                        onChangeText={comment => this.setState({ comment })}
                    />
                    <TouchableOpacity onPress={this.save} style={styles.button}>
                        <Text style={styles.buttonText}>Salvar</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        marginTop: Platform.OS === 'ios' ? 30 : 10,
        fontWeight: 'bold'
    },
    imageContainer: {
        width: '90%',
        height: Dimensions.get('window').width * 3 / 4,
        backgroundColor: '#EEE',
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    button: {
        marginTop: 30,
        padding: 10,
        backgroundColor: '#4286f4'
    },
    buttonText: {
        fontSize: 20,
        color: '#FFF'
    },
    input: {
        marginTop: 20,
        width: '90%'
    }
});

const mapStateToProps = ({user}) => {
    return {
        email: user.email,
        name: user.name
    };
};

const mapDispatchToProps = dispatch =>{
    return {
        onAddPost: post => dispatch(addPost(post))
    }
}

export default connect(mapStateToProps,mapDispatchToProps )(AddPhoto);
