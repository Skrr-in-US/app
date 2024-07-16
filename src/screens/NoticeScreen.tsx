import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import RootStackParamList from '../types/RootStackParamList';
import {theme} from '../styles/theme';
import {requestNotifications} from 'react-native-permissions';
import {useAtomValue} from 'jotai';
import {signupAtom} from '../context';
import {useSignin, useSignup} from '../services/mutation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Notice'>;
};

const NoticeScreen: React.FC<Props> = ({navigation}) => {
  const signup = useAtomValue(signupAtom);
  const {mutateAsync: signupMutate} = useSignup();
  const {mutateAsync: signinMutate} = useSignin();

  useEffect(() => {
    requestNotifications(['alert'])
      .then(async res => {
        if (res.status === 'granted') {
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
          navigation.navigate('Description');
        }
      })
      .catch(e => {
        console.log(e);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.question}>
        {`SKRR WORKS
BEST WITH
NOTIFICATIONS ON`}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.primary,
  },
  question: {
    fontSize: 28,
    top: '20%',
    fontWeight: '700',
    textAlign: 'center',
    color: theme.white,
  },
});

export default NoticeScreen;
