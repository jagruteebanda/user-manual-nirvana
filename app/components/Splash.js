import React, { Component } from 'react';
import {
      View,
      Text,
      Dimensions
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
                  this.props.navigation.navigate('Home');
            }, 2000);
      }

      render() {
            return (
                  // <View>
                        // {
                              // this.state.showSplash &&
                              <View style={{ flex: 1, width, height, backgroundColor: '#00cc99', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text>{'USER MANUAL NIRVANA'}</Text>
                                    <Text>{'Powered by TensorFlow'}</Text>
                              </View>
                        // }
                  // </View>
            )
      }
}

// export default Home;