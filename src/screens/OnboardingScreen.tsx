import React, {useEffect} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
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
import {useUser} from '../hooks/useUser';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Onboarding'>;
};

const OnboardingScreen: React.FC<Props> = ({navigation}) => {
  const {isLoggedIn} = useUser();
  const [signup, setSignup] = useAtom(signupAtom);
  const isTyping = !!signup.age;

  useEffect(() => {
    console.log('왜야ㅏㄴ디냐고');
    console.log(isLoggedIn);
    if (isLoggedIn) {
      navigation.navigate('Skrr');
    }
  }, [isLoggedIn, navigation]);

  const handleSignup = (ageText: string) => {
    const age = Number(ageText);

    if (!isNaN(age)) {
      setSignup(prev => ({...prev, age}));
    }
  };

  const handleSignin = () => {
    setSignup(prev => ({...prev, isLoginMode: true}));
    navigation.navigate('Age');
  };

  return (
    <KeyboardAvoidingView behavior="height">
      <SafeAreaView style={styles.container}>
        <Text onPress={handleSignin} style={styles.header}>
          Log In
        </Text>
        <Image
          style={styles.image}
          source={require('../assets/images/logo.png')}
        />
        <View style={styles.textBox}>
          <Text style={styles.ageText}>Enter your age</Text>
          <TextInput
            placeholder="Age"
            style={styles.input}
            onChangeText={handleSignup}
            value={String(signup.age)}
            placeholderTextColor={`${theme.white}88`}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            setSignup(prev => ({...prev, isLoginMode: false}));
            navigation.navigate('Grade');
          }}
          disabled={!isTyping}
          // eslint-disable-next-line react-native/no-inline-styles
          style={[styles.button, !isTyping && {opacity: 0.5}]}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </KeyboardAvoidingView>
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
    top: '7%',
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
  textBox: {
    gap: 20,
    alignItems: 'center',
  },
  ageText: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.white,
  },
});

export default OnboardingScreen;
