import React, { Component } from "react";
import { View, Dimensions, Text, TouchableOpacity } from "react-native";
import WebView from 'react-native-webview';

const { width, height } = Dimensions.get('window');

export default class HTMLViewScreen extends Component {

      constructor(props) {
            super(props);
            this.state = {
                  taskContent: this.props.navigation.state.params.taskContent
            }
      }

      render() {
            return (
                  <View style={{ flex: 1, width, height }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width, height: 50, backgroundColor: '#00cc99' }}>
                              <TouchableOpacity onPress={() => this.props.navigation.navigate('TaskListView')}>
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
                        <WebView
                              source={{ html: this.state.taskContent }}
                              style={{ flex: 1, width, height: height - 100 }}
                        />
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('TaskDataView')}>
                              <View style={{ width, height: 50, padding: 8, backgroundColor: '#333333', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ color: 'white', fontSize: 18, textAlign: 'center' }}>{'Save Task Content'}</Text>
                              </View>
                        </TouchableOpacity>
                  </View>
            );
      }
}