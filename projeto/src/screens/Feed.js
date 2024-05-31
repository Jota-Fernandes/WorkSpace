import React, {Component} from 'react'
import { StyleSheet, FlatList, View } from 'react-native'
import Header from '../components/Header'
import Post from '../components/Post'

export default function Feed(){
    state = {
        posts: [{
            id: Math.random(),
            nickname: 'Rafael Pereira Filho',
            email: 'rafaelprrflh@gmail.com',
            image: require('../../assets/imgs/copa.jpg'),
            comments: [{
                nickname: 'John Ray Sheldon',
                comment: 'Stunning!'
            }, {
                nickname: 'Ana Julia Arruda',
                comment: 'Foto Linda! Onde foi tirada?'
            }]
        },{
            id: Math.random(),
            nickname: 'Francisco Leandro Lima',
            email: 'fllima@gmail.com',
            image: require('../../assets/imgs/pele.jpg'),
            comments: []
        }]
    }
        return(
            <View style={styles.container}>
                <Header/>
                <FlatList 
                    data={this.state.posts}
                    keyExtractor={item => `${item.id}`}
                    renderItem={({item}) =>
                        <Post key={item.id}{...item}/>}/>
            </View>
        )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCCFF'
    }
})