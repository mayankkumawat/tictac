import {
  View,
  Text,
  Platform,
  TextInput,
  StyleSheet,
  useColorScheme,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';

import {colors} from '../../constants';
import Icon from '../../assets/icons/Icon';
import {hp, wp, fp} from '../../helpers/resDimension';

const Input = ({
  label,
  value,
  style,
  errors,
  touched,
  editable,
  labelStyle,
  req = false,
  placeholder,
  onChangeText,
  keyboardType,
  rightButton,
  containerStyle,
  onPress,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const handleBlur = () => setIsFocused(false);
  const handleFocus = () => setIsFocused(true);
  const color = {color: colors.BLACK};
  const colorTxt = {color: colors.BLACK};
  return (
    <>
      <View
        style={[
          styles.section,
          isFocused && {
            borderColor: colors.RED,
            borderWidth: 1,
          },
          containerStyle,
        ]}>
        <Text style={[styles.label, labelStyle, color]}>
          {label}
          <Text style={styles.star}>{req && ' *'}</Text>
        </Text>
        <TextInput
          {...props}
          value={value}
          editable={editable}
          placeholder={placeholder}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          onBlur={handleBlur}
          onFocus={handleFocus}
          placeholderTextColor={colors.DARK_GRAY}
          style={[
            styles.input,
            colorTxt,
            {width: rightButton ? wp(75) : wp(90)},
            style,
          ]}
        />
        {rightButton ? (
          <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.7}
            style={[
              styles.rightButton,
              isFocused && {
                borderColor: colors.LIGHTPINK,
              },
            ]}>
            <Icon
              type={'MaterialCommunityIcons'}
              name={'arrow-up'}
              size={wp(6)}
              color={colors.LIGHTPINK}
            />
          </TouchableOpacity>
        ) : null}
      </View>
      {errors && <Text style={[styles.errors]}>{errors}</Text>}
    </>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: fp(2),
    fontWeight: '600',
    marginHorizontal: wp(2),
  },
  star: {
    color: colors.RED,
  },
  input: {
    // backgroundColor: 'green',
    color: colors.BLACK,
    height: hp(5),
    fontSize: fp(2),
    paddingHorizontal: wp(2),
  },
  section: {
    height: hp(8),
    borderRadius: wp(2),
    marginVertical: wp(2),
    paddingVertical: wp(1),
    backgroundColor: colors.WHITE + '90',
  },
  rightButton: {
    width: wp(15),
    height: hp(6),
    borderLeftWidth: 0,
    marginVertical: wp(1),
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.DARK_GRAY,
    borderWidth: 1,
  },
  errors: {
    fontSize: fp(2),
    color: colors.RED,
    marginTop: wp(1),
  },
});

export default Input;
