import React, { Component } from 'react';
import {
      View,
      Text,
      Dimensions,
      TouchableOpacity,
      Image
} from 'react-native';
import AppBar from './AppBar';

const { width, height } = Dimensions.get('window');

export default class Home extends Component {
      constructor(props) {
            super(props);
            this.state = {
                  tabs: [
                        {
                              tabName: 'Scan Product',
                              image: require('../images/scan.png')
                        },
                        {
                              tabName: 'Search Tasks',
                              image: require('../images/search.png')
                        },
                        // {
                        //       tabName: 'Scan Barcode'
                        // }, 
                        // {
                        //       tabName: 'History',
                        //       image: require('../images/')
                        // }
                  ]
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
                        this.props.navigation.navigate('SelectModality', { productParts: [] });
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
                                          <TouchableOpacity key={`homeTab_${i}`} onPress={() => this.handleTabItemPress(item)}>
                                                <View style={{ alignItems: 'center', justifyContent: 'center', width: width / 2 - 8, height: height / 4, margin: 4, backgroundColor: 'white', elevation: 5 }}>
                                                      <Image style={{ width:50, height: 50, margin: 8 }} source={item.image} />
                                                      <Text style={{ fontFamily: 'SourceSansPro-Regular', fontSize: 16 }}>{item.tabName}</Text>
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