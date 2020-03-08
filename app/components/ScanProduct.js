import React, { Component } from 'react';
import {
      View,
      Text,
      Dimensions,
      StyleSheet,
      TouchableOpacity,
      TouchableWithoutFeedback,
      Image,
      Platform,
      Alert
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
                  outputData: [],
                  showCamera: true
            };
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
                  // console.log('Image captured:: ', data.uri);

                  fetch("http://localhost:3000/apis/upload", {
                        method: "POST",
                        body: this.createFormData(data, { userId: "123" })
                  })
                        .then(response => response.json())
                        .then(response => {
                              // console.log("upload succes", response);

                              Alert.alert(
                                    'Product',
                                    `Is this ${response.result.guess}`,
                                    [
                                          {
                                                text: 'Yes',
                                                onPress: () => this.handleYes(),
                                                style: 'cancel',
                                          },
                                          { text: 'Retake', onPress: () => this.handleRetake() },
                                    ],
                                    { cancelable: false },
                              );
                        })
                        .catch(error => {
                              // console.log("upload error", error);
                              alert("Upload failed!");
                        });
            }
      }

      render() {
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
                        {
                              this.state.showCamera &&
                              <View style={{ flex: 1 }}>
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
                        }

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