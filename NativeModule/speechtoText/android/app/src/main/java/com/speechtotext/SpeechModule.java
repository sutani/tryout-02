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