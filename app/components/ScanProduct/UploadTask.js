import React, { Component } from 'react';
import {
  View,
  Dimensions,
  TouchableOpacity,
  Text,
  TextInput,
  Picker,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const http = require('../../models/fetch');
const { width, height } = Dimensions.get('window');

export default class UploadTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskName: '',
      accessLevelId: 1,
      revesionNumber: '123456',
      taskDescription: '',
    };
  }

  saveTaskContent = () => {
    let taskData = this.props.navigation.state.params.taskData;
    let selectedModality = window.UserManualNirvana.getSelectedModality();
    const payload = [
      {
        name: taskData.taskName,
        taskNumber: `${selectedModality.abbr}_*`,
        accessLevelId: 1,
        contentId: taskData.contentId,
        description: taskData.taskDescription,
        revesion: this.state.revesionNumber,
        isDraft: true,
        isActive: true,
        _revesion: 0,
        modalityId: selectedModality.id,
      },
    ];
    console.log(payload, '====================');
    http.post('https://az19fgwa01t.azurewebsites.net/Task', null, payload, (err, res) => {
      console.log(err, res);
      if (err) {
        ToastAndroid.show("There was error saving the task!", ToastAndroid.SHORT);
      }
      if (res) {
        ToastAndroid.show('Task has been saved successfully!', ToastAndroid.SHORT);
        this.props.navigation.navigate('TaskListView', { taskAdded: taskData });
      }
    });
  };

  cancelUploadTask = () => {
    this.props.navigation.navigate('TaskListView');
  };

  render() {
    const taskData = this.props.navigation.state.params.taskData;
    return (
      <View style={{ flex: 1, width, height }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width,
            height: 50,
            backgroundColor: '#00cc99',
          }}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('TaskListView')}>
            <View style={{ padding: 8 }}>
              {/* <Text style={{ color: 'white', fontSize: 18 }}>{'<'}</Text> */}
              <Icon name="arrow-circle-left" size={20} color="#fff" />
            </View>
          </TouchableOpacity>
          <View style={{}}>
            <Text
              style={{
                fontFamily: 'SourceSansPro-SemiBold',
                color: 'white',
                fontSize: 20,
              }}>
              {'Upload Task'}
            </Text>
          </View>
          <View style={{ opacity: 0, padding: 8 }}>
            {/* <Text style={{ color: 'white', fontSize: 18 }}>{'<'}</Text> */}
            <Icon name="arrow-circle-left" size={20} color="#fff" />
          </View>
        </View>
        <View style={{ flex: 1, width, height: height - 84 }}>
          <View style={{ height: 50, paddingLeft: 16, justifyContent: 'center' }}>
            <Text style={{ fontFamily: 'SourceSansPro-Regular', fontSize: 18 }}>
              {'Task Name:'}
            </Text>
          </View>
          <View
            style={{
              height: 50,
              paddingLeft: 16,
              paddingRight: 16,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TextInput
              style={{
                fontFamily: 'SourceSansPro-Light',
                borderColor: '#e6e6e6',
                borderWidth: 1,
                width: width - 32,
                paddingLeft: 16,
                paddingRight: 16,
              }}
              onChangeText={text => this.setState({ taskName: text })}
              value={taskData.taskName}
              placeholder={'Enter task name here'}
            />
          </View>
          <View style={{ height: 50, paddingLeft: 16, justifyContent: 'center' }}>
            <Text style={{ fontFamily: 'SourceSansPro-Regular', fontSize: 18 }}>
              {'Access Level:'}
            </Text>
          </View>
          <View
            style={{
              height: 50,
              marginLeft: 16,
              marginRight: 16,
              justifyContent: 'center',
              alignItems: 'center',
              borderColor: '#e6e6e6',
              borderWidth: 1,
            }}>
            <Picker
              selectedValue={this.state.accessLevelId}
              style={{
                fontFamily: 'SourceSansPro-Light',
                height: 50,
                width: width - 32,
                paddingLeft: 16,
                paddingRight: 16,
                fontSize: 16,
              }}
              onValueChange={(itemValue, itemIndex) =>
                this.handleAccessLevelChange(itemValue)
              }>
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
            <Text style={{ fontFamily: 'SourceSansPro-Regular', fontSize: 18 }}>
              {'Revision number:'}
            </Text>
          </View>
          <View
            style={{
              height: 50,
              paddingLeft: 16,
              paddingRight: 16,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TextInput
              style={{
                fontFamily: 'SourceSansPro-Light',
                borderColor: '#e6e6e6',
                borderWidth: 1,
                width: width - 32,
                paddingLeft: 16,
                paddingRight: 16,
              }}
              onChangeText={text => this.setState({ revesionNumber: text })}
              value={this.state.revesionNumber}
              placeholder={'Enter revesion number here'}
            />
          </View>
          <View style={{ height: 50, paddingLeft: 16, justifyContent: 'center' }}>
            <Text style={{ fontFamily: 'SourceSansPro-Regular', fontSize: 18 }}>
              {'Task Description:'}
            </Text>
          </View>
          <View
            style={{
              height: 50,
              paddingLeft: 16,
              paddingRight: 16,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TextInput
              style={{
                fontFamily: 'SourceSansPro-Light',
                borderColor: '#e6e6e6',
                borderWidth: 1,
                width: width - 32,
                paddingLeft: 16,
                paddingRight: 16,
              }}
              onChangeText={text => this.setState({ taskDescription: text })}
              value={taskData.taskDescription}
              placeholder={'Enter task description here'}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            width,
            height: 66,
            padding: 8,
            backgroundColor: '#ffffff',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity onPress={() => this.saveTaskContent()}>
            <View
              style={{
                flexDirection: 'row',
                width: width / 2 - 24,
                height: 50,
                padding: 8,
                backgroundColor: '#00cc99',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: 16,
                marginRight: 8,
              }}>
              <Icon name="file-download" size={20} color="#fff" />
              <Text
                style={{
                  marginLeft: 8,
                  fontFamily: 'SourceSansPro-Regular',
                  color: 'white',
                  fontSize: 18,
                  textAlign: 'center',
                }}>
                {'Save'}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.cancelUploadTask()}>
            <View
              style={{
                flexDirection: 'row',
                width: width / 2 - 24,
                height: 50,
                padding: 8,
                backgroundColor: '#333333',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: 8,
                marginRight: 16,
              }}>
              <Icon name="times-circle" size={20} color="#fff" />
              <Text
                style={{
                  marginLeft: 8,
                  fontFamily: 'SourceSansPro-Regular',
                  color: 'white',
                  fontSize: 18,
                  textAlign: 'center',
                }}>
                {'Cancel'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
