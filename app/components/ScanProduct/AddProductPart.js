import React, { Component } from 'react';
import {
      View,
      Text,
      Dimensions,
      TextInput,
      TouchableOpacity
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default class AddProductPart extends Component {

      constructor(props) {
            super(props);
            this.state = {
                  productName: this.props.navigation.state.params.productName,
                  productParts: this.props.navigation.state.params.productParts
            }
            // console.log(this.props.navigation.state.params);
      }

      UNSAFE_componentWillReceiveProps = (nextProps, nextState) => {
            // console.log(nextProps.navigation.state.params, ' ScanProductStep1 madhe aal');
            this.setState({
                  productParts: nextProps.navigation.state.params.productParts
            })
      }

      handleAddProductPart = () => {
            this.props.navigation.navigate('ScanProduct');
      }

      render() {
            return (
                  <View style={{ flex: 1, width, height }}>
                        <View style={{ flexDirection: 'row', width, height: 50, backgroundColor: '#00cc99', alignItems: 'center', justifyContent: 'center' }}>
                              <Text style={{ color: '#ffffff', fontSize: 22 }}>{'Add Product Part'}</Text>
                        </View>
                        <View style={{ width, height: height - 50 }}>
                              <View style={{ height: 50, paddingLeft: 16, justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 18 }}>{'Product Name:'}</Text>
                              </View>
                              <View style={{ height: 50, paddingLeft: 16, paddingRight: 16, justifyContent: 'center', alignItems: 'center' }}>
                                    <TextInput
                                          style={{ backgroundColor: '#e6e6e6', width: width - 32, paddingLeft: 16, paddingRight: 16 }}
                                          onChangeText={(text) => this.setState({ productName: text })}
                                          value={this.state.productName}
                                          placeholder={'Product Name'}
                                          editable={false}
                                    />
                              </View>
                              <View style={{ height: 50, paddingLeft: 16, justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 18 }}>{'Product Parts:'}</Text>
                              </View>
                              {
                                    this.state.productParts && this.state.productParts.length > 0 && this.state.productParts.map((item, i) =>
                                          <View style={{ height: 50, paddingLeft: 16, paddingRight: 16, justifyContent: 'center', alignItems: 'center' }}>
                                                <TextInput
                                                      style={{ backgroundColor: '#e6e6e6', width: width - 32 }}
                                                      value={item.productPartName}
                                                      editable={false}
                                                />
                                          </View>
                                    )
                              }
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

