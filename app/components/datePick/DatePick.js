import moment from 'moment';
import React, {useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import {colors} from '../../constants';
import {wp, fp, hp} from '../../helpers/resDimension';

const DatePick = ({req, label = 'Date of birth'}) => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={showDatepicker}
      style={styles.container}>
      <Text style={[styles.label]}>
        {label}
        <Text style={styles.star}>{req && ' *'}</Text>
      </Text>
      <Text style={styles.date}>{moment(date).format('DD/MM/YYYY')}</Text>
      {/* only render if you want to show datetime picker modal, otherwise don't render it */}
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE + '90',
    borderRadius: wp(2),
    justifyContent: 'space-around',
    height: hp(8),
    paddingHorizontal: wp(2),
    marginVertical: wp(2),
  },
  date: {
    fontSize: fp(2),
    color: colors.BLACK,
  },
  errors: {
    fontSize: fp(2),
    color: colors.RED,
    marginTop: wp(1),
  },
  label: {
    fontSize: fp(2),
    fontWeight: '600',
    color: colors.BLACK,
  },
  star: {
    color: colors.RED,
  },
});

export default DatePick;
