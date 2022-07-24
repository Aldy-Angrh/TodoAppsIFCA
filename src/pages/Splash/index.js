import React, {Component} from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import Spinner from 'react-native-spinkit';
import {colors} from '../../utils';

export default class Splash extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.replace('Todo');
    }, 9000);
  }

  render() {
    return (
      <ImageBackground
        source={require('../../assets/images/keepdoit.jpg')}
        style={styles.pages}>
        <View style={{height: '50%', zIndex: 2}}></View>
        <View style={{height: '50%', zIndex: 2, marginTop: 280}}>
          <Spinner
            style={styles.spin}
            isVisible={true}
            size={50}
            type={'ThreeBounce'}
            color={colors.white}
          />
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 0,
  },
  spin:{
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
    flex: 1,
  }
});
