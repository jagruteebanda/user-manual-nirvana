import React, { Component } from 'react';
import {
      View,
      Text,
      Dimensions,
      TextInput,
      TouchableOpacity,
      Image,
      ActivityIndicator
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default class Login extends Component {
      constructor(props) {
            super(props);
            this.state = {
                  email: 'jagruteebanda99@gmail.com',
                  password: '3RQwfl1tulAKP',
                  emailError: null,
                  passwordError: null,
                  loading: false
            }
      }

      handleLogin = () => {
            const { email, password } = this.state;
            if (email.length === 0) {
                  this.setState({
                        emailError: 'Email address cannot be empty!'
                  });
            }
            if (password.length === 0) {
                  this.setState({
                        emailError: 'Password cannot be empty!'
                  });
            }
            if (email.length > 0 && password.length > 0) {
                  this.setState({
                        loading: true
                  });
                  let body = JSON.stringify({
                        email: this.state.email,
                        password: this.state.password
                  });
                  fetch("https://az19fgwa01t.azurewebsites.net/login", {
                        method: "POST",
                        headers: {
                              'Accept': 'application/json',
                              'Content-Type': 'application/json'
                        },
                        body
                  })
                        .then(response => response.json())
                        .then(response => {
                              // console.log(response);
                              window.UserManualNirvana.setUserDetails(response);
                              this.setState({
                                    loading: false
                              });
                              this.props.navigation.navigate('Home');
                        })
                        .catch(error => {
                              console.log("upload error", error);
                        });
            }
      }

      render() {
            return (
                  <View style={{ flex: 1, width, height, alignItems: 'center', justifyContent: 'center', backgroundColor: '#00cc99' }}>

                        {
                              this.state.loading ?
                                    <View style={{ flex: 1, width, height: height - 50, justifyContent: 'center', alignItems: 'center' }}>
                                          <ActivityIndicator
                                                animating={this.state.loading}
                                                size={'large'}
                                                color={'#ffffff'}
                                          />
                                    </View>
                                    :
                                    <View style={{ alignItems: 'center' }}>
                                          <View style={{ width: width - 32, marginLeft: 16, marginRight: 16, marginBottom: 16, justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={{ fontFamily: 'SourceSansPro-SemiBold', fontSize: 24, color: '#ffffff', textAlign: 'center' }}>{'User Manual Nirvana'}</Text>
                                                <Image
                                                      style={{ width: 75, height: 75, marginTop: 16, marginBottom: 16 }}
                                                      source={require('../images/app-logo.png')}
                                                />
                                          </View>
                                          <View style={{ width: width - 32, height: 50, marginLeft: 16, marginRight: 16, justifyContent: 'center' }}>
                                                <Text style={{ fontFamily: 'SourceSansPro-Regular', fontSize: 18, color: '#ffffff' }}>{'Email'}</Text>
                                          </View>
                                          <View style={{ width: width - 32, height: 50, marginLeft: 16, marginRight: 16, borderColor: '#e6e6e6', borderWidth: 1 }}>
                                                <TextInput
                                                      onChangeText={(text) => this.setState({ email: text })}
                                                      value={this.state.email}
                                                      placeholder={'Enter your email here'}
                                                      style={{ fontFamily: 'SourceSansPro-Light', fontSize: 16, paddingLeft: 16, paddingRight: 16, color: '#ffffff' }}
                                                />
                                                {
                                                      this.state.emailError &&
                                                      <Text style={{ fontSize: 16, color: 'red' }}>{this.state.emailError}</Text>
                                                }
                                          </View>
                                          <View style={{ width: width - 32, height: 50, marginLeft: 16, marginRight: 16, justifyContent: 'center' }}>
                                                <Text style={{ fontFamily: 'SourceSansPro-Regular', fontSize: 18, color: '#ffffff' }}>{'Password'}</Text>
                                          </View>
                                          <View style={{ width: width - 32, height: 50, marginLeft: 16, marginRight: 16, borderColor: '#e6e6e6', borderWidth: 1 }}>
                                                <TextInput
                                                      onChangeText={(text) => this.setState({ password: text })}
                                                      value={this.state.password}
                                                      placeholder={'Enter your password here'}
                                                      secureTextEntry={true}
                                                      style={{ fontFamily: 'SourceSansPro-Light', paddingLeft: 16, paddingRight: 16, color: '#ffffff' }}
                                                />
                                                {
                                                      this.state.passwordError &&
                                                      <Text style={{ fontSize: 16, color: 'red' }}>{this.state.passwordError}</Text>
                                                }
                                          </View>
                                          <TouchableOpacity onPress={() => this.handleLogin()}>
                                                <View style={{ width: width - 32, height: 50, backgroundColor: '#333333', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                                                      <Text style={{ fontFamily: 'SourceSansPro-Regular', fontSize: 18, color: '#ffffff' }}>{'Login'}</Text>
                                                </View>
                                          </TouchableOpacity>
                                    </View>
                        }
                  </View>
            );
      }
}