import React, { Component } from "react";
import { View, Dimensions, Text, TouchableOpacity, ToastAndroid } from "react-native";
import WebView from 'react-native-webview';
import Icon from 'react-native-vector-icons/FontAwesome5';

const { width, height } = Dimensions.get('window');

export default class HTMLViewScreen extends Component {

      constructor(props) {
            super(props);
            this.state = {
                  // taskData: this.props.navigation.state.params.taskData
            }
            // console.log(this.props.navigation.state.params, '========================>');
      }

      uploadTaskContent = () => {
            // console.log(Object.keys(this.props.navigation.state.params.taskData.task))
            const body = JSON.stringify([
                  {
                        "taskName": this.props.navigation.state.params.taskData.task.taskName,
                        "accessToken": window.UserManualNirvana.getUserDetails().accessToken
                  }
            ]);
            fetch("http://localhost:3000/apis/html/upload", {
                  method: "POST",
                  headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': window.UserManualNirvana.getUserDetails().accessToken
                  },
                  body
            })
                  .then(response => response.json())
                  .then(response => {
                        // console.log('ithe aala:: ', response);
                        this.setState({
                              loading: false
                        });
                        if (response.statusCode === 500) {
                              ToastAndroid.show("There was error saving the task!", ToastAndroid.SHORT);
                        } else {
                              // window.UserManualNirvana.setProductDetails(response[0]);
                              ToastAndroid.show("Task has been saved successfully!", ToastAndroid.SHORT);
                              this.props.navigation.navigate('UploadTask', {
                                    taskData: {
                                          ...this.props.navigation.state.params.taskData.task,
                                          contentId: JSON.parse(response.result).contentId
                                    }
                              });
                              // this.props.navigation.goBack(); // check this
                        }
                  })
                  .catch(error => {
                        console.log("upload error", error);
                  });


      }

      render() {
            return (
                  <View style={{ flex: 1, width, height }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width, height: 50, backgroundColor: '#00cc99' }}>
                              <TouchableOpacity onPress={() => this.props.navigation.navigate('TaskListView')}>
                                    <View style={{ padding: 8 }}>
                                          {/* <Text style={{ color: 'white', fontSize: 18 }}>{'<'}</Text> */}
                                          <Icon name="arrow-circle-left" size={20} color="#fff" />
                                    </View>
                              </TouchableOpacity>
                              <View style={{}}>
                                    <Text style={{ color: 'white', fontSize: 18 }}>{'HTML View'}</Text>
                              </View>
                              <View style={{ opacity: 0, padding: 8 }}>
                                    {/* <Text style={{ color: 'white', fontSize: 18 }}>{'<'}</Text> */}
                                    <Icon name="arrow-circle-left" size={20} color="#fff" />
                              </View>
                        </View>
                        <WebView
                              source={{ html: this.props.navigation.state.params.taskData.task.taskContent }}
                              style={{ flex: 1, width, height: height - 100, }}
                        />
                        <TouchableOpacity onPress={() => this.uploadTaskContent()}>
                              <View style={{ width, height: 50, padding: 8, backgroundColor: '#333333', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ color: 'white', fontSize: 18, textAlign: 'center' }}>{'Upload Task Content'}</Text>
                              </View>
                        </TouchableOpacity>
                  </View>
            );
      }
}