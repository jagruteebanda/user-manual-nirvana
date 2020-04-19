import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';

const { width, height } = Dimensions.get('window');


export default class ActivityListView extends Component {
      constructor(props) {
            super(props);
            this.state = {
                  activityTaskData: [{
                        key: 'activity-1',
                        activityId: 1,
                        activityName: 'Repair',
                        activityDescription: 'activity',
                        tasks: [{
                              taskName: 'Task 1',
                              taskDescription: 'Task 1 description',
                              taskContent: '<html>hi Jagrutee</html>'
                        },{
                              taskName: 'Task 2',
                              taskDescription: 'Task 2 description',
                              taskContent: ''
                        }]
                  }, {
                        key: 'activity-2',
                        activityId: 2,
                        activityName: 'Installation',
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
                        activityName: 'Safety',
                        activityDescription: 'activity',
                        tasks: [{
                              taskName: 'Task 3',
                              taskDescription: 'Task 3 description',
                              taskContent: ''
                        }]
                  }]
            }
      }

      handleActivityPress = (item) => {
            this.props.navigation.navigate('TaskListView', { taskData: item.tasks });
      }

      renderItem = (item) => {
            return (
                  <TouchableOpacity onPress={() => this.handleActivityPress(item)}>
                        <View style={{ flex: 1, flexDirection: 'row', width, height: 60, backgroundColor: '#ffffff', borderBottomColor: '#e6e6e6', borderBottomWidth: 1 }}>
                              <Text style={{ color: '#333333' }}>{item.activityName}</Text>
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
                                    keyExtractor={item => item.key}
                              />
                        </SafeAreaView>
                  </View>
            );
      }
}