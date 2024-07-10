import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {theme} from '../styles/theme';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {StackNavigationProp} from '@react-navigation/stack';
import RootStackParamList from '../types/RootStackParamList';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Description'>;
};

const DescriptionScreen: React.FC<Props> = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerWelcome}>WELCOME TO</Text>
        <Text style={styles.headerTitle}>SKRR</Text>
      </View>
      <Image
        // eslint-disable-next-line react-native/no-inline-styles
        style={{width: 330, height: 315}}
        source={require('../assets/images/description.png')}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate('Skrr')}
        style={styles.button}>
        <Text style={styles.buttonText}>Start</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    paddingVertical: 80,
    backgroundColor: theme.white,
    gap: 50,
  },
  header: {
    gap: 4,
    alignItems: 'center',
  },
  headerWelcome: {
    fontSize: 20,
    fontWeight: '700',
  },
  headerTitle: {
    fontWeight: '700',
    fontSize: 45,
    color: theme.primary,
  },
  button: {
    width: 350,
    height: 55,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.primary,
  },
  buttonText: {
    fontWeight: '700',
    fontSize: 18,
    color: theme.white,
  },
});

export default DescriptionScreen;
