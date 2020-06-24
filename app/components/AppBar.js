import React, { Component } from 'react';
import {
      View,
      Text,
      Dimensions,
      TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

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
                              <View style={{ padding: 8, opacity: 1 }}>
                                    {/* <Text style={{ fontSize: 20, padding: 8 }}>{'='}</Text> */}
                                    <Icon name="bars" size={20} color="#fff" />
                              </View>
                        </TouchableOpacity>
                        <Text style={{ fontFamily: 'SourceSansPro-SemiBold', fontSize: 20, color: 'white', textAlign: 'center' }}>{'User Manual Nirvana'}</Text>
                        <TouchableOpacity onPress={() => { }}>
                              <View style={{ opacity: 0, padding: 8 }}>
                                    {/* <Text style={{ fontSize: 20, padding: 8 }}>{'='}</Text> */}
                                    <Icon name="bars" size={20} color="#fff" />
                              </View>
                        </TouchableOpacity>
                  </View>
            );
      }
}