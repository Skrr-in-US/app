import React, {useRef} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {theme} from '../styles/theme';
import LinearGradient from 'react-native-linear-gradient';
import {StackNavigationProp} from '@react-navigation/stack';
import RootStackParamList from '../types/RootStackParamList';
import {RouteProp} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import {query} from '../services/query';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
import {useModal} from '../hooks/useModal';
import PaymentModal from '../components/PaymentModal';
// import {CreativeKit} from '@snapchat/snap-kit-react-native';
// import RNFS from 'react-native-fs';

type Props = {
  route: RouteProp<RootStackParamList, 'Detail'>;
  navigation: StackNavigationProp<RootStackParamList, 'Detail'>;
};

const backgroundColorList = [
  '#8E34FF',
  '#E95FE4',
  '#4E7CF2',
  '#F27F4E',
  '#32C08C',
  '#85CD11',
  '#11ABCD',
  '#6F8DA4',
  '#885851',
  '#555555',
  '#F35252',
  '#F0AF31',
];

const DetailScreen: React.FC<Props> = ({route, navigation}) => {
  const backgroundColor = backgroundColorList[Math.round(Math.random() * 12)];
  const {id} = route.params;
  const {data} = useQuery(query.alertDetail(id));
  const {openModal} = useModal();

  const genderImage = (() => {
    switch (data?.gender) {
      case 'boy':
        return require('../assets/images/Boy.png');
      case 'girl':
        return require('../assets/images/Girl.png');
      case 'non-binary':
        return require('../assets/images/Non-binary.png');
    }
  })();

  const viewShotRef = useRef<ViewShot>(null);

  const handleOpenPaymentModal = () => {
    openModal({
      component: <PaymentModal />,
    });
  };

  // const onPressSnapChatShare = async () => {
  //   const uri = await viewShotRef.current?.capture?.();
  //   if (uri) {
  //     const image = `file://${uri}`;
  //     // const stickerUrl = image;
  //     // const attachmentUrl = image;
  //     console.log(image);

  //     const base64 = await RNFS.readFile(image, 'base64');
  //     console.log(1);
  //     // console.log(base64);

  //     CreativeKit.sharePhoto({
  //       content: {
  //         // raw: base64,
  //         uri: base64,
  //       },
  //       sticker: {
  //         uri: base64,
  //         width: 200,
  //         height: 200,
  //         posX: 0.5,
  //         posY: 0.5,
  //       },
  //       attachmentUrl: 'file://',
  //       caption: 'captionText',
  //       // attachmentUrl: image,
  //     }).catch(error => {
  //       console.log(error.toString());
  //     });
  //     // const apple =
  //     // 'https://cdn.pixabay.com/photo/2016/02/23/17/42/orange-1218158_960_720.png';

  //     // const orange =
  //     //   'https://i.namu.wiki/i/uwOpUaWZPXhxxrVZyID_VATqmJvDiJmM8tLYpzlgKcDLWTtehtl9G9_4h8qGYW3t918v1V2a96R0Hu1X5xiNVQ.webp';
  //     // const photoContent = {
  //     //   content: {
  //     //     uri: apple,
  //     //   },
  //     // sticker: {
  //     //   uri: apple,
  //     //   width: 300,
  //     //   height: 300,
  //     //   posX: 0.5,
  //     //   posY: 0.6,
  //     //   rotationDegreesInClockwise: 0,
  //     //   isAnimated: false,
  //     // },
  //     // caption: 'caption string',
  //     // attachmentUrl: apple,
  //     // };

  //     // CreativeKit.sharePhoto(photoContent)
  //     //   .then(() => {
  //     //     console.log('success');
  //     //   })
  //     //   .catch(error => {
  //     //     console.log(error);
  //     //   });
  //   }
  // };

  const onPressCaptureAndInstagramShare = async () => {
    const uri = await viewShotRef.current?.capture?.();
    if (uri) {
      const image = `file://${uri}`;
      try {
        const {success} = await Share.shareSingle({
          social: Share.Social.INSTAGRAM_STORIES as any,
          appId: '1001723847816320',
          stickerImage: image,
        });

        console.log(success);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.wrap, {backgroundColor}]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.back}>
          <Image
            // eslint-disable-next-line react-native/no-inline-styles
            style={{width: 17, height: 17}}
            source={require('../assets/images/arrow.png')}
          />
        </TouchableOpacity>
        <ViewShot
          ref={viewShotRef}
          style={[styles.screenshot, {backgroundColor}]}>
          <View style={styles.column}>
            <Image
              // eslint-disable-next-line react-native/no-inline-styles
              style={{width: 60, height: 60}}
              source={genderImage}
            />
            <Text style={styles.author}>
              From a {data?.gender}
              {'\n'}
              in {data?.sendUserGrade}th grade
            </Text>
          </View>
          <Text style={styles.question}>{data?.question}</Text>
          <View style={styles.column}>
            <View style={styles.authorBox}>
              <View style={styles.authorButton}>
                <Text style={styles.authorText}>{data?.receiveUserName}</Text>
              </View>
              <Image
                style={styles.authorEmoji}
                source={require('../assets/images/backhand.png')}
              />
            </View>
            <Text style={styles.noticeText}>Skrr app on appstore</Text>
          </View>
        </ViewShot>
        <View style={styles.share}>
          {/* <TouchableOpacity
            onPress={onPressSnapChatShare}
            style={styles.snapBox}>
            <Text style={styles.snapText}>Share!</Text>
            <Image
              style={styles.snapLogo}
              source={require('../assets/images/snap.png')}
            />
          </TouchableOpacity> */}
          <TouchableOpacity
            style={styles.gradient}
            onPress={onPressCaptureAndInstagramShare}>
            <LinearGradient
              colors={[
                '#ECCD60',
                '#FAA85C',
                '#F78458',
                '#F56C7F',
                '#FF3879',
                '#FF37D2',
              ]}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.gradientBox}>
              <Text style={styles.snapText}>Share!</Text>
              <Image
                style={styles.instagram}
                source={require('../assets/images/instagram.png')}
              />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={handleOpenPaymentModal}
          style={styles.unlockButton}>
          <Text style={styles.unlockText}>🔒 See who sent it</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingTop: 48,
    backgroundColor: theme.black,
  },
  back: {
    position: 'absolute',
    left: 16,
    top: 16,
  },
  wrap: {
    flex: 10,
    width: '100%',
    borderRadius: 12,
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: 14,
    gap: 26,
  },
  screenshot: {
    flex: 10,
    width: '100%',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 42,
  },
  column: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  personImage: {
    width: 60,
    height: 60,
  },
  author: {
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 17,
    color: theme.white,
  },
  question: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.white,
    paddingHorizontal: '6%',
    textAlign: 'center',
  },
  authorBox: {
    position: 'relative',
  },
  authorButton: {
    width: 150,
    height: 62,
    backgroundColor: theme.white,
    borderRadius: 6.8,
    shadowColor: theme.black,
    shadowOpacity: 0.25,
    shadowOffset: {width: 3, height: 4},
    shadowRadius: 4,
    elevation: 4,
    padding: 14,
    flexShrink: 0,
    flexBasis: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  authorText: {
    fontWeight: '600',
    fontSize: 17,
  },
  authorEmoji: {
    position: 'absolute',
    width: 88,
    height: 88,
    top: -44,
    right: -60,
  },
  noticeText: {
    color: theme.white,
    fontWeight: '700',
    fontSize: 17,
  },
  footer: {
    flex: 2,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '6%',
  },
  share: {
    width: '100%',
    height: 58,
    marginTop: 'auto',
    marginBottom: 20,
    borderRadius: 28,
    shadowColor: theme.black,
    shadowOpacity: 0.5,
    shadowOffset: {width: 2, height: 4},
    shadowRadius: 4,
    elevation: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  snapBox: {
    width: 260,
    height: 58,
    backgroundColor: '#FFFC00',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 28,
  },
  snapText: {
    fontSize: 17,
    fontWeight: '700',
    color: theme.white,
  },
  instagram: {
    position: 'absolute',
    right: 20,
  },
  snapLogo: {
    width: 40,
    height: 40,
    position: 'absolute',
    right: 20,
  },
  shareText: {
    fontSize: 17,
    fontWeight: '700',
    color: theme.white,
  },
  gradient: {
    width: '100%',
    height: 58,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 28,
  },
  gradientBox: {
    width: '100%',
    height: 58,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 28,
    flexDirection: 'row',
  },
  unlockButton: {
    width: '94%',
    height: 55,
    backgroundColor: theme.grey,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: theme.black,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  unlockText: {
    color: theme.white,
    fontWeight: '700',
    fontSize: 18,
  },
  button: {
    width: '100%',
    height: 58,
  },
});

export default DetailScreen;
