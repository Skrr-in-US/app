import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import RootStackParamList from '../types/RootStackParamList';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Skrr'>;
  color: string;
};

const HeaderSupportButton = ({navigation, color}: Props) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('About')}
      style={styles.container}>
      <Text style={{...styles.text, color}}>About</Text>
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
  },
});

export default HeaderSupportButton;
