import React, { Component } from 'react';
import { View, Dimensions, TouchableOpacity, Text, TextInput, Picker } from 'react-native';

const { width, height } = Dimensions.get('window');

export default class UploadTask extends Component {

      constructor(props) {
            super(props);
            this.state = {
                  taskName: this.props.navigation.state.params || '',
                  accessLevelId: 1,
                  taskDescription: this.props.navigation.state.params || ''
            }
      }

      saveTaskContent = () => {
            let selectedModality = window.UserManualNirvana.getSelectedModality();
            let productDetails = window.UserManualNirvana.getProductDetails();
            let activityDetails = window.UserManualNirvana.getActivityDetails();
            const body = JSON.stringify([
                  {
                        "taskName": this.state.productName,
                        "taskDescription": "Added new product",
                        "modalityId": selectedModality.id,
                        "productId": productDetails.id,
                        "activityId": activityDetails.id
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
                              // this.props.navigation.goBack(); // check this
                        }
                  })
                  .catch(error => {
                        console.log("upload error", error);
                  });
      }

      cancelUploadTask = () => {
            this.props.navigation.navigate('HTMLViewScreen');
      }

      render() {
            return (
                  <View style={{ flex: 1, width, height }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width, height: 50, backgroundColor: '#00cc99' }}>
                              <TouchableOpacity onPress={() => this.props.navigation.navigate('ActivityListView')}>
                                    <View style={{ padding: 8 }}>
                                          <Text style={{ color: 'white', fontSize: 18 }}>{'<'}</Text>
                                    </View>
                              </TouchableOpacity>
                              <View style={{}}>
                                    <Text style={{ color: 'white', fontSize: 18 }}>{'Upload Task'}</Text>
                              </View>
                              <View style={{ opacity: 0, padding: 8 }}>
                                    <Text style={{ color: 'white', fontSize: 18 }}>{'<'}</Text>
                              </View>
                        </View>
                        <View style={{ flex: 1, width, height: height - 84 }}>
                              <View style={{ height: 50, paddingLeft: 16, justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 18 }}>{'Task Name:'}</Text>
                              </View>
                              <View style={{ height: 50, paddingLeft: 16, paddingRight: 16, justifyContent: 'center', alignItems: 'center' }}>
                                    <TextInput
                                          style={{ borderColor: '#e6e6e6', borderWidth: 1, width: width - 32, paddingLeft: 16, paddingRight: 16 }}
                                          onChangeText={(text) => this.setState({ productName: text })}
                                          value={this.state.taskName}
                                          placeholder={'Enter task name here'}
                                    />
                              </View>
                              <View style={{ height: 50, paddingLeft: 16, justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 18 }}>{'Access Level:'}</Text>
                              </View>
                              <View style={{ height: 50, marginLeft: 16, marginRight: 16, justifyContent: 'center', alignItems: 'center', borderColor: '#e6e6e6', borderWidth: 1 }}>
                                    <Picker
                                          selectedValue={this.state.accessLevelId}
                                          style={{ height: 50, width: width - 32, paddingLeft: 16, paddingRight: 16 }}
                                          onValueChange={(itemValue, itemIndex) => this.handleAccessLevelChange(itemValue)}
                                    >
                                          {/* <Picker.Item label={this.state.accessLevelId} value={this.state.accessLevelId} /> */}
                                          <Picker.Item label={'L0'} value={2} />
                                          <Picker.Item label={'L1'} value={2} />
                                          <Picker.Item label={'LA'} value={2} />
                                          <Picker.Item label={'LX'} value={2} />
                                          <Picker.Item label={'L2'} value={2} />
                                          <Picker.Item label={'L3'} value={2} />
                                    </Picker>
                              </View>
                              <View style={{ height: 50, paddingLeft: 16, justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 18 }}>{'Revision number:'}</Text>
                              </View>
                              <View style={{ height: 50, paddingLeft: 16, paddingRight: 16, justifyContent: 'center', alignItems: 'center' }}>
                                    <TextInput
                                          style={{ borderColor: '#e6e6e6', borderWidth: 1, width: width - 32, paddingLeft: 16, paddingRight: 16 }}
                                          onChangeText={(text) => this.setState({ productName: text })}
                                          value={this.state.taskName}
                                          placeholder={'Enter revesion number here'}
                                    />
                              </View>
                              <View style={{ height: 50, paddingLeft: 16, justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 18 }}>{'Task Description:'}</Text>
                              </View>
                              <View style={{ height: 50, paddingLeft: 16, paddingRight: 16, justifyContent: 'center', alignItems: 'center' }}>
                                    <TextInput
                                          style={{ borderColor: '#e6e6e6', borderWidth: 1, width: width - 32, paddingLeft: 16, paddingRight: 16 }}
                                          onChangeText={(text) => this.setState({ productName: text })}
                                          value={this.state.taskName}
                                          placeholder={'Enter task description here'}
                                    />
                              </View>
                        </View>
                        <View style={{ flexDirection: "row", width, height: 66, padding: 8, backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center' }}>
                              <TouchableOpacity onPress={() => this.saveTaskContent()}>
                                    <View style={{ width: width / 2 - 24, height: 50, padding: 8, backgroundColor: '#00cc99', alignItems: 'center', justifyContent: 'center', marginLeft: 16, marginRight: 8 }}>
                                          <Text style={{ color: 'white', fontSize: 18, textAlign: 'center' }}>{'Save'}</Text>
                                    </View>
                              </TouchableOpacity>
                              <TouchableOpacity onPress={() => this.cancelUploadTask()}>
                                    <View style={{ width: width / 2 - 24, height: 50, padding: 8, backgroundColor: '#00cc99', alignItems: 'center', justifyContent: 'center', marginLeft: 8, marginRight: 16 }}>
                                          <Text style={{ color: 'white', fontSize: 18, textAlign: 'center' }}>{'Cancel'}</Text>
                                    </View>
                              </TouchableOpacity>
                        </View>
                  </View>
            );
      }
}