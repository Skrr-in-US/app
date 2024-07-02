import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {theme} from '../styles/theme';

const HeaderRightButton = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Gas</Text>
    </View>
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

export default HeaderRightButton;
