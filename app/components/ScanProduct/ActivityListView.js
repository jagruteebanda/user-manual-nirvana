import React, {Component} from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  ToastAndroid,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
// import { sampleResponse } from '../../data/acitivityTaskData';

const http = require('../../models/fetch');
const {width, height} = Dimensions.get('window');

export default class ActivityListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activityTaskData: [],
      addedActivity: false,
    };
  }

  componentDidMount = () => {
    let activityTaskData = window.UserManualNirvana.getPDFDetails();
    let activityTaskArray = [];
    Object.keys(activityTaskData).map((activityName, i) => {
      let taskArray = [];
      Object.keys(activityTaskData[activityName]).map((taskName, j) => {
        if (
          activityTaskData[activityName][taskName][0].taskData &&
          activityTaskData[activityName][taskName][0].taskData.taskContent
        ) {
          taskArray.push({
            id: j,
            taskName,
            taskDescription: `${taskName} adding to the task list`,
            taskContent:
              activityTaskData[activityName][taskName][0].taskData.taskContent,
          });
        }
        return taskName;
      });
      activityTaskArray.push({
        id: i,
        activityName,
        activityDescription: `Added ${activityName} activity`,
        activityComments: '',
        taskList: taskArray,
        addedActivity: false,
      });
      return activityName;
    });

    // get list of all activities for that modality
    let selectedModality = window.UserManualNirvana.getSelectedModality();
    const url = `${window.UserManualNirvana.basePath}/Modality/${
      selectedModality.id
    }/Activity`;
    http.get(url, null, (err, res) => {
      if (err) {
        ToastAndroid.show(
          'Error getting activities by modality',
          ToastAndroid.SHORT,
        );
      }
      if (res) {
        let activitiesByModality = res.docs.filter(
          activity => !activity.isDeleted,
        );
        let activityTaskData = activityTaskArray.filter(data => {
          let doesActivityExist = false;
          activitiesByModality.forEach(activity => {
            if (
              activity.name.toLowerCase() === data.activityName.toLowerCase()
            ) {
              doesActivityExist = true;
            }
          });
          data.addedActivity = doesActivityExist;
          return data;
        });
        this.setState({activityTaskData});
      }
    });
  };

  handleActivityPress = item => {
    if (!item.addedActivity) {
      Alert.alert(
        'You need to save activity to view task list!',
        `Do you want to save ${item.activityName} activity?`,
        [
          {
            text: 'Cancel',
            onPress: () => {},
            style: 'cancel',
          },
          {text: 'Yes', onPress: () => this.handleAddActivity(item)},
        ],
        {cancelable: false},
      );
    } else {
      this.props.navigation.navigate('TaskListView', {activityData: item});
    }
  };

  handleAddActivity = item => {
    let selectedModality = window.UserManualNirvana.getSelectedModality();
    const payload = [
      {
        name: item.activityName,
        description: item.activityDescription,
        comment: 'created new activity',
        modalityId: selectedModality.id,
      },
    ];
    http.post(
      `${window.UserManualNirvana.basePath}/Modality/${
        selectedModality.id
      }/Activity`,
      null,
      payload,
      (err, res) => {
        if (err) {
          ToastAndroid.show('Error saving activity', ToastAndroid.SHORT);
        }
        if (res) {
          item.addedActivity = true;
          item.activityId = res[0].id;
          window.UserManualNirvana.setActivityDetails(item);
          ToastAndroid.show(
            'Activity has been saved successfully!',
            ToastAndroid.SHORT,
          );
          this.props.navigation.navigate('TaskListView', {activityData: item});
        }
      },
    );
  };

  renderItem = item => {
    return (
      <TouchableOpacity onPress={() => this.handleActivityPress(item)}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            width: width - 8,
            height: 60,
            backgroundColor: '#ffffff',
            alignItems: 'center',
            paddingLeft: 16,
            paddingRight: 16,
            justifyContent: 'space-between',
            margin: 4,
            marginBottom: 1,
            elevation: 1,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon
              name="check-circle"
              size={20}
              color={item.addedActivity ? '#00cc99' : '#bfbfbf'}
            />
            <Text
              style={{
                fontFamily: 'SourceSansPro-Regular',
                fontSize: 16,
                marginLeft: 10,
                color: item.addedActivity ? '#00cc99' : '#333333',
              }}>
              {item.activityName}
            </Text>
          </View>
          <Icon
            name={
              item.addedActivity ? 'chevron-right' : 'arrow-alt-circle-down'
            }
            size={20}
            color="#bfbfbf"
          />
        </View>
      </TouchableOpacity>
    );
  };

  render() {
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
            onPress={() => this.props.navigation.navigate('PDFViewScreen')}>
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
              {'Activity List'}
            </Text>
          </View>
          <View style={{opacity: 0, padding: 8}}>
            <Icon name="arrow-circle-left" size={20} color="#fff" />
          </View>
        </View>
        <SafeAreaView style={{flex: 1, backgroundColor: '#e6e6e6'}}>
          <FlatList
            data={this.state.activityTaskData}
            renderItem={({item}) => this.renderItem(item)}
            keyExtractor={item => `${item.id}`}
          />
        </SafeAreaView>
      </View>
    );
  }
}
