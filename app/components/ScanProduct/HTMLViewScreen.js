import React, {Component} from 'react';
import {
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  ToastAndroid,
  AsyncStorage,
} from 'react-native';
import WebView from 'react-native-webview';
import Icon from 'react-native-vector-icons/FontAwesome5';

const http = require('../../models/fetch');
const {width, height} = Dimensions.get('window');

export default class HTMLViewScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // taskData: this.props.navigation.state.params.taskData
    };
  }

  UNSAFE_componentWillReceiveProps = async (nextProps, nextState) => {
    this.checkForUploadedTaskContent();
    // AsyncStorage.removeItem('taskContentUploadDetails');
    // console.log(await AsyncStorage.getItem('taskContentUploadDetails'));
  };

  componentDidMount = () => {
    this.checkForUploadedTaskContent();
  };

  checkForUploadedTaskContent = async () => {
    try {
      let taskContentUploadDetails = JSON.parse(
        await AsyncStorage.getItem('taskContentUploadDetails'),
      );
      if (
        taskContentUploadDetails !== null &&
        taskContentUploadDetails.length > 0
      ) {
        let isTaskUploaded = taskContentUploadDetails.filter(
          taskContent =>
            taskContent.taskName ===
            this.props.navigation.state.params.taskData.taskName,
        );
        if (isTaskUploaded.length > 0)
          this.props.navigation.state.params.taskData.task['contentId'] =
            isTaskUploaded[0].contentId;
      }
    } catch (err) {
      ToastAndroid.show('Error in retrieving data', ToastAndroid.SHORT);
    }
  };

  uploadTaskContent = async () => {
    const taskData = this.props.navigation.state.params.taskData;
    const payload = [
      {
        taskName: taskData.task.taskName,
        accessToken: window.UserManualNirvana.getUserDetails().accessToken,
      },
    ];
    http.post(
      'http://localhost:3000/apis/html/upload',
      null,
      payload,
      async (err, res) => {
        if (err) {
          ToastAndroid.show(
            'There was error uploading the task!',
            ToastAndroid.SHORT,
          );
        }
        if (res) {
          console.log('Upload Task:', res);
          try {
            ToastAndroid.show(
              'Task has been uploaded successfully!',
              ToastAndroid.SHORT,
            );
            taskData.task['contentId'] = JSON.parse(res.result).contentId;
            // taskData.task['contentId'] = 100;
            let taskContentUploadDetails = await AsyncStorage.getItem(
              'taskContentUploadDetails',
            );
            // console.log('task content:; ', taskContentUploadDetails);
            if (taskContentUploadDetails !== null)
              taskContentUploadDetails = JSON.parse(taskContentUploadDetails);
            else taskContentUploadDetails = [];
            taskContentUploadDetails.push({
              taskName: taskData.task.taskName,
              contentId: taskData.task.contentId,
            });
            AsyncStorage.setItem(
              'taskContentUploadDetails',
              JSON.stringify(taskContentUploadDetails),
            );
            this.props.navigation.navigate('UploadTask', {
              taskData: taskData.task,
            });
          } catch (err) {
            ToastAndroid.show(
              'Error in saving task details!',
              ToastAndroid.SHORT,
            );
          }
        }
      },
    );
  };

  render() {
    const taskData = this.props.navigation.state.params.taskData;
    return (
      <View style={{flex: 1, width, height}}>
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
            <View style={{padding: 8}}>
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
              {'HTML View'}
            </Text>
          </View>
          <View style={{opacity: 0, padding: 8}}>
            {/* <Text style={{ color: 'white', fontSize: 18 }}>{'<'}</Text> */}
            <Icon name="arrow-circle-left" size={20} color="#fff" />
          </View>
        </View>
        <WebView
          source={{
            html: this.props.navigation.state.params.taskData.task.taskContent,
          }}
          style={{flex: 1, width, height: height - 100}}
        />
        {!taskData.task.addedTask && (
          <TouchableOpacity onPress={() => this.uploadTaskContent()}>
            <View
              style={{
                flexDirection: 'row',
                width,
                height: 50,
                padding: 8,
                backgroundColor: '#333333',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Icon name={'file-upload'} size={20} color={'#fff'} />
              <Text
                style={{
                  marginLeft: 10,
                  fontFamily: 'SourceSansPro-Regular',
                  color: 'white',
                  fontSize: 18,
                  textAlign: 'center',
                }}>
                {'Upload Task Content'}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}
