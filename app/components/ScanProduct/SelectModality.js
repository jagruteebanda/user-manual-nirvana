import React, { Component } from 'react';
import {
      View,
      Text,
      Dimensions,
      Picker,
      TextInput,
      TouchableOpacity,
      ToastAndroid,
      ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const { width, height } = Dimensions.get('window');

class SelectModality extends Component {

      constructor(props) {
            super(props);
            this.state = {
                  selectedModality: 'Select modality',
                  noModalitySelectedError: null,
                  modalities: [],
                  productName: 'CX50 Ultrasound',
                  productError: null,
                  loading: false
            }
      }

      componentDidMount = () => {
            this.getModalities();
      }

      getModalities = () => {
            const userDetails = window.UserManualNirvana.getUserDetails();
            // console.log(userDetails['accessToken'], userDetails['user']['id']);
            fetch(`https://az19fgwa01t.azurewebsites.net/User/${userDetails['user']['id']}/Modality`, {
                  method: "GET",
                  headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'authorization': userDetails.accessToken
                  }
            })
                  .then(response => response.json())
                  .then(response => {
                        // console.log('ithe aala:: ', response);
                        this.setState({
                              modalities: response.docs
                        })
                  })
                  .catch(error => {
                        console.log("upload error", error);
                  });
      }

      handleModalityChange = (modalityName) => {
            let selectedModality = this.state.modalities.filter((modality) => modality.name === modalityName);
            this.setState({ selectedModality: modalityName, noModalitySelectedError: null });
            window.UserManualNirvana.setSelectedModality(selectedModality[0]);
      }

      handleStartGeneratingManual = () => {
            if (this.state.selectedModality === 'Select modality') {
                  this.setState({ noModalitySelectedError: 'Please select a modality from the list.' });
                  return;
            }
            if (this.state.productName.length === 0) {
                  this.setState({ productError: 'Enter valid product name.' });
                  return;
            }
            window.UserManualNirvana.setProductDetails({
                  productName: this.state.productName
            });
            this.setState({
                  loading: true
            });
            let selectedModality = window.UserManualNirvana.getSelectedModality();
            const body = JSON.stringify([
                  {
                        "name": this.state.productName,
                        "description": "Added new product",
                        "comment": "created new",
                        "modalityId": selectedModality.id,
                  }
            ]);
            fetch("https://az19fgwa01t.azurewebsites.net/Product", {
                  method: "POST",
                  headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'authorization': window.UserManualNirvana.getUserDetails().accessToken
                  },
                  body
            })
                  .then(response => response.json())
                  .then(response => {
                        console.log('ithe aala:: ', response);
                        this.setState({
                              loading: false
                        });
                        if (response.statusCode === 500) {
                              ToastAndroid.show("There was error saving thr product!", ToastAndroid.SHORT);
                        } else {
                              window.UserManualNirvana.setProductDetails(response[0]);
                              ToastAndroid.show("Product has been saved successfully!", ToastAndroid.SHORT);
                              this.props.navigation.navigate('AddProductPart', { productName: this.state.productName });
                        }
                  })
                  .catch(error => {
                        console.log("upload error", error);
                  });
      }

      render() {
            return (
                  <View style={{ flex: 1, width, height }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width, height: 50, backgroundColor: '#00cc99' }}>
                              <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
                                    <View style={{ padding: 8 }}>
                                          {/* <Text style={{ color: 'white', fontSize: 18 }}>{'<'}</Text> */}
                                          <Icon name="arrow-circle-left" size={20} color="#fff" />
                                    </View>
                              </TouchableOpacity>
                              <View style={{}}>
                                    <Text style={{ color: 'white', fontSize: 18 }}>{'Select Modality'}</Text>
                              </View>
                              <View style={{ opacity: 0, padding: 8 }}>
                                    <Icon name="arrow-circle-left" size={20} color="#fff" />
                              </View>
                        </View>
                        {
                              this.state.loading ?
                                    <ActivityIndicator
                                          style={{ flex: 1, width, height: height - 50 }}
                                          size={'large'}
                                          color={'#00cc99'}
                                    />
                                    :
                                    <View style={{ flexDirection: 'column', width, height: height - 50 }}>
                                          <View style={{ height: 50, paddingLeft: 16, justifyContent: 'center' }}>
                                                <Text style={{ fontSize: 18 }}>{'Select Modality:'}</Text>
                                          </View>
                                          <View style={{ height: 50, marginLeft: 16, marginRight: 16, justifyContent: 'center', alignItems: 'center', borderColor: '#e6e6e6', borderWidth: 1 }}>
                                                <Picker
                                                      selectedValue={this.state.language}
                                                      style={{ height: 50, width: width - 32, marginLeft: 16, paddingRight: 16 }}
                                                      onValueChange={(itemValue, itemIndex) => this.handleModalityChange(itemValue)}>
                                                      <Picker.Item label={this.state.selectedModality} value={this.state.selectedModality} />
                                                      {
                                                            this.state.modalities && this.state.modalities.map((item, i) =>
                                                                  <Picker.Item key={`modalityItem_${i}`} label={item.name} value={item.name} />

                                                            )
                                                      }
                                                </Picker>
                                          </View>
                                          {
                                                this.state.noModalitySelectedError &&
                                                <Text style={{ fontSize: 16, color: 'red', textAlign: 'left', marginLeft: 16 }}>{this.state.noModalitySelectedError}</Text>
                                          }
                                          <View style={{ height: 50, paddingLeft: 16, justifyContent: 'center' }}>
                                                <Text style={{ fontSize: 18 }}>{'Product Name:'}</Text>
                                          </View>
                                          <View style={{ height: 50, paddingLeft: 16, paddingRight: 16, justifyContent: 'center', alignItems: 'center' }}>
                                                <TextInput
                                                      style={{ borderColor: '#e6e6e6', borderWidth: 1, width: width - 32, paddingLeft: 16, paddingRight: 16 }}
                                                      onChangeText={(text) => this.setState({ productName: text })}
                                                      value={this.state.productName}
                                                      placeholder={'Enter product name here'}
                                                />
                                          </View>
                                          {
                                                this.state.productError &&
                                                <Text style={{ fontSize: 16, color: 'red', textAlign: 'left', marginLeft: 16 }}>{this.state.productError}</Text>
                                          }
                                          <TouchableOpacity onPress={() => this.handleStartGeneratingManual()}>
                                                <View style={{ flexDirection: 'row', width: width - 32, height: 50, marginLeft: 16, marginRight: 16, marginTop: 16, backgroundColor: '#00cc99', alignItems: 'center', justifyContent: 'center' }}>
                                                      <Icon name={'file-pdf'} size={16} color={'#ff0000'} />
                                                      <Text style={{ marginLeft: 10, color: '#ffffff' }}>{'Start Generating Manual'}</Text>
                                                </View>
                                          </TouchableOpacity>
                                    </View>
                        }
                  </View>
            );
      }
}

export default SelectModality;