import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import RootStackParamList from '../types/RootStackParamList';
import {theme} from '../styles/theme';
import {requestNotifications} from 'react-native-permissions';
import {useAtomValue} from 'jotai';
import {signupAtom} from '../context';
import {useRefreshFcdToken, useSignin, useSignup} from '../services/mutation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Notice'>;
};

const NoticeScreen: React.FC<Props> = ({navigation}) => {
  const signup = useAtomValue(signupAtom);
  const {mutateAsync: signupMutate} = useSignup();
  const {mutateAsync: signinMutate} = useSignin();
  const {mutateAsync: refreshFcd} = useRefreshFcdToken();

  const handleAllowClick = () => {
    requestNotifications(['alert'])
      .then(async () => {
        const fcd = await messaging().getToken();
        console.log(fcd);
        const name = `${signup.firstName} ${signup.lastName}`;
        const {age, grade, password, school, gender} = signup;
        const signupData = {
          age,
          grade,
          password,
          school,
          name,
          fcd,
          gender: gender.toLowerCase(),
        };

        if (!signup.isLoginMode) {
          await signupMutate(signupData);
        }

        const token = await signinMutate({age, name, password});
        AsyncStorage.setItem('@token', token);
        await refreshFcd(fcd);
        navigation.navigate('Description');
      })
      .catch(() => {
        navigation.navigate('Error');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>
        {`SKRR WORKS
BEST WITH
NOTIFICATIONS ON`}
      </Text>
      <View style={styles.noticeBox}>
        <View style={styles.noticeView}>
          <View style={styles.noticeViewBox}>
            <Text style={styles.noticeMainText}>
              {'"Skrr" Would Like to Send\nYou Notifications'}
            </Text>
            <Text style={styles.noticeSubText}>
              {
                'Notifications may include alerts, sounds,\nand icon badges. These can be\nconfigured in Settings.'
              }
            </Text>
          </View>
          <View style={styles.noticeButtonBox}>
            <TouchableOpacity
              onPress={handleAllowClick}
              style={styles.noticeDenyButton}>
              <Text style={styles.noticeButtonText}>Don't Allow</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleAllowClick}
              style={styles.noticeAcceptButton}>
              <Text style={styles.noticeButtonText}>Allow</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Image style={styles.up} source={require('../assets/images/up.png')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.primary,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 40,
  },
  question: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    color: theme.white,
  },
  noticeBox: {
    gap: 20,
  },
  image: {
    width: 270,
    height: 180,
  },
  up: {
    width: 70,
    height: 70,
    marginLeft: 'auto',
    marginRight: '8%',
  },
  noticeView: {
    width: 270,
    height: 180,
    borderRadius: 14,
    backgroundColor: `${theme.white}AA`,
    overflow: 'hidden',
  },
  noticeViewBox: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 136,
    gap: 6,
  },
  noticeMainText: {
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
    color: theme.black,
  },
  noticeSubText: {
    fontSize: 13,
    fontWeight: '400',
    textAlign: 'center',
    color: theme.black,
  },
  noticeButtonBox: {
    borderTopWidth: 1,
    borderTopColor: '#3C3C435C',
    marginTop: 'auto',
    flexDirection: 'row',
  },
  noticeDenyButton: {
    width: 135,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#3C3C435C',
  },
  noticeAcceptButton: {
    width: 135,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007AFF99',
  },
  noticeButtonText: {
    fontSize: 17,
    fontWeight: '400',
    color: '#007AFF',
  },
});

export default NoticeScreen;
