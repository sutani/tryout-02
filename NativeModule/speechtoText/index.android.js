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

} from 'react-native';
const SpeechModule = NativeModules.speechtoText;

export default class speechtoText extends Component {
   constructor(props){
    super(props);
    this.state = {
      text: 'initial text'
    }
  }
  speechtotex(){
    SpeechModule.start()
    .then(resp =>{
      console.log('hello', resp);
      this.setState({ text: resp });
    })
    .catch(err => console.log('err', err))
  }

    render() {
     return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <TouchableOpacity onPress={() => this.speechtotex()}>
        <Text style={styles.instructions}>
          Tap here to start Speech To Text
        </Text>
        </TouchableOpacity>
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