import React, { Component } from "react";
import { View, Dimensions, Text, SafeAreaView, FlatList, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';

const { width, height } = Dimensions.get('window');

export default class TaskListView extends Component {
      constructor(props) {
            super(props);
            this.state = {
                  activityData: this.props.navigation.state.params ? this.props.navigation.state.params.activityData : {
                        key: 'activity-3',
                        activityId: 3,
                        activityName: 'Safety',
                        activityDescription: 'activity',
                        tasks: [{
                              taskName: 'Task 3',
                              taskDescription: 'Task 3 description',
                              taskContent: ''
                        }]
                  }
            }
      }

      UNSAFE_componentWillReceiveProps = (nextProps, nextState) => {
            console.log('nextProps', nextProps);
      }

      handleTaskPress = (item) => {
            // console.log(item.taskContent, '+++++++++++++++++++++++++++++');
            const { activityData } = this.state;
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
                                    <Icon name="check-circle" size={20} color="#bfbfbf" />
                                    <Text style={{ fontFamily: 'SourceSansPro-Light', fontSize: 16, marginLeft: 10, color: '#333333' }}>{item.taskName}</Text>
                              </View>
                              <Icon name="chevron-right" size={20} color="#bfbfbf" />
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