import React, { Component } from 'react';
import {
      View,
      Text,
      Dimensions,
      TouchableOpacity,
      ActivityIndicator,
      Alert
} from 'react-native';
import PDFView from 'react-native-view-pdf';
import { pdfData } from '../../pdfFiles/pdfData';

const { width, height } = Dimensions.get('window');

export default class PDFViewScreen extends Component {

      constructor(props) {
            super(props);
            this.state = {
                  showPdf: false,
                  pdfUrl: null,
                  currentProductPart: this.props.navigation.state.params.productPartName,
                  loading: true
            }
      }

      componentDidMount = () => {
            // console.log(pdfData[this.state.currentProductPart])
            this.setState({
                  // pdfUrl: pdfData[this.state.currentProductPart]["url"]
                  pdfUrl: pdfData['ultrasound']["url"],
                  loading: false
            });
            // setTimeout(() => {
            //       this.setState({
            //             pdfUrl: 'https://github.com/jagruteebanda/user-manual-nirvana/blob/master/app/pdfFiles/Philips%20Ultrasound%20Service%20Manual.pdf?raw=true',
            //             loading: false
            //       });
            // }, 3000);
      }

      handleOk = () => {
            this.props.navigation.navigate('ActivityListView', { productParts: [{ productPartName: this.state.currentProductPart }] })
      }

      handleAddPart = () => {
            this.handleOk(); // temp
            // let selectedModality = window.UserManualNirvana.getSelectedModality();
            // console.log('yahape aaya', selectedModality);
            // const body = JSON.stringify([
            //       {
            //             "name": this.state.currentProductPart,
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
            //             Alert.alert(
            //                   'Success',
            //                   'Product has been saved successfully',
            //                   [
            //                         {
            //                               text: 'Ok',
            //                               onPress: () => this.handleOk(),
            //                         }
            //                   ],
            //                   { cancelable: false },
            //             )
            //       })
            //       .catch(error => {
            //             console.log("upload error", error);
            //       });
      }

      render() {
            return (
                  <View style={{ flex: 1, width, height }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width, height: 50, backgroundColor: '#00cc99' }}>
                              <TouchableOpacity onPress={() => this.props.navigation.navigate('ScanProduct')}>
                                    <View style={{ padding: 8 }}>
                                          <Text style={{ color: 'white', fontSize: 18 }}>{'<'}</Text>
                                    </View>
                              </TouchableOpacity>
                              <View style={{}}>
                                    <Text style={{ color: 'white', fontSize: 18 }}>{'PDF View'}</Text>
                              </View>
                              <View style={{ opacity: 0, padding: 8 }}>
                                    <Text style={{ color: 'white', fontSize: 18 }}>{'<'}</Text>
                              </View>
                        </View>
                        <View style={{ flex: 1, backgroundColor: '#e6e6e6' }}>
                              {
                                    this.state.pdfUrl === null ?
                                          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                                <ActivityIndicator animating={this.state.loading} size="large" color="#00cc99" />
                                          </View>
                                          :
                                          <PDFView
                                                fadeInDuration={250.0}
                                                style={{ flex: 1 }}
                                                resource={this.state.pdfUrl}
                                                resourceType={'url'}
                                                onLoad={() => console.log(`PDF rendered from url`)}
                                                onError={(error) => console.log('Cannot render PDF', error)}
                                          />
                              }

                        </View>
                        {
                              this.state.pdfUrl !== null &&
                              <TouchableOpacity onPress={() => this.handleAddPart()}>
                                    <View style={{ alignItems: 'center', justifyContent: 'center', width: width, height: 50, backgroundColor: '#333333' }}>
                                          <Text style={{ fontSize: 18, color: '#ffffff', textAlign: 'center' }}>{'Extract Activity and Task List'}</Text>
                                    </View>
                              </TouchableOpacity>
                        }
                  </View>
            );
      }
}