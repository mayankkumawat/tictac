import {
  View,
  Image,
  StatusBar,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {createThumbnail} from 'react-native-create-thumbnail';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import {styles} from './styles';
import {colors} from '../../constants';
import Icon from '../../assets/icons/Icon';
import {wp} from '../../helpers/resDimension';
import RNText from '../../components/RNText/RNText';

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
  cameraType: 'front',
  saveToPhotos: true,
  mediaType: 'photo',
  includeBase64: false,
};

const vdOptions = {
  cameraType: 'front',
  saveToPhotos: true,
  mediaType: 'video',
};

const ProfileUpdate = () => {
  const [images, setImages] = useState([]);
  const [video, setVideos] = useState([]);
  const [saving, setSaving] = useState(false);
  const [response, setResponse] = useState(null);

  const onButtonPress = React.useCallback(async () => {
    const result = await launchCamera(options);
    if (Object.keys(result) == 'assets') {
      setResponse(result);
    }
  }, []);

  const handlePhoto = async () => {
    const result = await launchImageLibrary(options);
    if (Object.keys(result) == 'assets') {
      setImages(images.concat([result.assets[0]]));
    }
  };

  const handleVideo = async () => {
    const result = await launchImageLibrary(vdOptions);
    if (Object.keys(result) == 'assets') {
      const thumbnail = await createThumbnail({
        url: result.assets[0].uri,
        timeStamp: 10000,
      });
      result.assets[0].thumb = thumbnail;
      setVideos(video.concat([result.assets[0]]));
    }
  };

  return (
    <>
      <StatusBar translucent={true} backgroundColor={colors.TRANSPARENT} />
      <ScrollView>
        <ImageBackground
          blurRadius={5}
          resizeMode="cover"
          style={styles.image}
          source={{
            uri: response
              ? response?.assets[0]?.uri
              : 'https://reactjs.org/logo-og.png',
          }}>
          <Image
            style={styles.avatar}
            source={{
              uri: response
                ? response?.assets[0]?.uri
                : 'https://reactjs.org/logo-og.png',
            }}
          />
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.camera}
            onPress={onButtonPress}>
            {cameraIcon}
          </TouchableOpacity>
        </ImageBackground>
        <LinearGradient colors={pinkShadow} style={styles.linearGradient} />
        <LinearGradient
          locations={[0, 0, 0.8]}
          colors={[colors.WHITE, colors.LIGHTPINK, colors.SKYBLUE]}
          style={styles.linearGradientContainer}>
          <View style={styles.container}>
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
                    ? images.map(({uri}) => {
                        return (
                          <Image
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
                    ? video.map(({thumb}) => {
                        return (
                          <Image
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
            <TouchableOpacity activeOpacity={0.5} style={styles.saveBtn}>
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
