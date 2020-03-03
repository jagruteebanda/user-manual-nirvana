import React, { Component } from 'react';
import {
      View,
      Text,
      Dimensions,
      StyleSheet,
      TouchableOpacity,
      TouchableWithoutFeedback,
      Image,
      Platform
} from 'react-native';
import { RNCamera } from 'react-native-camera-tflite';

import outputs from '../../Output.json';
import _ from 'lodash';
let _currentInstant = 0;

const { width, height } = Dimensions.get('window');

export default class ScanProduct extends Component {

      constructor(props) {
            super(props);
            this.state = {
                  time: 0,
                  output: "",
                  outputData: []
            };
      }

      componentDidMount() {

      }

      processOutput({ data }) {
            console.log('data:: ', data);
            const probs = _.map(data, item => _.round(item / 255.0, 0.02));
            console.log('Probs: ', probs);
            const orderedData = _.chain(data).zip(outputs).orderBy(0, 'desc').map(item => [_.round(item[0] / 255.0, 2), item[1]]).value();
            console.log('orderedData: ', orderedData);
            const outputData = _.chain(orderedData).take(3).map(item => `${item[1]}: ${item[0]}`).join('\n').value();
            console.log('outputData', outputData);

            const time = Date.now() - (_currentInstant || Date.now());
            const output = `Guesses:\n${outputData}\nTime:${time} ms`;
            this.setState(state => ({
                  output,
                  outputData
            }));
            _currentInstant = Date.now();
      }

      createFormData = (photo, body) => {
            const data = new FormData();
            
            data.append("photo", {
                  name: 'photo.jpg',
                  type: 'image/jpg',
                  uri:
                  Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
            });
            
            Object.keys(body).forEach(key => {
                  data.append(key, body[key]);
            });
            
            console.log('Data:: ', data);

            return data;
      };

      handleCameraClick = async () => {
            if (this.camera) {
                  const options = { quality: 0.5, base64: true };
                  const data = await this.camera.takePictureAsync(options);
                  console.log('Image captured:: ', data.uri);


                  fetch("http://localhost:3000/apis/upload", {
                        method: "POST",
                        body: this.createFormData(data, { userId: "123" })
                  })
                        .then(response => response.json())
                        .then(response => {
                              console.log("upload succes", response);
                              alert(JSON.stringify(response.result));
                        })
                        .catch(error => {
                              console.log("upload error", error);
                              alert("Upload failed!");
                        });

                  // let formData = new FormData();
                  // // formData.append('my_photo', {
                  // //       uri: data.uri, // your file path string
                  // //       name: 'identify.jpg',
                  // //       type: 'image/jpg'
                  // // });

                  // formData.append('photo', { uri: data.uri, name: 'photo.jpg', filename: 'photo.jpg', type: 'image/png' });
                  // formData.append('Content-Type', 'image/jpg');
                  // formData.append('hello', 'hi');


                  // fetch('http://localhost:3000/apis/upload', {
                  //       headers: {
                  //             'Accept': 'application/json',
                  //             'Content-Type': 'multipart/form-data'
                  //       },
                  //       method: 'POST',
                  //       body: formData,
                  //       files: [{
                  //             filename: 'file', // this is what your server is looking for
                  //             filepath: data.uri, // uri from response (local path of image on device)
                  //             filetype: 'image/jpg'
                  //       }]
                  // })
                  //       .then((res1) => res1.json())
                  //       .then((res) => {
                  //             console.log('Response: ', res);
                  //       }).catch((err) => {
                  //             console.log('Error: ', err);
                  //       });
                  // RNFetchBlob.fetch('POST', 'http://localhost:3000/apis/upload', {
                  //       'Dropbox-API-Arg': JSON.stringify({
                  //             path: '/img-from-react-native.png',
                  //             mode: 'add',
                  //             autorename: true,
                  //             mute: false
                  //       }),
                  //       'Content-Type': 'application/octet-stream',
                  // }, base64ImageString)
                  //       .then((res) => {
                  //             console.log(res.text())
                  //       })
                  //       .catch((err) => {
                  //             // error handling ..
                  //       })
            }
      }

      render() {
            const modelParams = {
                  file: "optimized_graph.tflite",
                  // file: "mobilenet_v1_1.0_224_quant.tflite",
                  // file: "mobilenet_v2_1.0_224_quant.tflite",
                  // file: "converted_model.tflite",
                  // file: "recent.tflite",
                  inputDimX: 224,
                  inputDimY: 224,
                  outputDim: 1001,
                  freqms: 0
            };
            return (
                  <View style={{ flex: 1, width, height }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width, height: 50, backgroundColor: '#00cc99' }}>
                              <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
                                    <View style={{ padding: 8 }}>
                                          <Text style={{ color: 'white', fontSize: 18 }}>{'<'}</Text>
                                    </View>
                              </TouchableOpacity>
                              <View style={{}}>
                                    <Text style={{ color: 'white', fontSize: 18 }}>{'Scan Product'}</Text>
                              </View>
                              <View style={{ opacity: 0, padding: 8 }}>
                                    <Text style={{ color: 'white', fontSize: 18 }}>{'<'}</Text>
                              </View>
                        </View>
                        <View style={styles.container}>
                              <RNCamera
                                    ref={ref => {
                                          this.camera = ref;
                                    }}
                                    style={styles.preview}
                                    type={RNCamera.Constants.Type.back}
                                    flashMode={RNCamera.Constants.FlashMode.off}
                                    androidCameraPermissionOptions={{
                                          title: 'Permission to use camera',
                                          message: 'We need your permission to use your camera',
                                          buttonPositive: 'Ok',
                                          buttonNegative: 'Cancel',
                                    }}
                                    androidRecordAudioPermissionOptions={{
                                          title: 'Permission to use audio recording',
                                          message: 'We need your permission to use your audio',
                                          buttonPositive: 'Ok',
                                          buttonNegative: 'Cancel',
                                    }}
                                    onGoogleVisionBarcodesDetected={({ barcodes }) => {
                                          console.log(barcodes);
                                    }}
                              />
                        </View>
                        <TouchableWithoutFeedback onPress={() => this.handleCameraClick()}>
                              <View style={{ position: 'absolute', left: width / 2 - 35, bottom: 25, elevation: 100 }}>
                                    <Image
                                          style={{ width: 70, height: 70 }}
                                          source={require('../images/camera.png')}
                                    />
                              </View>
                        </TouchableWithoutFeedback>
                  </View>
            )
      };
}

const styles = StyleSheet.create({
      container: {
            flex: 1,
            flexDirection: 'column',
            backgroundColor: 'black'
      },
      preview: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
      },
      cameraText: {
            color: 'white',
            fontSize: 18,
            fontWeight: 'bold'
      }
});