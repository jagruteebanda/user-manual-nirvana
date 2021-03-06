import React, { Component } from "react";
import { View, Dimensions, Text, SafeAreaView, FlatList, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';

const http = require('../../models/fetch');
const { width, height } = Dimensions.get('window');

export default class TaskListView extends Component {
      constructor(props) {
            super(props);
            this.state = {
                  taskData: []
            }
      }

      UNSAFE_componentWillReceiveProps = (nextProps, nextState) => {
            let newTaskAdded = nextProps.navigation.state.params.taskAdded;
            if (newTaskAdded) {
                  let taskData = this.props.navigation.state.params.activityData.taskList.filter((data) => {
                        if (data.taskName === newTaskAdded.taskName) {
                              data['addedTask'] = true;
                        }
                        return data;
                  });
                  this.setState({ taskData });
            }
      }

      componentDidMount = () => {
            // get list of all activities for that modality
            let selectedModality = window.UserManualNirvana.getSelectedModality();
            const url = `${window.UserManualNirvana.basePath}/Modality/${selectedModality.id}/Task`;
            http.get(url, null, (err, res) => {
                  if (err) {
                        ToastAndroid.show('Error getting activities by modality', ToastAndroid.SHORT);
                  }
                  if (res) {
                        let tasksByModality = res.docs.filter((task) => !task['isDeleted']);
                        // console.log(tasksByModality);
                        let taskData = this.props.navigation.state.params.activityData.taskList.filter((data) => {
                              let doesTaskExist = false;
                              tasksByModality.forEach((task) => {
                                    if (task.name.toLowerCase() === data.taskName.toLowerCase()) {
                                          doesTaskExist = true;
                                    };
                              });
                              data['addedTask'] = doesTaskExist;
                              return data;
                        });
                        this.setState({ taskData });
                  }
            });
      }

      handleTaskPress = (item) => {
            // console.log(item.taskContent, '+++++++++++++++++++++++++++++');
            const activityData = this.props.navigation.state.params.activityData;
            this.props.navigation.navigate('HTMLViewScreen', {
                  taskData: {
                        activityName: activityData.activityName,
                        activityDescription: activityData.activityDescription,
                        activityComments: activityData.activityComments,
                        task: item,
                        addedActivity: true
                  }
            });
      }

      renderItem = (item) => {
            return (
                  // <TouchableOpacity onPress={() => this.handleTaskPress(item)}>
                  //       <View style={{ flex: 1, flexDirection: 'row', width, height: 60, backgroundColor: '#ffffff', borderBottomColor: '#e6e6e6', borderBottomWidth: 1, alignItems: 'center', justifyContent: 'space-between', paddingLeft: 16, paddingRight: 16 }}>
                  //             <Text style={{ color: '#333333' }}>{item.taskName}</Text>
                  //       </View>
                  // </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.handleTaskPress(item)}>
                        <View style={{ flex: 1, flexDirection: 'row', width: width - 8, height: 60, backgroundColor: '#ffffff', alignItems: 'center', paddingLeft: 16, paddingRight: 16, justifyContent: 'space-between', margin: 4, marginBottom: 1, elevation: 1 }}>
                              <View style={{ flexDirection: 'row' }}>
                                    <Icon name="check-circle" size={20} color={(item.addedTask) ? '#00cc99' : "#bfbfbf"} />
                                    <Text style={{ fontFamily: 'SourceSansPro-Light', fontSize: 16, marginLeft: 10, color: (item.addedTask) ? '#00cc99' : "#333333" }}>{item.taskName}</Text>
                              </View>
                              <Icon name="chevron-right" size={20} color={(item.addedTask) ? '#00cc99' : "#bfbfbf"} />
                        </View>
                  </TouchableOpacity>
            );
      }

      render() {
            return (
                  <View style={{ flex: 1, width, height }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width, height: 50, backgroundColor: '#00cc99' }}>
                              <TouchableOpacity onPress={() => this.props.navigation.navigate('ActivityListView')}>
                                    <View style={{ padding: 8 }}>
                                          {/* <Text style={{ color: 'white', fontSize: 18 }}>{'<'}</Text> */}
                                          <Icon name="arrow-circle-left" size={20} color="#fff" />
                                    </View>
                              </TouchableOpacity>
                              <View style={{}}>
                                    <Text style={{ fontFamily: 'SourceSansPro-SemiBold', color: 'white', fontSize: 20 }}>{'Task List'}</Text>
                              </View>
                              <View style={{ opacity: 0, padding: 8 }}>
                                    {/* <Text style={{ color: 'white', fontSize: 18 }}>{'<'}</Text> */}
                                    <Icon name="arrow-circle-left" size={20} color="#bfbfbf" />
                              </View>
                        </View>
                        <SafeAreaView style={{ flex: 1, backgroundColor: '#e6e6e6' }}>
                              <FlatList
                                    data={this.props.navigation.state.params.activityData.taskList}
                                    renderItem={({ item }) => this.renderItem(item)}
                                    keyExtractor={item => `${item.taskName}_${item.taskId}`}
                              />
                        </SafeAreaView>
                  </View>
            )
      }
}