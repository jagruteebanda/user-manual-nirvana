import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, SafeAreaView, FlatList, ToastAndroid, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const { width, height } = Dimensions.get('window');


export default class ActivityListView extends Component {
      constructor(props) {
            super(props);
            this.state = {
                  // activityTaskData: [],
                  addedActivity: false,
                  activityTaskData: [{
                        key: 'activity-1',
                        activityId: 1,
                        activityName: 'REPAIR',
                        activityDescription: 'activity',
                        tasks: [{
                              taskName: 'Task 1',
                              taskDescription: 'Task 1 description',
                              taskContent: '<html>hi Jagrutee</html>'
                        }, {
                              taskName: 'Task 2',
                              taskDescription: 'Task 2 description',
                              taskContent: ''
                        }]
                  }, {
                        key: 'activity-2',
                        activityId: 2,
                        activityName: 'INSTALLATION',
                        activityDescription: 'activity',
                        tasks: [{
                              taskName: 'Task 2',
                              taskDescription: 'Task 2 description',
                              taskContent: ''
                        },
                        {
                              taskName: 'Task 5',
                              taskDescription: 'Task 5 description',
                              taskContent: ''
                        }]
                  }, {
                        key: 'activity-3',
                        activityId: 3,
                        activityName: 'SAFETY',
                        activityDescription: 'activity',
                        tasks: [{
                              taskName: 'Task 3',
                              taskDescription: 'Task 3 description',
                              taskContent: ''
                        }]
                  }]
            }
      }

      componentDidMount = () => {
            // let activityTaskData = window.UserManualNirvana.getPDFDetails();
            // let activityTaskArray = [];
            // Object.keys(activityTaskData).map((activityName, i) => {
            //       let taskArray = [];
            //       Object.keys(activityTaskData[activityName]).map((taskName, j) => {
            //             if (activityTaskData[activityName][taskName][0]['taskData'] && activityTaskData[activityName][taskName][0]['taskData']['taskContent']) {
            //                   taskArray.push({
            //                         id: j,
            //                         taskName,
            //                         taskDescription: `${taskName} adding to the task list`,
            //                         taskContent: activityTaskData[activityName][taskName][0]['taskData']['taskContent']
            //                   });
            //             }
            //             return taskName;
            //       });
            //       activityTaskArray.push({
            //             id: i,
            //             activityName,
            //             activityDescription: `Added ${activityName} activity`,
            //             activityComments: '',
            //             taskList: taskArray,
            //             addedActivity: false
            //       });
            //       return activityName;
            // });
            // this.setState({
            //       activityTaskData: activityTaskArray || []
            // }, () => {
            //       // console.log(activityTaskData)
            // })
      }

      handleActivityPress = (item) => {
            // console.log(item.addedActivity);
            if (!item.addedActivity) {
                  Alert.alert(
                        'You need to save activity to view task list!',
                        `Do you want to save ${item.activityName} activity?`,
                        [
                              {
                                    text: 'Cancel',
                                    onPress: () => { },
                                    style: 'cancel',
                              },
                              { text: 'Yes', onPress: () => this.handleAddActivity(item) },
                        ],
                        { cancelable: false },
                  );
            } else {
                  this.props.navigation.navigate('TaskListView', { activityData: item });
            }
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
                              ToastAndroid.show("There was error saving the activity!", ToastAndroid.SHORT);
                        } else if (response.code === 200) {
                              item['addedActivity'] = true;
                              // window.UserManualNirvana.setProductDetails(response[0]);
                              item['activityId'] = response[0].id;
                              window.UserManualNirvana.setActivityDetails(item);
                              ToastAndroid.show("Activity has been saved successfully!", ToastAndroid.SHORT);
                              // this.props.navigation.navigate('AddProductPart', { productName: this.state.productName });
                              this.props.navigation.navigate('TaskListView', { activityData: item });
                        }
                  })
                  .catch(error => {
                        console.log("upload error", error);
                  });

      }

      renderItem = (item) => {
            return (
                  <TouchableOpacity onPress={() => this.handleActivityPress(item)}>
                        <View style={{ flex: 1, flexDirection: 'row', width: width - 8, height: 60, backgroundColor: '#ffffff', alignItems: 'center', paddingLeft: 16, paddingRight: 16, justifyContent: 'space-between', margin: 4, marginBottom: 1, elevation: 1 }}>
                              <View style={{ flexDirection: 'row' }}>
                                    <Icon name="file-alt" size={20} color="#bfbfbf" />
                                    <Text style={{ marginLeft: 10, color: '#333333' }}>{item.activityName}</Text>
                              </View>
                              <Icon name="arrow-alt-circle-right" size={20} color="#bfbfbf" />
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
                                          {/* <Text style={{ color: 'white', fontSize: 18 }}>{'<'}</Text> */}
                                          <Icon name="chevron-left" size={20} color="#fff" />
                                    </View>
                              </TouchableOpacity>
                              <View style={{}}>
                                    <Text style={{ color: 'white', fontSize: 18 }}>{'Activity List'}</Text>
                              </View>
                              <View style={{ opacity: 0, padding: 8 }}>
                                    <Icon name="arrow-circle-left" size={20} color="#fff" />
                              </View>
                        </View>
                        <SafeAreaView style={{ flex: 1, backgroundColor: '#e6e6e6' }}>
                              <FlatList
                                    data={this.state.activityTaskData}
                                    renderItem={({ item }) => this.renderItem(item)}
                                    keyExtractor={item => item.id}
                              />
                        </SafeAreaView>
                  </View>
            );
      }
}