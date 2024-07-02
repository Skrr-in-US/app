import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {theme} from '../styles/theme';
import {StackNavigationProp} from '@react-navigation/stack';
import RootStackParamList from '../types/RootStackParamList';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Inbox'>;
  color: string;
};

const HeaderVoteButton = ({navigation, color}: Props) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Vote')}
      style={styles.container}>
      <Text style={{...styles.text, color}}>Gas</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: '800',
    color: theme.gray,
  },
});

export default HeaderVoteButton;
