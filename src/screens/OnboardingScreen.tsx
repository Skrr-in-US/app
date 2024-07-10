import React, {useEffect} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import RootStackParamList from '../types/RootStackParamList';
import {theme} from '../styles/theme';
import {useAtom} from 'jotai';
import {signupAtom} from '../context';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Onboarding'>;
};

const OnboardingScreen: React.FC<Props> = ({navigation}) => {
  const [signup, setSignup] = useAtom(signupAtom);

  const handleSignup = (ageText: string) => {
    const age = Number(ageText);

    if (!isNaN(age)) {
      setSignup(prev => ({...prev, age}));
    }
  };

  useEffect(() => {
    (async () => {
      if (await AsyncStorage.getItem('token')) {
        navigation.navigate('Skrr');
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Log In</Text>
      <Image
        style={styles.image}
        source={require('../assets/images/logo.png')}
      />
      <TextInput
        placeholder="Enter your age"
        style={styles.input}
        onChangeText={handleSignup}
        value={String(signup.age)}
        placeholderTextColor={`${theme.white}88`}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate('Grade')}
        style={[styles.button]}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.dark,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 40,
  },
  image: {width: 250, height: 116},
  button: {
    width: 350,
    height: 55,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.primary,
  },
  input: {
    fontWeight: '400',
    fontSize: 28,
    color: theme.white,
  },
  buttonText: {
    fontWeight: '700',
    fontSize: 18,
    color: theme.white,
  },
  header: {
    position: 'absolute',
    right: 14,
    top: 30,
    fontWeight: '400',
    fontSize: 18,
    color: theme.white,
  },
  pickerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerDevider: {
    borderColor: 'rgba(0,0,0,0.1)',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  pickerItemLabel: {
    color: '#000000',
    fontSize: 25,
  },
});

export default OnboardingScreen;
