import React, { Component } from 'react';
import { View, Dimensions, TouchableOpacity, Text, TextInput, Picker, ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const { width, height } = Dimensions.get('window');

export default class UploadTask extends Component {

      constructor(props) {
            super(props);
            this.state = {
                  taskName: '',
                  accessLevelId: 1,
                  revesionNumber: '123456',
                  taskDescription: ''
            }
            // console.log(Object.keys(this.props.navigation.state.params.taskData));
      }

      saveTaskContent = () => {
            let taskData = this.props.navigation.state.params.taskData;
            // console.log(Object.keys(taskData));
            let selectedModality = window.UserManualNirvana.getSelectedModality();
            // let productDetails = window.UserManualNirvana.getProductDetails();
            // let activityDetails = window.UserManualNirvana.getActivityDetails();
            const body = JSON.stringify([
                  {
                        // "taskName": this.state.taskName,
                        // "taskDescription": "Added new product",
                        // "modalityId": selectedModality.id,
                        // "productId": productDetails.id,
                        // "activityId": activityDetails.id,
                        // "accessToken": window.UserManualNirvana.getUserDetails().accessToken
                        name: this.state.taskName,
                        taskNumber: `${selectedModality.abbr}_*`,
                        accessLevelId: 1,
                        contentId: taskData.contentId,
                        description: this.state.taskDescription,
                        revesion: this.state.revesionNumber,
                        isDraft: true,
                        isActive: true,
                        _revesion: 0,
                        modalityId: selectedModality.id
                  }
            ]);
            fetch('https://az19fgwa01t.azurewebsites.net/Task', {
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
                        console.log('upload task:: ', response);
                        this.setState({
                              loading: false
                        });
                        if (response.statusCode === 500) {
                              ToastAndroid.show("There was error saving the task!", ToastAndroid.SHORT);
                        } else {
                              // window.UserManualNirvana.setProductDetails(response[0]);
                              ToastAndroid.show("Task has been saved successfully!", ToastAndroid.SHORT);
                              this.props.navigation.navigate('TaskListView', { taskAdded: taskData });
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
            const taskData = this.props.navigation.state.params.taskData;
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
                                    <Text style={{ color: 'white', fontSize: 18 }}>{'Upload Task'}</Text>
                              </View>
                              <View style={{ opacity: 0, padding: 8 }}>
                                    {/* <Text style={{ color: 'white', fontSize: 18 }}>{'<'}</Text> */}
                                    <Icon name="arrow-circle-left" size={20} color="#fff" />
                              </View>
                        </View>
                        <View style={{ flex: 1, width, height: height - 84 }}>
                              <View style={{ height: 50, paddingLeft: 16, justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 18 }}>{'Task Name:'}</Text>
                              </View>
                              <View style={{ height: 50, paddingLeft: 16, paddingRight: 16, justifyContent: 'center', alignItems: 'center' }}>
                                    <TextInput
                                          style={{ borderColor: '#e6e6e6', borderWidth: 1, width: width - 32, paddingLeft: 16, paddingRight: 16 }}
                                          onChangeText={(text) => this.setState({ taskName: text })}
                                          value={taskData.taskName}
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
                                          onChangeText={(text) => this.setState({ revesionNumber: text })}
                                          value={this.state.revesionNumber}
                                          placeholder={'Enter revesion number here'}
                                    />
                              </View>
                              <View style={{ height: 50, paddingLeft: 16, justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 18 }}>{'Task Description:'}</Text>
                              </View>
                              <View style={{ height: 50, paddingLeft: 16, paddingRight: 16, justifyContent: 'center', alignItems: 'center' }}>
                                    <TextInput
                                          style={{ borderColor: '#e6e6e6', borderWidth: 1, width: width - 32, paddingLeft: 16, paddingRight: 16 }}
                                          onChangeText={(text) => this.setState({ taskDescription: text })}
                                          value={taskData.taskDescription}
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