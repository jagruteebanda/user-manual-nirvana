import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, SafeAreaView, FlatList, ToastAndroid } from 'react-native';

const { width, height } = Dimensions.get('window');


export default class ActivityListView extends Component {
      constructor(props) {
            super(props);
            this.state = {
                  activityTaskData: [],
                  addedActivity: false
                  // activityTaskData: [{
                  //       key: 'activity-1',
                  //       activityId: 1,
                  //       activityName: 'Repair',
                  //       activityDescription: 'activity',
                  //       tasks: [{
                  //             taskName: 'Task 1',
                  //             taskDescription: 'Task 1 description',
                  //             taskContent: '<html>hi Jagrutee</html>'
                  //       },{
                  //             taskName: 'Task 2',
                  //             taskDescription: 'Task 2 description',
                  //             taskContent: ''
                  //       }]
                  // }, {
                  //       key: 'activity-2',
                  //       activityId: 2,
                  //       activityName: 'Installation',
                  //       activityDescription: 'activity',
                  //       tasks: [{
                  //             taskName: 'Task 2',
                  //             taskDescription: 'Task 2 description',
                  //             taskContent: ''
                  //       },
                  //       {
                  //             taskName: 'Task 5',
                  //             taskDescription: 'Task 5 description',
                  //             taskContent: ''
                  //       }]
                  // }, {
                  //       key: 'activity-3',
                  //       activityId: 3,
                  //       activityName: 'Safety',
                  //       activityDescription: 'activity',
                  //       tasks: [{
                  //             taskName: 'Task 3',
                  //             taskDescription: 'Task 3 description',
                  //             taskContent: ''
                  //       }]
                  // }]
            }
      }

      componentDidMount = () => {
            let activityTaskData = window.UserManualNirvana.getPDFDetails();
            let activityTaskArray = [];
            Object.keys(activityTaskData).map((activityName, i) => {
                  let taskArray = [];
                  Object.keys(activityTaskData[activityName]).map((taskName, j) => {
                        // console.log(activityTaskData[activityName][taskName]['taskData']['taskContent']);
                        taskArray.push({
                              taskId: j,
                              taskName,
                              taskDescription: `${taskName} adding to the task list`,
                        });
                        if (activityTaskData[activityName][taskName][0]['taskData'] && activityTaskData[activityName][taskName][0]['taskData']['taskContent']) {
                              // console.log(activityTaskData[activityName][taskName][0]['taskData']['taskContent'], '=======================');
                              taskArray[taskArray.length - 1]['taskContent'] = activityTaskData[activityName][taskName][0]['taskData']['taskContent']
                        }
                        return taskName;
                  });
                  activityTaskArray.push({
                        activityId: i,
                        activityName,
                        activityDescription: `Added ${activityName} activity`,
                        activityComments: '',
                        taskList: taskArray
                  });
                  return activityName;
            });
            this.setState({
                  activityTaskData: activityTaskArray
            }, () => {
                  console.log(activityTaskData)
            })
      }

      handleActivityPress = (item) => {
            this.props.navigation.navigate('TaskListView', { taskData: item.taskList });
      }

      handleAddActivity = (item) => {
            let selectedModality = window.UserManualNirvana.getSelectedModality();
            const body = JSON.stringify([
                  {
                        "name": item.activityName,
                        "description": item.activityDescription,
                        "comment": "created new activity",
                        "modalityId": selectedModality.id,
                  }
            ]);
            fetch(`https://az19fgwa01t.azurewebsites.net/Modality/${selectedModality.id}/Activity`, {
                  method: "POST",
                  headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'authorization': window.UserManualNirvana.getUserDetails().accessToken
                  },
                  body
            })
                  .then(response => response.json())
                  .then(response => {
                        console.log('ithe aala:: ', response);
                        if (response.statusCode === 500) {
                              ToastAndroid.show("There was error saving thr activity!", ToastAndroid.SHORT);
                        } else if (response.code === 200) {
                              this.setState({
                                    addedActivity: true
                              });
                              // window.UserManualNirvana.setProductDetails(response[0]);
                              ToastAndroid.show("Activity has been saved successfully!", ToastAndroid.SHORT);
                              // this.props.navigation.navigate('AddProductPart', { productName: this.state.productName });
                        }
                  })
                  .catch(error => {
                        console.log("upload error", error);
                  });
      }

      renderItem = (item) => {
            return (
                  <TouchableOpacity onPress={() => this.handleActivityPress(item)}>
                        <View style={{ flex: 1, flexDirection: 'row', width, height: 60, backgroundColor: '#ffffff', borderBottomColor: '#e6e6e6', borderBottomWidth: 1, alignItems: 'center', paddingLeft: 16, paddingRight: 16, justifyContent: 'space-between' }}>
                              <Text style={{ color: '#333333' }}>{item.activityName}</Text>
                              <TouchableOpacity onPress={() => {
                                    this.state.addedActivity ?
                                    ToastAndroid.show('Activity already added! Click on Activity to save its tasks', ToastAndroid.LONG)
                                    : 
                                    this.handleAddActivity(item)
                              }}>
                                    <View style={{ width: 100, height: 40, backgroundColor: this.state.addedActivity ? '#e6e6e6' : '#333333', alignItems: 'center', justifyContent: 'center' }}>
                                          <Text style={{ color: this.state.addedActivity ? '#cdcdcd' : '#ffffff' }}>{this.state.addedActivity ? 'Added' : 'Add activity'}</Text>
                                    </View>
                              </TouchableOpacity>
                        </View>
                  </TouchableOpacity>
            );
      }

      render() {
            return (
                  <View style={{ flex: 1, width, height }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width, height: 50, backgroundColor: '#00cc99' }}>
                              <TouchableOpacity onPress={() => this.props.navigation.navigate('PDFViewScreen')}>
                                    <View style={{ padding: 8 }}>
                                          <Text style={{ color: 'white', fontSize: 18 }}>{'<'}</Text>
                                    </View>
                              </TouchableOpacity>
                              <View style={{}}>
                                    <Text style={{ color: 'white', fontSize: 18 }}>{'Activity List'}</Text>
                              </View>
                              <View style={{ opacity: 0, padding: 8 }}>
                                    <Text style={{ color: 'white', fontSize: 18 }}>{'<'}</Text>
                              </View>
                        </View>
                        <SafeAreaView style={{ flex: 1, backgroundColor: '#e6e6e6' }}>
                              <FlatList
                                    data={this.state.activityTaskData}
                                    renderItem={({ item }) => this.renderItem(item)}
                                    keyExtractor={item => item.activityId}
                              />
                        </SafeAreaView>
                  </View>
            );
      }
}