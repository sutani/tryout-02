# Try Out 02 - Refactory
***


## React Js
![](https://github.com/sutani/tryout-02/blob/master/reactjs/Screenshot_2017-04-12_18-09-17.png)

### How to run
**Client**
* Go to react js  directory using `cd reactjs/todo-list`
* Build react js with `npm start`
* _you see full code in : `reactjs/todo-list/src/App.js`_

**Server**
* Go to `reactjs` directory
* If you just clone this repository, you have to install all dependencies using `yarn install` or `npm install`
* Run the server by executing `node server.js`
* ![](https://github.com/sutani/tryout-02/blob/master/reactjs/Screenshot%20from%202017-04-08%2014:50:44.png)
 
**Data server**
```
var express = require('express');
var app = express();
var port = process.env.PORT || 8000;

var bodyParser = require('body-parser');
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var lists = [];
app.get('/api/todolist', function(req, res) {
    const response = {
        data: lists
    }
    res.send(response);
});
app.post('/api/todolist', function(req, res) {
    var user_id = req.body.id;
    var item = req.body.text;
    var listItem = {
        id: user_id,
        text: item
    }

    res.set('Access-Control-Allow-Origin', '*')
    lists.push(listItem);
    res.send(user_id + item + 'has been received');
});

// start the server
app.listen(port);
console.log('Server localhost :' + port);
```
## Node Modules
![](https://github.com/sutani/tryout-02/blob/master/NativeModule/layout.png)
*
![](https://github.com/sutani/tryout-02/blob/master/NativeModule/speech.png)

# How to run
**Step1**
* Create Module Native in `android/app/src/main/com/speechtotecxt/SpeechModule.java`
```
package com.speechtotext;

import android.app.Activity;
import android.content.Intent;
import android.speech.RecognizerIntent;
import android.widget.Toast;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.ArrayList;

public class SpeechModule extends ReactContextBaseJavaModule implements ActivityEventListener {


    private final int REQ_CODE_SPEECH_INPUT = 100;
    private ReactApplicationContext mReactContext;
    private Promise mPromise;

    public SpeechModule(ReactApplicationContext reactContext) {
        super(reactContext);
        reactContext.addActivityEventListener(this);
        mReactContext = reactContext;
    }


    @Override
    public String getName() {
        return "speechtoText";
    }

    @ReactMethod
    public void start(Promise promise){
        openspeechtoText();
        mPromise = promise;
    }

    private void openspeechtoText(){
        Activity mCurrentActivity = getCurrentActivity();

        Intent intent = new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH);
        intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL,RecognizerIntent.LANGUAGE_MODEL_FREE_FORM);
        intent.putExtra(RecognizerIntent.EXTRA_PROMPT, "Say Something");

         mCurrentActivity.startActivityForResult(intent, REQ_CODE_SPEECH_INPUT);
         {
             Toast.makeText(mReactContext, "FAILED TO SPEECH",
                     Toast.LENGTH_SHORT).show();
         }
    }


    @Override
    public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
        switch (requestCode) {
            case REQ_CODE_SPEECH_INPUT: {
                if (null != data) {

                    ArrayList<String> result = data
                            .getStringArrayListExtra(RecognizerIntent.EXTRA_RESULTS);
                    mPromise.resolve(result.get(0));
                }
                break;
            }
        }
    }



    @Override
    public void onNewIntent(Intent intent) {

    }
}
```
**Step2**
* Create Speech Package in `android/app/src/main/com/speechtotecxt/Speechackage.java`
```
package com.speechtotext;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class SpeechPackage implements ReactPackage{
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> nativeModules = new ArrayList<>();
        nativeModules.add(new SpeechModule(reactContext));
        return nativeModules;
    }

    @Override
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }
}
```

**Step3**
* Add New Package to `MainApplication.java`
```
 @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new SpeechPackage() // <------- _insert new package_
      );
    }
  };
```
**Step4**
* Edit in `index.android.js`
* for example :
```
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
```

### Run Application
* `npm install`
* run with `react-native run-android`


## License
MIT

## Footnote
This repository is created by Sutani Ghifari. Please contact me by email: sutanighifari@gmail.com for further information
