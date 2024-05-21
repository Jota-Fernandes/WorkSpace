import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addPost} from '../store/actions/posts'
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
    Alert
} from 'react-native'
import ImagePicker from 'react-native-image-pickers'

const noUser = 'Você precisa estar logado para adicionar a imagem'

class AddPhoto extends Component {
    state = {
        image: null,
        comment: '',
    }

    pickImage = () => {
        if(!this.props.name){
            Alert.alert('Falha', noUser)
            return
        }
        ImagePicker.showImagePicker({
            title: 'Escolha a imagem',
            maxHeight: 600,
            maxWidth: 800
        }, res => {
            if (!res.didCancel){
                this.setState({image: {uri: res.uri, base64: res.data}})
            }
        })
    }

    save = async () =>{
        if(!this.props.name){
            Alert.alert('Falha', noUser)
            return
        }
        this.props.onAddPost({
            id: Math.random(),
            nickname: this.props.name,
            email: this.props.email,
            image: this.state.image,
            comments:[{
                nickname: this.props.name
            }]
        })

        this.setState({image: null, comment: ''})
        this.props.navigation.navigate
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text style={style.title}>Compartilhe sua imagem</Text>
                    <View style={styles.imageContainer}>
                        <Image source={this.state.image} style={styles.image}/>
                    </View>
                    <TouchableOpacity onPress={this.pickImage}>
                        <Text style={styles.buttomText}>Escolha uma foto</Text>
                    </TouchableOpacity>
                    <TextInput placeholder='Digite um comentário'
                        style={styles.input} value={this.state.comment}
                        onChangeText={comment => this.setState({comment})}/>
                    <TouchableOpacity onPress={this.save}
                        style={styles.buttom}>
                            <Text style={styles.buttomText}>Salvar</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center'
    },
    title:{
        fontSize:20,
        marginTop: Platform.OS === 'ios' ? 30:10,
        fontWeight: 'bold'
    },
    imageContainer:{
        width: '90%',
        height: Dimensions.get('window').width * 3/4,
        backgroundColor: '#EEE',
        marginTop:10
    },
    image:{
        width: '100%',
        height: Dimensions.get('window').width/2,
        resideMode: 'center'
    },
    buttom:{
        marginTop: 30,
        padding: 10,
        backgroundColor: '#4286f4'
    },
    buttomText:{
        fontSize: 20,
        color: '#FFF'
    },
    input:{
        marginTop:20,
        width: '90%'
    }
})

const mapStateToProps = ({user}) => {
    return {
        email: user.email,
        name: user.name
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddPost: post => dispatch(addPost(post))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPhoto)