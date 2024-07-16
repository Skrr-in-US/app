import React from 'react';
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

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'LastName'>;
};

const LastNameScreen: React.FC<Props> = ({navigation}) => {
  const [signup, setSignup] = useAtom(signupAtom);
  const isTyping = !!signup.lastName.length;

  const handleNextStep = () => {
    if (signup.isLoginMode) {
      // 로그인 중이면
      return navigation.navigate('Password');
    }
    // 회원가입 중이면
    return navigation.navigate('Gender');
  };

  return (
    <KeyboardAvoidingView behavior="height">
      <SafeAreaView style={styles.container}>
        {isTyping && (
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                style={styles.image}
                source={require('../assets/images/arrow.png')}
              />
            </TouchableOpacity>
          </View>
        )}
        <Text style={styles.question}>What’s your last name?</Text>
        <TextInput
          placeholder="Last Name"
          style={styles.input}
          onChangeText={text => setSignup(prev => ({...prev, lastName: text}))}
          value={signup.lastName}
          placeholderTextColor={`${theme.white}88`}
        />
        <TouchableOpacity
          disabled={!isTyping}
          onPress={handleNextStep}
          // eslint-disable-next-line react-native/no-inline-styles
          style={[styles.button, !isTyping && {opacity: 0.5}]}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </KeyboardAvoidingView>
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
  image: {
    width: 17,
    height: 17,
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
    left: '6%',
    top: '8%',
    fontWeight: '400',
    fontSize: 18,
    color: theme.white,
  },
  input: {
    fontWeight: '400',
    fontSize: 28,
    color: theme.white,
  },
});

export default LastNameScreen;
