import React, {Component} from 'react';
import Header from './src/components/Header';
import {View} from 'react-native'
import Post from './src/components/Post'

export default class App extends Component{
  render(){
    const comments = [{
      nickname: 'Joana Elena Silva',
      comment: 'Excelente Foto'
    },{
      nickname: 'Rafael Gustavo Pereira',
      comment: 'Muito ruim! Faça melhor...'
    }]
    return(
      <View style={{flex:1}}>
        <Header/>
        <Post image={require('./assets/imgs/bradesco.jpg')}
          comments={comments}/>
      </View>
    )
  }
}