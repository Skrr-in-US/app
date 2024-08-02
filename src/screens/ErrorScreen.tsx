import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import RootStackParamList from '../types/RootStackParamList';
import {theme} from '../styles/theme';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Error'>;
};

const ErrorScreen: React.FC<Props> = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.question}>
        {'Please register as a member first.\nYou are an unregistered user.'}
      </Text>
      <View style={styles.buttonBox}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Age')}
          style={styles.button}>
          <Text style={styles.text}>Try again</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Onboarding')}
          style={styles.button}>
          <Text style={styles.text}>Sign up</Text>
        </TouchableOpacity>
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
    fontSize: 20,
    fontWeight: '600',
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
  buttonBox: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '90%',
    borderRadius: 50,
    height: 52,
    backgroundColor: theme.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: '700',
  },
});

export default ErrorScreen;
