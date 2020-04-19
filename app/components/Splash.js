import React, { Component } from 'react';
import {
      View,
      Text,
      Dimensions,
      Image
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default class Splash extends Component {
      constructor(props) {
            super(props);
            this.state = {
                  // showSplash: true
            }
      }

      componentDidMount = () => {
            setTimeout(() => {
                  // this.setState({ showSplash: false });
                  // this.props.navigation.navigate('SSOLogin');
                  this.props.navigation.navigate('Login');
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
                                    source={require('../images/um-logo.png')}
                                     />
                                    <Text style={{ fontSize: 20, color: '#ffffff', marginTop: 10 }}>{'USER MANUAL NIRVANA'}</Text>
                                    <Text style={{ fontSize: 16, color: '#ffffff' }}>{'Powered by TensorFlow'}</Text>
                              </View>
                        // }
                  // </View>
            )
      }
}

// export default Home;