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
      Alert,
      ActivityIndicator,
      BackHandler
} from 'react-native';
import { RNCamera } from 'react-native-camera-tflite';
import Icon from 'react-native-vector-icons/FontAwesome5';

const { width, height } = Dimensions.get('window');

export default class ScanProduct extends Component {

      constructor(props) {
            super(props);
            this.state = {
                  time: 0,
                  output: "",
                  outputData: [],
                  showCamera: true,
                  productPartName: ''
            };
            this.handleBackPress = this.handleBackPress.bind(this);
      }

      componentDidMount = () => {
            BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
      }

      componentWillUnmount = () => {
            BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
      }

      handleBackPress() {
            this.props.navigation.navigate('AddProductPart');
            return true;
      }

      UNSAFE_componentWillReceiveProps = (nextProps, nextState) => {
            this.setState({
                  showCamera: true
            })
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

            // console.log('Data:: ', data);

            return data;
      };

      handleYes = () => {
            this.props.navigation.navigate('PDFViewScreen', { productPartName: this.state.productPartName })
      }

      handleRetake = () => {
            this.setState({ showCamera: true });
      }

      handleCameraClick = async () => {
            // this.handleYes();
            if (this.camera) {
                  const options = { quality: 0.5, base64: true };
                  const data = await this.camera.takePictureAsync(options);
                  const body = this.createFormData(data, { userId: '123' });
                  this.setState({ showCamera: false });
                  fetch("http://localhost:3000/apis/upload", {
                        method: "POST",
                        body
                  })
                        .then(response => response.json())
                        .then(response => {
                              this.setState({ showCamera: true, productPartName: response.result.guess });
                              Alert.alert(
                                    'Classified Product:',
                                    `Is this ${response.result.guess}?`,
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
                              // Alert.alert(
                              //       'Image Classification Error:',
                              //       `There was error while classifying product! Please try again`,
                              //       [
                              //             {
                              //                   text: 'Ok',
                              //                   onPress: () => this.handleRetake()
                              //             }
                              //       ],
                              //       { cancelable: false },
                              // );
                              this.props.navigation.navigate('PDFViewScreen', { productPartName: 'gantry' })
                        });
            } else {
                  Alert.alert(
                        'Camera Initialization Error:',
                        `There was error while initializing camera! Please try again`,
                        [
                              {
                                    text: 'Ok',
                                    onPress: () => this.handleRetake()
                              }
                        ],
                        { cancelable: false },
                  );
            }
      }

      render() {
            return (
                  <View style={{ flex: 1, width, height }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width, height: 50, backgroundColor: '#00cc99' }}>
                              <TouchableOpacity onPress={() => this.props.navigation.navigate('AddProductPart')}>
                                    <View style={{ padding: 8 }}>
                                          <Icon name="arrow-circle-left" size={20} color="#fff" />
                                    </View>
                              </TouchableOpacity>
                              <View style={{}}>
                                    <Text style={{ fontFamily: 'SourceSansPro-SemiBold', color: 'white', fontSize: 18 }}>{'Scan Product'}</Text>
                              </View>
                              <View style={{ opacity: 0, padding: 8 }}>
                                    <Icon name="arrow-circle-left" size={20} color="#fff" />
                              </View>
                        </View>
                        {
                              this.state.showCamera ?
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
                                                      // onGoogleVisionBarcodesDetected={({ barcodes }) => {
                                                      //       console.log(barcodes);
                                                      // }}
                                                />
                                          </View>
                                          <TouchableWithoutFeedback onPress={() => this.handleCameraClick()}>
                                                <View style={{ position: 'absolute', left: width / 2 - 35, bottom: 25, elevation: 100 }}>
                                                      <Image
                                                            style={{ width: 70, height: 70 }}
                                                            source={require('../../images/camera.png')}
                                                      />
                                                </View>
                                          </TouchableWithoutFeedback>
                                    </View>
                                    :
                                    <View style={{ flex: 1, width, height: height - 50, backgroundColor: '#000000', alignItems: 'center', justifyContent: 'center', elevation: 10 }}>
                                          <ActivityIndicator animating={!this.state.showCamera} size="large" color="#00cc99" />
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