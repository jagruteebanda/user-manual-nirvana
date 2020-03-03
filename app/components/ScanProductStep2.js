import React, { Component } from 'react';
import {
      View,
      Text,
      Dimensions,
      TextInput,
      TouchableOpacity
} from 'react-native';

const { width, height } = Dimensions.get('window');

class ScanProductStep2 extends Component {

      constructor(props) {
            super(props);
            this.state = {
                  productName: ''
            }
      }

      handleAddProductPart = () => {
            this.props.navigation.navigate('ScanProduct');
      }

      render() {
            return (
                  <View style={{ flex: 1, width, height }}>
                        <View style={{ flexDirection: 'row', width, height: 50, backgroundColor: '#00cc99', alignItems: 'center', justifyContent: 'center' }}>
                              <Text style={{ color: '#ffffff', fontSize: 22 }}>{'Scan Product'}</Text>
                        </View>
                        <View style={{ width, height: height - 50 }}>
                              <View style={{ height: 50, paddingLeft: 16, justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 18 }}>{'Product Name:'}</Text>
                              </View>
                              <View style={{ height: 50, paddingLeft: 16, paddingRight: 16, justifyContent: 'center', alignItems: 'center' }}>
                                    <TextInput
                                          style={{ backgroundColor: '#e6e6e6', width: width - 32 }}
                                          onChangeText={(text) => this.setState({ productName: text })}
                                          value={this.state.productName}
                                          placeholder={'Product Name'}
                                    />
                              </View>
                              <View style={{ height: 50, paddingLeft: 16, justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 18 }}>{'Product Parts:'}</Text>
                              </View>
                              <TouchableOpacity onPress={() => this.handleAddProductPart()}>
                                    <View style={{ width: width - 32, height: 50, marginLeft: 16, marginRight: 16, marginTop: 16, backgroundColor: '#00cc99', alignItems: 'center', justifyContent: 'center' }}>
                                          <Text style={{ color: '#ffffff' }}>{'Add product part'}</Text>
                                    </View>
                              </TouchableOpacity>
                        </View>
                  </View>
            )
      }
}

export default ScanProductStep2;