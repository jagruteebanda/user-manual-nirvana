import React, { Component } from 'react';
import {
      View,
      Text,
      Dimensions,
      TouchableOpacity
} from 'react-native';
const { width, height } = Dimensions.get('window');

export default class Home extends Component {
      constructor(props) {
            super(props);
            this.state = {

            }
      }

      render() {
            return (
                  <View style={{ flexDirection: 'row', alignItems: 'center', width, height: 50, backgroundColor: '#00cc99', justifyContent: 'space-between' }}>
                        <TouchableOpacity onPress={() => { }}>
                              <View style={{}}>
                                    <Text style={{ fontSize: 20, padding: 8 }}>{'='}</Text>
                              </View>
                        </TouchableOpacity>
                        <Text style={{ fontSize: 20, color: 'white' }}>{'User Manual Nirvana'}</Text>
                        <TouchableOpacity onPress={() => { }}>
                              <View style={{ opacity: 0 }}>
                                    <Text style={{ fontSize: 20, padding: 8 }}>{'='}</Text>
                              </View>
                        </TouchableOpacity>
                  </View>
            );
      }
}