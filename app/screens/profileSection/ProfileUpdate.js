import {
  View,
  Image,
  StatusBar,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {useToast} from 'react-native-toast-notifications';
import {createThumbnail} from 'react-native-create-thumbnail';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import {
  Input,
  RNText,
  Loader,
  DatePick,
  DropDown,
  CountryPicker,
} from '../../components';
import {styles} from './styles';
import {ApiService} from '../../api';
import Icon from '../../assets/icons/Icon';
import {wp} from '../../helpers/resDimension';
import {isValidUrl} from '../../helpers/helpers';
import {colors, constants} from '../../constants';

const cameraIcon = (
  <Icon
    type={'FontAwesome'}
    name={'camera'}
    size={wp(4)}
    color={colors.WHITE}
  />
);

const addIcon = (
  <Icon
    type={'MaterialIcons'}
    name={'add'}
    size={wp(10)}
    color={colors.WHITE}
  />
);

const pinkShadow = [
  colors.LIGHTPINK + '00',
  colors.LIGHTPINK + '20',
  colors.LIGHTPINK + '40',
  colors.LIGHTPINK + '60',
  colors.LIGHTPINK + '90',
  colors.LIGHTPINK,
];

const options = {
  quality: 0.3,
  cameraType: 'front',
  saveToPhotos: true,
  mediaType: 'photo',
  includeBase64: true,
};

const vdOptions = {
  cameraType: 'front',
  saveToPhotos: true,
  mediaType: 'video',
};

const ProfileUpdate = () => {
  const toast = useToast();
  const [user, setUser] = useState({});
  const [video, setVideos] = useState([]);
  const [images, setImages] = useState([]);
  const [saving, setSaving] = useState(false);
  const [loader, setLoader] = useState(false);

  const handleChange = (key, value) => {
    setUser({...user, [key]: value});
  };

  const onAvatar = async () => {
    try {
      const result = await launchCamera(options);
      if (Object.keys(result) == 'assets') {
        handleChange(
          'profile',
          constants.base64Prefix + result?.assets[0]?.base64,
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handlePhoto = async () => {
    setLoader(true);
    try {
      const result = await launchImageLibrary(options);
      if (Object.keys(result) == 'assets') {
        await ApiService.imagesUpload({
          file: constants.base64Prefix + result?.assets[0]?.base64,
        }).then(res => {
          setLoader(false);
          if (res?.data?.status) {
            toast.show('image uploaded', {type: 'success'});
          }
        });
        setImages(images.concat([result.assets[0]]));
      } else {
        setLoader(false);
      }
    } catch (e) {
      setLoader(false);
      toast.show('something went wrong', {type: 'danger'});
    }
  };

  const handleVideo = async () => {
    setLoader(true);
    try {
      let formData = new FormData();
      const result = await launchImageLibrary(vdOptions);
      if (Object.keys(result) == 'assets') {
        formData.append('video', {
          uri: result?.assets[0]?.uri,
          type: result?.assets[0]?.type,
          name: result?.assets[0]?.fileName,
        });
        await ApiService.videosUpload(formData).then(res => {
          if (res?.data?.status) {
            setLoader(false);
            console.log(res);
            toast.show('Video uploaded', {type: 'success'});
          }
        });
        const thumbnail = await createThumbnail({
          url: result.assets[0].uri,
          timeStamp: 10000,
        });
        result.assets[0].thumb = thumbnail;
        setVideos(video.concat([result.assets[0]]));
      } else {
        setLoader(false);
        toast.show('something went wrong', {type: 'danger'});
      }
    } catch (e) {
      console.log(e);
      toast.show('something went wrong', {type: 'danger'});
      setLoader(false);
    }
  };

  const getProfile = async () => {
    setLoader(true);
    try {
      let res = await ApiService.profileDetails();
      if (res?.data?.status) {
        setUser({
          name: res?.data?.user?.name,
          gender: res?.data?.user?.gender,
          country: res?.data?.user?.country,
          aboutLive: res?.data?.user?.aboutLive,
          DateOfBirth: new Date(res?.data?.user?.DateOfBirth),
          profile: constants.imageBaseUrl + res?.data?.user?.profile,
        });
        setLoader(false);
      } else {
        toast.show('something went wrong', {type: 'danger'});
      }
    } catch (error) {
      toast.show('something went wrong', {type: 'danger'});
      console.log(error);
    }
  };

  const handleForm = async () => {
    let userInstance = user;
    if (isValidUrl(userInstance.profile)) {
      delete userInstance.profile;
    } else {
      userInstance.file = userInstance.profile;
      delete userInstance.profile;
    }

    try {
      let res = await ApiService.profileUpdate(userInstance);
      if (res?.data?.status) {
        getProfile();
        toast.show('Profile uploaded', {type: 'success'});
      }
    } catch (error) {
      toast.show('something went wrong\n Please try again', {type: 'danger'});
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <>
      <StatusBar translucent={true} backgroundColor={colors.TRANSPARENT} />
      {loader ? <Loader /> : null}
      <ScrollView>
        <ImageBackground
          blurRadius={5}
          resizeMode="cover"
          style={styles.image}
          source={{
            uri: user?.profile
              ? user?.profile
              : 'https://reactjs.org/logo-og.png',
          }}>
          <Image
            style={styles.avatar}
            source={{
              uri: user?.profile
                ? user?.profile
                : 'https://reactjs.org/logo-og.png',
            }}
          />
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.camera}
            onPress={onAvatar}>
            {cameraIcon}
          </TouchableOpacity>
        </ImageBackground>
        <LinearGradient colors={pinkShadow} style={styles.linearGradient} />
        <LinearGradient
          locations={[0, 0, 0.8]}
          colors={[colors.WHITE, colors.LIGHTPINK, colors.SKYBLUE]}
          style={styles.linearGradientContainer}>
          <View style={styles.container}>
            <View style={styles.inputSection}>
              <Input
                req
                label={'Name'}
                value={user.name}
                onChangeText={arg => handleChange('name', arg)}
              />
              <DropDown
                req
                label={'Gender'}
                data={[
                  {label: 'Male', value: 'male'},
                  {label: 'Female', value: 'female'},
                ]}
                netValue={user?.gender}
                onChangeValue={arg => handleChange('gender', arg)}
              />
              <DatePick
                req
                val={user?.DateOfBirth}
                callback={arg => handleChange('DateOfBirth', arg)}
              />
              <CountryPicker
                country={user?.country}
                callback={arg => handleChange('country', arg)}
              />
              <Input
                label={'About'}
                multiline={true}
                numberOfLines={4}
                value={user?.aboutLive}
                style={styles.aboutInput}
                containerStyle={styles.aboutContainer}
                onChangeText={arg => handleChange('aboutLive', arg)}
              />
            </View>
            <View style={styles.photoSection}>
              <RNText style={styles.sectionHeading}>Photos</RNText>
              <RNText style={styles.sectionSubHeading}>
                Upload three most favourite pictures of you
              </RNText>
              <View style={styles.photos}>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{flexDirection: 'row'}}>
                  {images.length
                    ? images.map(({uri}, index) => {
                        return (
                          <Image
                            key={index}
                            source={{uri: uri}}
                            style={styles.imageSquare}
                          />
                        );
                      })
                    : null}
                  <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.addImage}
                    onPress={handlePhoto}>
                    {addIcon}
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </View>
            <View style={styles.videoSection}>
              <RNText style={styles.sectionHeading}>Videos</RNText>
              <RNText style={styles.sectionSubHeading}>
                Upload your best moments captured
              </RNText>
              <View style={styles.photos}>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{flexDirection: 'row'}}>
                  {video.length
                    ? video.map(({thumb}, index) => {
                        return (
                          <Image
                            key={index}
                            source={{uri: thumb?.path}}
                            style={styles.imageSquare}
                          />
                        );
                      })
                    : null}
                  <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.addImage}
                    onPress={handleVideo}>
                    {addIcon}
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </View>
            <TouchableOpacity
              disabled={saving}
              activeOpacity={0.5}
              style={styles.saveBtn}
              onPress={() => {
                setSaving(true);
                setTimeout(() => {
                  setSaving(false);
                }, 2000);
                handleForm();
              }}>
              {saving ? (
                <ActivityIndicator size="small" color={colors.WHITE} />
              ) : (
                <RNText style={styles.sectionHeading}>Save</RNText>
              )}
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </ScrollView>
    </>
  );
};

export default ProfileUpdate;
