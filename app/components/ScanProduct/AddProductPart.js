import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  BackHandler
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const { width, height } = Dimensions.get('window');

export default class AddProductPart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productName: this.props.navigation.state.params.productName || '',
      productParts: this.props.navigation.state.params.productParts,
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
    this.props.navigation.navigate('SelectModality');
    return true;
  }
  UNSAFE_componentWillReceiveProps = (nextProps, nextState) => {
    // console.log(nextProps.navigation.state.params, ' ScanProductStep1 madhe aal');
    this.setState({
      productParts: nextProps.navigation.state.params.productParts,
    });
  };

  handleAddProductPart = () => {
    this.props.navigation.navigate('ScanProduct');
  };

  render() {
    return (
      <View style={{ flex: 1, width, height }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width,
            height: 50,
            backgroundColor: '#00cc99',
          }}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('SelectModality')}>
            <View style={{ padding: 8 }}>
              {/* <Text style={{ color: 'white', fontSize: 18 }}>{'<'}</Text> */}
              <Icon name="arrow-circle-left" size={20} color="#fff" />
            </View>
          </TouchableOpacity>
          <View style={{}}>
            <Text
              style={{
                fontFamily: 'SourceSansPro-SemiBold',
                color: 'white',
                fontSize: 18,
              }}>
              {'Add Product Part'}
            </Text>
          </View>
          <View style={{ opacity: 0, padding: 8 }}>
            <Icon name="arrow-circle-left" size={20} color="#fff" />
          </View>
        </View>
        <View style={{ width, height: height - 50 }}>
          <View style={{ height: 50, paddingLeft: 16, justifyContent: 'center' }}>
            <Text style={{ fontFamily: 'SourceSansPro-Regular', fontSize: 16 }}>
              {'Product Name:'}
            </Text>
          </View>
          <View
            style={{
              height: 50,
              paddingLeft: 16,
              paddingRight: 16,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TextInput
              style={{
                fontFamily: 'SourceSansPro-Light',
                color: '#333333',
                backgroundColor: '#e6e6e6',
                width: width - 32,
                paddingLeft: 16,
                paddingRight: 16,
              }}
              onChangeText={text => this.setState({ productName: text })}
              value={this.state.productName}
              placeholder={'Product Name'}
              editable={false}
            />
          </View>
          <View style={{ height: 50, paddingLeft: 16, justifyContent: 'center' }}>
            <Text style={{ fontFamily: 'SourceSansPro-Regular', fontSize: 16 }}>
              {'Product Parts:'}
            </Text>
          </View>
          {this.state.productParts &&
            this.state.productParts.length > 0 &&
            this.state.productParts.map((item, i) => (
              <View
                style={{
                  height: 50,
                  paddingLeft: 16,
                  paddingRight: 16,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TextInput
                  style={{ backgroundColor: '#e6e6e6', width: width - 32 }}
                  value={item.productPartName}
                  editable={false}
                />
              </View>
            ))}
          <TouchableOpacity onPress={() => this.handleAddProductPart()}>
            <View
              style={{
                flexDirection: 'row',
                width: width - 32,
                height: 50,
                marginLeft: 16,
                marginRight: 16,
                marginTop: 16,
                backgroundColor: '#00cc99',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Icon name={'plus-circle'} size={16} color={'#ffffff'} />
              <Text
                style={{
                  fontFamily: 'SourceSansPro-Regular',
                  fontSize: 16,
                  marginLeft: 10,
                  color: '#ffffff',
                }}>
                {'Add product part'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
