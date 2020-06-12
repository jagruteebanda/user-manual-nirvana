import React, { Component } from "react";
import { View, Dimensions, Text, SafeAreaView, FlatList, TouchableOpacity } from "react-native";

const { width, height } = Dimensions.get('window');

export default class TaskListView extends Component {
      constructor(props) {
            super(props);
            this.state = {
                  activityData: this.props.navigation.state.params.activityData
            }
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
                  <TouchableOpacity onPress={() => this.handleTaskPress(item)}>
                        <View style={{ flex: 1, flexDirection: 'row', width, height: 60, backgroundColor: '#ffffff', borderBottomColor: '#e6e6e6', borderBottomWidth: 1, alignItems: 'center', justifyContent: 'space-between', paddingLeft: 16, paddingRight: 16 }}>
                              <Text style={{ color: '#333333' }}>{item.taskName}</Text>
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
                                          <Text style={{ color: 'white', fontSize: 18 }}>{'<'}</Text>
                                    </View>
                              </TouchableOpacity>
                              <View style={{}}>
                                    <Text style={{ color: 'white', fontSize: 18 }}>{'Task List'}</Text>
                              </View>
                              <View style={{ opacity: 0, padding: 8 }}>
                                    <Text style={{ color: 'white', fontSize: 18 }}>{'<'}</Text>
                              </View>
                        </View>
                        <SafeAreaView style={{ flex: 1, backgroundColor: '#e6e6e6' }}>
                              <FlatList
                                    data={this.state.activityData.taskList}
                                    renderItem={({ item }) => this.renderItem(item)}
                                    keyExtractor={item => item.taskId}
                              />
                        </SafeAreaView>
                  </View>
            )
      }
}