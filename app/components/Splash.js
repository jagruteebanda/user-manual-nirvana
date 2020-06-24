import React, { Component } from 'react';
import {
      View,
      Text,
      Dimensions,
      Image,
      AsyncStorage
} from 'react-native';
// import { AsyncStorage } from 'react-native-community/async-storage';

const { width, height } = Dimensions.get('window');

export default class Splash extends Component {
      constructor(props) {
            super(props);
            this.state = {
                  // showSplash: true
            }
      }

      componentDidMount = () => {
            setTimeout(async () => {
                  // this.setState({ showSplash: false });
                  // this.props.navigation.navigate('SSOLogin');
                  let userDetails = JSON.parse(await AsyncStorage.getItem('userDetails'));
                  if (userDetails !== null && userDetails.accessToken !== null) {
                        window.UserManualNirvana.setUserDetails(userDetails);
                        this.props.navigation.navigate('Home');
                  } else {
                        this.props.navigation.navigate('Login');
                  }
                  // this.props.navigation.navigate('UploadTask');
            }, 2000);
      }

      render() {
            return (
                  // <View>
                  // {
                  // this.state.showSplash &&
                  <View style={{ flex: 1, width, height, backgroundColor: '#00cc99', alignItems: 'center', justifyContent: 'center' }}>
                        <Image
                              style={{ width: 150, height: 150 }}
                              source={require('../images/app-logo.png')}
                        />
                        <Text style={{ fontFamily: 'SourceSansPro-SemiBold', fontSize: 20, color: '#ffffff', marginTop: 10 }}>{'USER MANUAL NIRVANA'}</Text>
                        <Text style={{ fontFamily: 'SourceSansPro-Light', fontSize: 16, color: '#ffffff' }}>{'Powered by TensorFlow'}</Text>
                  </View>
                  // }
                  // </View>
            )
      }
}

// export default Home;