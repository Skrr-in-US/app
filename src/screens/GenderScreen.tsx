import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import RootStackParamList from '../types/RootStackParamList';
import {theme} from '../styles/theme';
import {useSetAtom} from 'jotai';
import {signupAtom} from '../context';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Gender'>;
};

const genderList = [
  {name: 'Boy', src: require('../assets/images/Boy.png')},
  {name: 'Girl', src: require('../assets/images/Girl.png')},
  {name: 'Non-binary', src: require('../assets/images/Non-binary.png')},
];

const GenderScreen: React.FC<Props> = ({navigation}) => {
  const setSignup = useSetAtom(signupAtom);
  const handleSetGender = (gender: string) => {
    setSignup(prev => ({...prev, gender}));
    navigation.navigate('Notice');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>What’s your gender?</Text>
      <View style={styles.genderList}>
        {genderList.map(gender => (
          <TouchableOpacity
            key={gender.name}
            onPress={() => handleSetGender(gender.name)}
            style={styles.genderWrap}>
            <View style={styles.genderBox}>
              <Image
                // eslint-disable-next-line react-native/no-inline-styles
                style={{width: 75, height: 75}}
                source={gender.src}
              />
            </View>
            <Text style={styles.genderText}>{gender.name}</Text>
          </TouchableOpacity>
        ))}
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
    color: theme.white,
  },
  button: {
    bottom: 30,
    position: 'absolute',
    width: 350,
    height: 55,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.white,
  },
  buttonText: {
    fontWeight: '600',
    fontSize: 18,
    color: theme.black,
  },
  header: {
    position: 'absolute',
    right: 14,
    top: 30,
    fontWeight: '400',
    fontSize: 18,
    color: theme.white,
  },
  input: {
    fontWeight: '400',
    fontSize: 28,
    color: theme.white,
  },
  genderList: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  genderWrap: {
    gap: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  genderText: {
    fontSize: 16,
    fontWeight: '500',
    color: theme.white,
  },
  genderBox: {
    width: 130,
    height: 130,
    borderRadius: 10,
    backgroundColor: `${theme.white}55`,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GenderScreen;
