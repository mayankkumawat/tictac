import {StyleSheet} from 'react-native';
import {colors} from '../../constants';

import {fp, hp, wp} from '../../helpers/resDimension';

export const styles = StyleSheet.create({
  image: {
    width: wp(100),
    height: hp(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: wp(40),
    height: wp(40),
    borderRadius: wp(100),
  },
  camera: {
    width: wp(8),
    left: wp(55),
    height: wp(8),
    bottom: wp(21),
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    borderRadius: wp(100),
    justifyContent: 'center',
    backgroundColor: colors.SKYBLUE,
  },
  linearGradient: {
    width: wp(100),
    height: hp(4),
    marginTop: hp(-5),
  },
  linearGradientContainer: {
    width: wp(100),
  },
  container: {
    paddingHorizontal: wp(5),
  },
  photoSection: {
    marginVertical: wp(5),
  },
  sectionHeading: {
    color: colors.WHITE,
    fontWeight: 'bold',
  },
  sectionSubHeading: {
    color: colors.FADEBLUE,
    fontSize: fp(1.8),
  },
  photos: {
    paddingVertical: wp(5),
    flexDirection: 'row',
  },
  addImage: {
    width: wp(25),
    height: wp(25),
    alignItems: 'center',
    borderRadius: wp(2),
    justifyContent: 'center',
    backgroundColor: colors.BLACK + 50,
  },
  imageSquare: {
    width: wp(25),
    height: wp(25),
    borderRadius: wp(2),
    marginEnd: wp(5),
  },
  saveBtn: {
    marginTop: hp(10),
    marginBottom: hp(5),
    width: wp(50),
    height: hp(5),
    borderRadius: wp(60),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: colors.WHITE,
    backgroundColor: colors.BLACK + '60',
  },
});
