import React, { Component } from 'react';
import {
      View,
      Text,
      Dimensions,
      TouchableOpacity,
      ActivityIndicator,
      ToastAndroid
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
                  pdfUrl: pdfData['Monitor Viewing Screen']["url"],
                  loading: false
            });
            // setTimeout(() => {
            //       this.setState({
            //             pdfUrl: 'https://github.com/jagruteebanda/user-manual-nirvana/blob/master/app/pdfFiles/Philips%20Ultrasound%20Service%20Manual.pdf?raw=true',
            //             loading: false
            //       });
            // }, 3000);
      }

      // handleOk = () => {
      //       this.props.navigation.navigate('ActivityListView', { productParts: [{ productPartName: this.state.currentProductPart }] })
      // }

      handleExtractActivityTaskList = () => {
            const body = JSON.stringify([
                  {
                        "pdfFileName": "Philips Monitor Viewing Screen Manual Extra.pdf"
                  }
            ]);
            fetch("http://localhost:3000/apis//pdftohtml/convert", {
                  method: "POST",
                  headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                  },
                  body
            })
                  .then(response => response.json())
                  .then(response => {
                        if (response.code === 200) {
                              // console.log('ithe aala:: ', response.results);
                              window.UserManualNirvana.setPDFDetails(response.results);
                              this.props.navigation.navigate('ActivityListView', { productParts: [{ productPartName: this.state.currentProductPart }] })
                        } else if (response.code === 403) {
                              ToastAndroid.show('Error while extracting activity and task list from PDF', ToastAndroid.SHORT);
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
                              <TouchableOpacity onPress={() => this.handleExtractActivityTaskList()}>
                                    <View style={{ alignItems: 'center', justifyContent: 'center', width: width, height: 50, backgroundColor: '#333333' }}>
                                          <Text style={{ fontSize: 18, color: '#ffffff', textAlign: 'center' }}>{'Extract Activity and Task List'}</Text>
                                    </View>
                              </TouchableOpacity>
                        }
                  </View>
            );
      }
}