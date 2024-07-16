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
  navigation: StackNavigationProp<RootStackParamList, 'FirstName'>;
};

const FirstNameScreen: React.FC<Props> = ({navigation}) => {
  const [signup, setSignup] = useAtom(signupAtom);
  const isTyping = !!signup.firstName.length;

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
        <Text style={styles.question}>What’s your first name?</Text>
        <TextInput
          placeholder="First Name"
          style={styles.input}
          onChangeText={text => setSignup(prev => ({...prev, firstName: text}))}
          value={signup.firstName}
          placeholderTextColor={`${theme.white}88`}
        />
        <TouchableOpacity
          disabled={!isTyping}
          onPress={() => navigation.navigate('LastName')}
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

export default FirstNameScreen;
