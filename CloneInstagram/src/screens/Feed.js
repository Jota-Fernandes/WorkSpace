import React, {Component} from 'reacte'
import { StyleSheet,FlatList, View } from 'react-native'
import Header from '../components/Header'
import Post from '../components/Post'

class Feed extends Component {
    state = {
        posts: [{
            id: Math.random(),
            nickname: 'Juan de Souza Fernandes Lima',
            email: 'juanlima0604@gmail.com',
            image: require(''),
            comments: [{
                nickname: 'John Ray Sheldon',
                comments: 'Stunning!'
            }, {
                nickname: 'Pedro',
                comments: 'blue eyes'
            }]
        },{
            id: Math.random(),
            nickname: 'Francisco Leandro Lima',
            email: 'fllima@gmail.com',
            image: require(),
            comments: []
        }] 
    }

    render(){
        return (
            <View style={styles.container}>
                <Header />
                <FlatList 
                    data={this.state.posts}
                    keyExtractor={item => `${item.id}`}
                    renderItem={({item}) =>
                        <Post key={item.id}{...item}/>}/>
            </View>
        )
    }
}