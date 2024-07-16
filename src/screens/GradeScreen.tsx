import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import RootStackParamList from '../types/RootStackParamList';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {theme} from '../styles/theme';
import {useSetAtom} from 'jotai';
import {signupAtom} from '../context';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Grade'>;
};

const GradeScreen: React.FC<Props> = ({navigation}) => {
  const setSignup = useSetAtom(signupAtom);

  const handleSetGrade = (grade: number) => {
    setSignup(prev => ({...prev, grade}));
    navigation.navigate('School');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.back}>
          <Image
            style={styles.image}
            source={require('../assets/images/arrow.png')}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>What grade are you in?</Text>
      </View>
      <View style={styles.body}>
        <TouchableOpacity
          onPress={() => handleSetGrade(-1)}
          style={styles.selectButtonTop}>
          <Text>Not in High School</Text>
        </TouchableOpacity>
        <View style={styles.selectOption}>
          <Text style={styles.selectOptionText}>HIGH SCHOOL</Text>
        </View>
        {[9, 10, 11, 12].map(option => (
          <TouchableOpacity
            onPress={() => handleSetGrade(option)}
            key={option}
            style={styles.selectButton}>
            <Text>Grade {option}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          onPress={() => handleSetGrade(-2)}
          style={styles.selectButton}>
          <Text>Finished High School</Text>
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
  },
  image: {
    width: 17,
    height: 17,
  },
  header: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingBottom: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.white,
  },
  back: {
    position: 'absolute',
    left: '6%',
    bottom: 22,
  },
  body: {
    flex: 8,
    width: '100%',
    height: '100%',
    backgroundColor: theme.white,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center',
  },
  selectButtonTop: {
    width: '100%',
    height: 63,
    borderTopWidth: 1,
    borderTopColor: theme.border,
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  selectButton: {
    width: '100%',
    height: 63,
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  selectOption: {
    width: '100%',
    height: 34,
    paddingLeft: 20,
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
    backgroundColor: theme.select,
    justifyContent: 'center',
  },
  selectOptionText: {
    fontWeight: '500',
    fontSize: 14,
    color: theme.selectText,
  },
});

export default GradeScreen;
