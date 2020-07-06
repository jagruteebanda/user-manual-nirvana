import React, { Component } from 'react';
import {
      View,
      Text,
      Dimensions,
      Picker,
      TextInput,
      TouchableOpacity,
      ToastAndroid,
      ActivityIndicator,
      BackHandler
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const http = require('../../models/fetch');

const { width, height } = Dimensions.get('window');

class SelectModality extends Component {

      constructor(props) {
            super(props);
            this.state = {
                  selectedModality: 'Select modality',
                  noModalitySelectedError: null,
                  modalities: [],
                  selectedProduct: 'Select product',
                  productsByModality: [],
                  productName: 'CX50 Ultrasound',
                  productError: null,
                  loading: false
            }
            this.handleBackPress = this.handleBackPress.bind(this);
      }

      componentDidMount = () => {
            this.getModalities();
            BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
      }

      componentWillUnmount = () => {
            BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
      }

      handleBackPress() {
            // this.props.navigation.goBack(null);
            this.props.navigation.navigate('Home');  
            return true;  
      }

      getModalities = () => {
            const userDetails = window.UserManualNirvana.getUserDetails();
            const url = `${window.UserManualNirvana.basePath}/User/${userDetails['user']['id']}/Modality`;
            http.get(url, null, (err, res) => {
                  if (err) {
                        ToastAndroid.show('Error getting modalities', ToastAndroid.SHORT);
                  }
                  if (res) {
                        this.setState({ modalities: res.docs });
                  }
            });
      }

      handleModalityChange = (modalityName) => {
            let selectedModality = this.state.modalities.filter((modality) => modality.name === modalityName);
            this.setState({ selectedModality: modalityName, noModalitySelectedError: null });
            window.UserManualNirvana.setSelectedModality(selectedModality[0]);

            // fetch list of products for that modality
            const url = `${window.UserManualNirvana.basePath}/Modality/${selectedModality[0].id}/Product`;
            http.get(url, null, (err, res) => {
                  if (err) {
                        ToastAndroid.show('Error getting products by modality', ToastAndroid.SHORT);
                  }
                  if (res) {
                        this.setState({ productsByModality: res.docs.filter((product) => !product['isDeleted']) });
                  }
            });
      }

      handleProductChange = (productName) => {
            let selectedProduct = this.state.productsByModality.filter((product) => product.name === productName);
            this.setState({ productName, selectedProduct: productName, noProductSelectedError: null });
            window.UserManualNirvana.setProductDetails(selectedProduct[0].name);
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

            this.props.navigation.navigate('AddProductPart', { productName: this.state.productName });
            // window.UserManualNirvana.setProductDetails(this.state.selectedProduct);
            // this.setState({
            //       loading: true
            // });
            // let selectedModality = window.UserManualNirvana.getSelectedModality();
            // const body = JSON.stringify([
            //       {
            //             "name": this.state.productName,
            //             "description": "Added new product",
            //             "comment": "created new",
            //             "modalityId": selectedModality.id,
            //       }
            // ]);
            // fetch("https://az19fgwa01t.azurewebsites.net/Product", {
            //       method: "POST",
            //       headers: {
            //             'Accept': 'application/json',
            //             'Content-Type': 'application/json',
            //             'authorization': window.UserManualNirvana.getUserDetails().accessToken
            //       },
            //       body
            // })
            //       .then(response => response.json())
            //       .then(response => {
            //             console.log('ithe aala:: ', response);
            //             this.setState({
            //                   loading: false
            //             });
            //             if (response.statusCode === 500) {
            //                   ToastAndroid.show("There was error saving thr product!", ToastAndroid.SHORT);
            //             } else {
            //                   window.UserManualNirvana.setProductDetails(response[0]);
            //                   ToastAndroid.show("Product has been saved successfully!", ToastAndroid.SHORT);
            //                   this.props.navigation.navigate('AddProductPart', { productName: this.state.productName });
            //             }
            //       })
            //       .catch(error => {
            //             console.log("upload error", error);
            //       });
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
                                    <Text style={{ fontFamily: 'SourceSansPro-SemiBold', color: 'white', fontSize: 20 }}>{'Select Modality'}</Text>
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
                                                <Text style={{ fontFamily: 'SourceSansPro-Regular', fontSize: 16 }}>{'Select Modality:'}</Text>
                                          </View>
                                          <View style={{ height: 50, marginLeft: 16, marginRight: 16, justifyContent: 'center', alignItems: 'center', borderColor: '#e6e6e6', borderWidth: 1 }}>
                                                <Picker
                                                      textStyle={{
                                                            fontFamily: 'SourceSansPro-Light'
                                                      }}
                                                      itemTextStyle={{
                                                            fontFamily: 'SourceSansPro-Light'
                                                      }}
                                                      style={{ fontFamily: 'SourceSansPro-Light', height: 50, width: width - 32, marginLeft: 16, paddingRight: 16 }}
                                                      onValueChange={(itemValue, itemIndex) => this.handleModalityChange(itemValue)}>
                                                      <Picker.Item style={{ fontFamily: 'SourceSansPro-Light', fontSize: 16 }} label={this.state.selectedModality} value={this.state.selectedModality} />
                                                      {
                                                            this.state.modalities && this.state.modalities.map((item, i) =>
                                                                  <Picker.Item style={{ fontFamily: 'SourceSansPro-Light', fontSize: 16 }} key={`modalityItem_${i}`} label={item.name} value={item.name} />

                                                            )
                                                      }
                                                </Picker>
                                          </View>
                                          {
                                                this.state.noModalitySelectedError &&
                                                <Text style={{ fontSize: 16, color: 'red', textAlign: 'left', marginLeft: 16 }}>{this.state.noModalitySelectedError}</Text>
                                          }
                                          <View style={{ height: 50, paddingLeft: 16, justifyContent: 'center' }}>
                                                <Text style={{ fontFamily: 'SourceSansPro-Regular', fontSize: 16 }}>{'Select Product:'}</Text>
                                          </View>
                                          <View style={{ height: 50, marginLeft: 16, marginRight: 16, justifyContent: 'center', alignItems: 'center', borderColor: '#e6e6e6', borderWidth: 1 }}>
                                                <Picker
                                                      textStyle={{
                                                            fontFamily: 'SourceSansPro-Light'
                                                      }}
                                                      itemTextStyle={{
                                                            fontFamily: 'SourceSansPro-Light'
                                                      }}
                                                      style={{ fontFamily: 'SourceSansPro-Light', height: 50, width: width - 32, marginLeft: 16, paddingRight: 16 }}
                                                      onValueChange={(itemValue, itemIndex) => this.handleProductChange(itemValue)}>
                                                      <Picker.Item style={{ fontFamily: 'SourceSansPro-Light', fontSize: 16 }} label={this.state.selectedProduct} value={this.state.selectedProduct} />
                                                      {
                                                            this.state.productsByModality && this.state.productsByModality.map((item, i) =>
                                                                  <Picker.Item style={{ fontFamily: 'SourceSansPro-Light', fontSize: 16 }} key={`productItem_${i}`} label={item.name} value={item.name} />

                                                            )
                                                      }
                                                </Picker>
                                          </View>
                                          {/* <View style={{ alignItems: 'center', marginTop: 4, marginBottom: 4 }}>
                                                <Text style={{ fontFamily: 'SourceSansPro-Light', fontSize: 16, marginTop: 4, marginBottom: 4 }}>or</Text>
                                          </View>
                                          <View style={{ height: 50, paddingLeft: 16, paddingRight: 16, justifyContent: 'center', alignItems: 'center' }}>
                                                <TextInput
                                                      style={{ fontFamily: 'SourceSansPro-Light', fontSize: 16, borderColor: '#e6e6e6', borderWidth: 1, width: width - 32, paddingLeft: 16, paddingRight: 16 }}
                                                      onChangeText={(text) => this.setState({ productName: text })}
                                                      value={this.state.productName}
                                                      placeholder={'Enter product name here'}
                                                />
                                          </View> */}
                                          {
                                                this.state.productError &&
                                                <Text style={{ fontSize: 16, color: 'red', textAlign: 'left', marginLeft: 16 }}>{this.state.productError}</Text>
                                          }
                                          <TouchableOpacity onPress={() => this.handleStartGeneratingManual()}>
                                                <View style={{ flexDirection: 'row', width: width - 32, height: 50, marginLeft: 16, marginRight: 16, marginTop: 16, backgroundColor: '#00cc99', alignItems: 'center', justifyContent: 'center' }}>
                                                      <Icon name={'file-pdf'} size={16} color={'#fff'} />
                                                      <Text style={{ fontFamily: 'SourceSansPro-Regular', fontSize: 16, marginLeft: 10, color: '#ffffff' }}>{'Start Generating Manual'}</Text>
                                                </View>
                                          </TouchableOpacity>
                                    </View>
                        }
                  </View>
            );
      }
}

export default SelectModality;