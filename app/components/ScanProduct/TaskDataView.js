import React, { Component } from "react";
import { View, Dimensions, TouchableOpacity } from "react-native";

const { width, height } = Dimensions.get('window');

export default class TaskDataView extends Component {
      constructor(props) {
            super(props);
            this.state = {

            }
      }
      render() {
            return (
                  <View style={{ flex: 1, width, height }}>
                         <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width, height: 50, backgroundColor: '#00cc99' }}>
                              <TouchableOpacity onPress={() => this.props.navigation.navigate('HTMLViewScreen')}>
                                    <View style={{ padding: 8 }}>
                                          <Text style={{ color: 'white', fontSize: 18 }}>{'<'}</Text>
                                    </View>
                              </TouchableOpacity>
                              <View style={{}}>
                                    <Text style={{ color: 'white', fontSize: 18 }}>{'HTML View'}</Text>
                              </View>
                              <View style={{ opacity: 0, padding: 8 }}>
                                    <Text style={{ color: 'white', fontSize: 18 }}>{'<'}</Text>
                              </View>
                        </View>
                  </View>
            )
      }
}