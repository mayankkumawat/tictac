import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

import {colors} from '../../constants';
import Icon from '../../assets/icons/Icon';
import {wp, fp, hp} from '../../helpers/resDimension';

const modalCheckIcon = () => (
  <Icon
    type="MaterialCommunityIcons"
    name="check"
    size={wp(6)}
    color={colors.BLACK}
  />
);

const modalCloseIcon = () => (
  <Icon
    type="MaterialCommunityIcons"
    name="close"
    size={wp(7)}
    color={colors.WHITE}
  />
);

const modalArrowUpIcon = () => (
  <Icon
    type="MaterialIcons"
    name="keyboard-arrow-up"
    size={wp(5)}
    color={colors.DARK_GRAY}
  />
);

const modalArrowDownIcon = () => (
  <Icon
    type="MaterialIcons"
    name="keyboard-arrow-down"
    size={wp(5)}
    color={colors.DARK_GRAY}
  />
);

const DropDown = React.memo(
  ({
    req,
    label,
    data = [],
    disable,
    loading,
    netValue,
    searchable,
    modalTitle,
    onChangeValue,
  }) => {
    const [value, setValue] = useState(netValue);
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState(data || []);
    const [modalVisible, setModalVisible] = useState(false);

    const backgroundColor = {
      backgroundColor: colors.WHITE + '90',
    };

    const color = {
      color: colors.BLACK,
    };

    useEffect(() => {
      if (netValue !== value) {
        setValue(netValue);
      }
    }, [netValue]);

    useEffect(() => {
      setItems(data);
    }, [data]);

    useEffect(() => {
      if (value !== netValue) {
        onChangeValue(value);
      }
    }, [value]);

    return (
      <View style={styles.dropContainer}>
        <Text style={[styles.label]}>
          {label}
          <Text style={styles.star}>{req && ' *'}</Text>
        </Text>
        <DropDownPicker
          open={open}
          value={netValue}
          items={items}
          setOpen={setOpen}
          listMode={'MODAL'}
          disabled={disable}
          loading={loading}
          setValue={setValue}
          setItems={setItems}
          searchable={searchable}
          modalTitle={modalTitle}
          closeOnBackPressed={true}
          // onChangeValue={newData => handleValueChange(newData)}
          labelStyle={[styles.labelStyle, color]}
          modalTitleStyle={[styles.modalTitleStyle]}
          searchContainerStyle={styles.searchContainerStyle}
          listItemLabelStyle={[styles.listItemLabelStyle, color]}
          selectedItemLabelStyle={[styles.selectedItemLabelStyle, color]}
          selectedItemContainerStyle={{backgroundColor: colors.RED + '40'}}
          modalProps={{
            transparent: true,
            animationType: 'fade',
            statusBarTranslucent: true,
            presentationStyle: 'overFullScreen',
            onRequestClose: () => {
              setModalVisible(!modalVisible);
            },
          }}
          modalContentContainerStyle={[
            {
              top: hp(40),
              width: wp(80),
              maxHeight: hp(30),
              marginHorizontal: wp(10),
              borderRadius: wp(1),
              backgroundColor: colors.WHITE,
            },
          ]}
          style={[
            {
              paddingHorizontal: wp(0.5),
              paddingRight: wp(5),
              marginTop: wp(-1),
              backgroundColor: colors.WHITE + '00',
              height: hp(6),
              borderWidth: 0,
            },
          ]}
          placeholderStyle={[
            styles.placeholderStyle,
            {color: colors.TRANSPARENT},
          ]}
          dropDownContainerStyle={[backgroundColor]}
          CloseIconComponent={modalCloseIcon}
          TickIconComponent={modalCheckIcon}
          ArrowUpIconComponent={modalArrowUpIcon}
          ArrowDownIconComponent={modalArrowDownIcon}
        />
      </View>
    );
  },
);

export const styles = StyleSheet.create({
  label: {
    color: colors.BLACK,
    fontSize: fp(2),
    fontWeight: '600',
    marginHorizontal: wp(2),
  },
  star: {
    color: colors.RED,
  },
  modalTitleStyle: {
    color: colors.WHITE,
  },
  listItemLabelStyle: {
    fontSize: fp(1.8),
  },
  selectedItemLabelStyle: {},
  searchContainerStyle: {
    backgroundColor: colors.FADEBLUE,
  },
  closeIconStyle: {
    width: wp(10),
  },
  labelStyle: {
    fontSize: fp(2),
    paddingHorizontal: wp(2),
  },
  placeholderStyle: {
    fontSize: fp(1.8),
  },
  dropContainer: {
    backgroundColor: colors.WHITE + 90,
    height: hp(8),
    borderWidth: 0,
    borderRadius: wp(2),
    marginVertical: wp(2),
    paddingTop: wp(1),
  },
});

export default DropDown;
