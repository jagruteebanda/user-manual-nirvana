import React, { Component } from 'react';
import {
      View,
      Text,
      Dimensions,
      TouchableOpacity
} from 'react-native';
import AppBar from './AppBar';

const { width, height } = Dimensions.get('window');

export default class Home extends Component {
      constructor(props) {
            super(props);
            this.state = {
                  tabs: [{
                        tabName: 'Search Tasks'
                  }, 
                  {
                        tabName: 'Scan Product'
                  },
                  // {
                  //       tabName: 'Scan Barcode'
                  // }, 
                  {
                        tabName: 'History'
                  }]
            }
      }

      handleTabItemPress = (tabItem) => {
            // console.log(tabItem);
            switch (tabItem.tabName) {
                  case 'Search Tasks': {
                        this.props.navigation.navigate('SearchTasks');
                        break;
                  }
                  case 'Scan Product': {
                        this.props.navigation.navigate('ScanProductStep1');
                        break;
                  }
                  case 'Scan Barcode': {
                        break;
                  }
                  case 'History': {
                        break;
                  }
                  default: {
                        break;
                  }
            }
      }

      render() {
            return (
                  <View style={{ flex: 1, width, height }}>
                        <AppBar />
                        <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', width, height, backgroundColor: '#e6e6e6' }}>
                              {
                                    this.state.tabs.map((item, i) =>
                                          <TouchableOpacity onPress={() => this.handleTabItemPress(item)}>
                                                <View style={{ alignItems: 'center', justifyContent: 'center', width: width / 2 - 8, height: height / 4, margin: 4, backgroundColor: 'white', elevation: 5 }}>
                                                      <Text>{item.tabName}</Text>
                                                </View>
                                          </TouchableOpacity>
                                    )
                              }
                        </View>
                  </View>
            )
      }
}

// export default Home;