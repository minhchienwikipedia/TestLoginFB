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
  TouchableOpacity
} from 'react-native';
import FBSDK, {LoginManager} from 'react-native-fbsdk'
const {
  LoginButton,
  AccessToken
} = FBSDK;
export default class LoginFB extends Component {
  _fbAuth(){
    LoginManager.logInWithReadPermissions(['public_profile']).then(function(result) {
      if(result.isCancelled){
        console.log('Login was cancelled');
      }else {
        console.log('Login was a success' + result.grantedPermissions.toString());
      }
    },function(error) {
      console.log('An error occured' + error);
    })
  }
  async initUser(token) {
  fetch('https://graph.facebook.com/v2.8/me?fields=id,name,gender,age_range,link,locale,picture,cover&access_token=' + token)
  .then((response) => response.json())
  .then((json) => {
    // Some user object has been set up somewhere, build that user here
    // user.name = json.name
    // user.id = json.id
    // user.user_friends = json.friends
    // user.email = json.email
    // user.username = json.name
    // user.loading = false
    // user.loggedIn = true
    console.log(json);
    //user.avatar = setAvatar(json.id)
  })
  .catch(() => {
    console.log('ERROR GETTING DATA FROM FACEBOOK');
  })
}
  render() {
    return (
      <View style={styles.container}>
        <LoginButton
          publishPermissions={["publish_actions"]}
          onLoginFinished={
            (error, result) => {
              if (error) {
                alert("login has error: " + result.error);
              } else if (result.isCancelled) {
                alert("login is cancelled.");
              } else {
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    console.log(data.accessToken.toString());
                    this.initUser(data.accessToken);
                  }
                )

              }
            }
          }
          onLogoutFinished={() => alert("logout.")}/>
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

AppRegistry.registerComponent('LoginFB', () => LoginFB);
