import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import CountryPick from 'react-native-country-picker-modal';

import {colors} from '../../constants';
import RNText from '../RNText/RNText';
import Icon from '../../assets/icons/Icon';
import {fp, hp, wp} from '../../helpers/resDimension';

const CountryPicker = ({country = 'India', callback}) => {
  const [withFlag, setWithFlag] = useState(true);
  const [callingCode, setCallingCode] = useState('');
  const [countryCode, setCountryCode] = useState('IN');

  const [withCallingCode, setWithCallingCode] = useState(true);

  const onSelect = Country => {
    callback(Country?.name);
    setCountryCode(Country?.cca2);
    setCallingCode(Country?.callingCode);
    setWithCallingCode(Country?.withCallingCode);
  };

  return (
    <View style={styles.flag}>
      <View style={{width: wp(85)}}>
        <CountryPick
          {...{
            withFlag,
            onSelect,
            withCallingCode,
          }}
          placeholder={<Text style={styles.label}>{'Country'}</Text>}
          containerButtonStyle={styles.containerButtonStyle}
        />
        <RNText style={styles.country}>{country}</RNText>
      </View>
      <Icon
        type="MaterialIcons"
        name="keyboard-arrow-down"
        size={wp(5)}
        color={colors.DARK_GRAY}
        style={styles.icon}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  label: {
    fontWeight: '600',
  },
  flag: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: wp(1),
    backgroundColor: colors.WHITE + '90',
    height: hp(8),
    paddingHorizontal: wp(2),
    borderRadius: wp(2),
    marginVertical: wp(2),
  },
  flag1: {
    color: colors.BLACK,
    alignSelf: 'center',
    fontSize: 17,
    marginTop: hp(-1),
  },
  inputStyle: {
    marginHorizontal: 10,
    marginTop: hp(-1),
    width: wp(84),
    fontSize: 18,
    color: colors.BLACK,
    marginRight: wp(1),
  },
  firstTextView: {
    flexDirection: 'row',
    height: hp(9),
  },
  country: {
    zIndex: -10,
    fontSize: fp(2),
    color: colors.BLACK,
    paddingBottom: wp(1),
    marginTop: wp(-6),
  },
  icon: {
    position: 'absolute',
    alignSelf: 'flex-end',
    right: wp(5),
    top: wp(9),
  },
  containerButtonStyle: {height: hp(7)},
});

export default CountryPicker;
