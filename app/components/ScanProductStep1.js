import React, { Component } from 'react';
import {
      View,
      Text,
      Dimensions,
      Picker,
      TextInput,
      TouchableOpacity
} from 'react-native';

const { width, height } = Dimensions.get('window');

class ScanProductStep1 extends Component {

      constructor(props) {
            super(props);
            this.state = {
                  selectedModality: '',
                  modalities: [],
                  productName: ''
            }
      }

      componentDidMount = () => {
            this.setState({
                  modalities: [
                        {
                              name: 'Mobile Surgery',
                              abbr: 'MOS',
                              description: '',
                              comment: ''
                        },
                        {
                              name: 'Computed Tomogaphy',
                              abbr: 'CT',
                              description: '',
                              comment: ''
                        }
                  ]
            })
      }

      handleStartGeneratingManual = () => {
            this.props.navigation.navigate('ScanProductStep2')
      }

      render() {
            return (
                  <View style={{ flex: 1, width, height }}>
                        <View style={{ flexDirection: 'row', width, height: 50, backgroundColor: '#00cc99', alignItems: 'center', justifyContent: 'center' }}>
                              <Text style={{ color: '#ffffff', fontSize: 22 }}>{'Scan Product'}</Text>
                        </View>
                        <View style={{ flexDirection: 'column', width, height: height - 50 }}>
                              <View style={{ height: 50, paddingLeft: 16, justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 18 }}>{'Select Modality:'}</Text>
                              </View>
                              <View style={{ height: 50, paddingLeft: 16, paddingRight: 16, justifyContent: 'center', alignItems: 'center' }}>
                                    <Picker
                                          selectedValue={this.state.language}
                                          style={{ height: 50, width: width - 32 }}
                                          onValueChange={(itemValue, itemIndex) =>
                                                this.setState({ modality: itemValue })
                                          }>
                                          {
                                                this.state.modalities.map((item, i) =>
                                                      <Picker.Item label={item.name} value={item.abbr} />

                                                )
                                          }
                                          {/* <Picker.Item label="JavaScript" value="js" /> */}
                                    </Picker>
                              </View>
                              <View style={{ height: 50, paddingLeft: 16, justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 18 }}>{'Product Name:'}</Text>
                              </View>
                              <View style={{ height: 50, paddingLeft: 16, paddingRight: 16, justifyContent: 'center', alignItems: 'center' }}>
                                    <TextInput
                                          style={{ backgroundColor: '#e6e6e6', width: width - 32 }}
                                          onChangeText={(text) => this.setState({ productName: text })}
                                          value={this.state.productName}
                                    />
                              </View>
                              <TouchableOpacity onPress={() => this.handleStartGeneratingManual()}>
                                    <View style={{ width: width - 32, height: 50, marginLeft: 16, marginRight: 16, marginTop: 16, backgroundColor: '#00cc99', alignItems: 'center', justifyContent: 'center' }}>
                                          <Text style={{ color: '#ffffff' }}>{'Start Generating Manual'}</Text>
                                    </View>
                              </TouchableOpacity>
                        </View>
                  </View>
            );
      }
}

export default ScanProductStep1;