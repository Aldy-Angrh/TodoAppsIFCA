import {StyleSheet, Text, View} from 'react-native';
import React, {Component} from 'react';
import Spinner from 'react-native-spinkit';
import {colors} from '../../../utils';

export default class index extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Spinner
          style={styles.spin}
          isVisible={true}
          size={50}
          type={'ThreeBounce'}
          color={colors.white}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#BBB',
    width: 100,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  spin: {
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
  },
});
