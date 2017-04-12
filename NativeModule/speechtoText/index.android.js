/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    NativeModules,
    TouchableOpacity,
    Image,

} from 'react-native';
const SpeechModule = NativeModules.speechtoText;
const cloud = require('./google.png');

export default class speechtoText extends Component {
   constructor(props){
    super(props);
    this.state = {
      text: 'Your Text'
    }
  }
  speechtotext(){
    SpeechModule.start()
    .then(resp =>{
      this.setState({ text: resp });
    })
    .catch(err => console.log('err', err))
  }

    render() {
     return (
      <View style={styles.container}>
          <View>
        <TouchableOpacity onPress={() => this.speechtotext()}> 
          <Image
                style={{ width: 100, height: 100, alignItems:'center' }}
                source={cloud}
              />
              </TouchableOpacity>
              </View>
        <Text style={styles.welcome}>
          Speech To Text
        </Text>
        <Text style={styles.instructions}>
          {this.state.text}
        </Text>
      </View>
    );

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

AppRegistry.registerComponent('speechtoText', () => speechtoText);