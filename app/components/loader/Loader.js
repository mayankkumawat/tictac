import React from 'react';
import {StyleSheet} from 'react-native';
import AnimatedLoader from 'react-native-animated-loader';

import {colors} from '../../constants';
import {wp} from '../../helpers/resDimension';

const Loader = () => {
  return (
    <AnimatedLoader
      visible={true}
      overlayColor={colors.TRANSPARENT}
      source={require('./loader1.json')}
      animationStyle={styles.lottie}
      speed={0.8}
    />
  );
};

const styles = StyleSheet.create({
  lottie: {
    width: wp(30),
    height: wp(30),
  },
});

export default Loader;
