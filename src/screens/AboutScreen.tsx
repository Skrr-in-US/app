import React from 'react';
import {
  Image,
  Linking,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {theme} from '../styles/theme';
import {StackNavigationProp} from '@react-navigation/stack';
import RootStackParamList from '../types/RootStackParamList';
import LinearGradient from 'react-native-linear-gradient';
import {useModal} from '../hooks/useModal';
import LeaveModal from '../components/LeaveModal';
import {track} from '@amplitude/analytics-react-native';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Inbox'>;
};

const channelTalkUrl = 'https://skrrinus.channel.io/home';
const privacyPolicyUrl =
  'https://kimhyunjun.notion.site/Privacy-Policy-83a8e1322fa747baad141604201046d6?pvs=4';

const AboutScreen: React.FC<Props> = ({navigation}) => {
  const {openModal} = useModal();
  const handleContactClick = async () => {
    const supported = await Linking.canOpenURL(channelTalkUrl);
    track('handleContactClick', {});
    if (supported) {
      await Linking.openURL(channelTalkUrl);
    }
  };

  const handlePrivacyClick = async () => {
    const supported = await Linking.canOpenURL(privacyPolicyUrl);
    track('handlePrivacyClick', {});
    if (supported) {
      await Linking.openURL(privacyPolicyUrl);
    }
  };

  const handleShareClick = async () => {
    track('handleShareClick', {});
    await Share.share({
      message: 'Skrr | We can start if you come!',
      url: 'https://apps.apple.com/us/app/skrr/id6544790598',
    });
  };

  const handleLeaveClick = () => {
    track('handleLeaveClick', {});
    openModal({
      component: <LeaveModal navigation={navigation} />,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonList}>
        <TouchableOpacity
          onPress={handleContactClick}
          // eslint-disable-next-line react-native/no-inline-styles
          style={[styles.buttonBox, {paddingHorizontal: 20}]}>
          <Image
            // eslint-disable-next-line react-native/no-inline-styles
            style={{width: 45, height: 45}}
            source={require('../assets/images/memo.png')}
          />
          <Text style={styles.buttonText}>Share Feedback</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleContactClick}
          // eslint-disable-next-line react-native/no-inline-styles
          style={[styles.buttonBox, {paddingHorizontal: 20}]}>
          <Image
            // eslint-disable-next-line react-native/no-inline-styles
            style={{width: 45, height: 45}}
            source={require('../assets/images/letter.png')}
          />
          <Text style={styles.buttonText}>Contact Us</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handlePrivacyClick}
          // eslint-disable-next-line react-native/no-inline-styles
          style={[styles.buttonBox, {paddingHorizontal: 20}]}>
          <Image
            // eslint-disable-next-line react-native/no-inline-styles
            style={{width: 45, height: 45}}
            source={require('../assets/images/privacy.png')}
          />
          <Text style={styles.buttonText}>Privacy policy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleShareClick}
          style={styles.buttonGradientBox}>
          <LinearGradient
            colors={['#A634FF', '#FF746B']}
            start={{x: 0.5, y: 0}}
            end={{x: 0.5, y: 1}}
            style={styles.gradient}>
            <View style={styles.gradientInner}>
              <Image
                // eslint-disable-next-line react-native/no-inline-styles
                style={{width: 45, height: 45}}
                source={require('../assets/images/loveletter.png')}
              />
              <Text style={styles.buttonText}>Invite a friend</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleLeaveClick}
          // eslint-disable-next-line react-native/no-inline-styles
          style={[styles.buttonBox, {paddingHorizontal: 20}]}>
          <Image
            // eslint-disable-next-line react-native/no-inline-styles
            style={{width: 45, height: 45}}
            source={require('../assets/images/leave.png')}
          />
          <Text style={styles.buttonText}>Leave Skrr</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    backgroundColor: theme.background,
  },
  buttonList: {
    gap: 20,
    marginTop: 30,
  },
  buttonBox: {
    width: 350,
    height: 72,
    borderRadius: 8,
    backgroundColor: theme.white,
    shadowColor: theme.shadow,
    shadowOffset: {width: 0, height: 0},
    elevation: 10,
    shadowRadius: 10,
    shadowOpacity: 0.2,
    gap: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonGradientBox: {
    width: 350,
    height: 72,
    borderRadius: 8,
    backgroundColor: theme.white,
    shadowColor: '#D153B8',
    shadowOffset: {width: 0, height: 0},
    elevation: 5,
    shadowRadius: 5,
    shadowOpacity: 1,
    gap: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  gradient: {
    borderRadius: 8,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientInner: {
    borderRadius: 6,
    width: '98%',
    height: '92%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: 20,
    backgroundColor: theme.white,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '500',
  },
});

export default AboutScreen;
