import React from 'react';
import {StyleSheet, Text} from 'react-native';

import {colors} from '../../constants';

const RNText = ({type, bold, italic, style, ...props}) => {
  return (
    <>
      <Text
        style={StyleSheet.flatten([getTextStyle(type, bold, italic), style])}
        {...props}
      />
    </>
  );
};
export default RNText;

const getTextStyle = (type, bold, italic) => {
  let style = '';
  switch (type) {
    case 'heading':
      style = styles.textBold;
      break;
    case 'sub_heading':
      style = styles.textSemiBold;
      break;
    default:
      style = styles.textRegular;
  }
  if (bold) {
    style = {...style, fontWeight: 'bold'};
  }

  if (italic) {
    style = {...style, fontStyle: 'italic'};
  }
  return style;
};

const styles = StyleSheet.create({
  textRegular: {
    fontSize: 16,
    color: colors.BLACK,
  },
  textBold: {
    fontSize: 18,
    color: colors.BLACK,
  },
  textSemiBold: {
    fontSize: 18,
    color: colors.BLACK,
  },
});
