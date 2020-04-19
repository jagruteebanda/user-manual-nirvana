import 'react-native-get-random-values';
import React from 'react';
import {
      View, Dimensions, Text, NativeModules
} from 'react-native';
import { WebView } from 'react-native-webview';
import TokenGenerator from './OAuth/TokenGenerator';

const JWTTokenGenerator = new TokenGenerator();

const { width, height } = Dimensions.get('window');

class SSOLogin extends React.Component {
      constructor(props) {
            super(props);
            this.state = {

            }
      }

      handleNavigationChange = (e) => {
            let userData = {};
            if (e.url.includes('https://az19fgwa01t.azurewebsites.net/sso/v1/profile')) {
                  e.url.split('?')[1].split('&').map((item, i) => {
                        userData[item.split('=')[0]] = item.split('=')[1]
                  });
                  JWTTokenGenerator.JWTSignWithUDID(userData.email, NativeModules.MyDeviceInfo.getUniqueId).then((token) => {
                        window.UserManualNirvana.setAuthToken(token);
                        // get user details
                        fetch(`https://az19fgwa01t.azurewebsites.net/User/${userDetails['user']['id']}/Modality`, {
                  method: "GET",
                  headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'authorization': userDetails.accessToken
                  }
            })
                  .then(response => response.json())
                  .then(response => {
                        // console.log('ithe aala:: ', response);
                        this.setState({
                              modalities: response.docs
                        })
                  })
                  .catch(error => {
                        console.log("upload error", error);
                  });
                        this.props.navigation.navigate('Home');
                  }).catch((error) => {
                        console.log('Error: ', error);
                  });
            }
      }
      render() {
            return (
                  <View style={{ flex: 1, width, height, backgroundColor: 'yellow' }}>
                        <WebView
                              source={{ uri: 'https://az19fgwa01t.azurewebsites.net/sso/v1/login' }}
                              style={{ width, height }}
                              onNavigationStateChange={(e) => this.handleNavigationChange(e)}
                        />
                        {/* <Text>hello</Text> */}
                  </View>
            )
      }
}

export default SSOLogin;