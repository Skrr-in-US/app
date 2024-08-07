import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {theme} from '../styles/theme';
import {useModal} from '../hooks/useModal';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LeaveModal = ({navigation}: any) => {
  const [isClicked, setIsClicked] = useState(false);
  const {closeModal} = useModal();

  const handleLeaveSkrr = async () => {
    if (!isClicked) {
      return setIsClicked(true);
    }
    await AsyncStorage.removeItem('@token');
    navigation.navigate('Onboarding');
    closeModal();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={closeModal} style={styles.background} />
      <View style={styles.box}>
        <Image
          style={styles.leaveEmoji}
          source={require('../assets/images/leave2.png')}
        />
        <Text style={styles.title}>
          {!isClicked
            ? 'Leaving Skrr?'
            : 'Are you sure you want to\nleave Skrr?'}
        </Text>
        <Text style={styles.description}>
          {!isClicked
            ? "Your voting history and friends'\nselections will be permanently deleted."
            : 'If you press the Yes button, your Skrr\naccount will be deleted and the related\ndata cannot be recovered.'}
        </Text>
        <TouchableOpacity onPress={closeModal} style={styles.button}>
          <Text style={styles.buttonText}>Keep Using Skrr</Text>
        </TouchableOpacity>
        <Text onPress={handleLeaveSkrr} style={styles.leave}>
          {!isClicked ? 'Leave Skrr' : 'Yes'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  container: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 50,
    backgroundColor: theme.gray,
  },
  box: {
    width: '92%',
    height: '56%',
    backgroundColor: theme.white,
    borderRadius: 20,
    alignItems: 'center',
    padding: 20,
    justifyContent: 'space-between',
  },
  leaveEmoji: {
    width: 110,
    height: 110,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '700',
  },
  description: {
    fontSize: 16,
    fontWeight: '500',
    color: '#787C90',
    textAlign: 'center',
  },
  button: {
    width: 250,
    height: 56,
    borderRadius: 8,
    backgroundColor: '#3C67FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: theme.white,
    fontWeight: '700',
    fontSize: 16,
  },
  leave: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
    color: '#B4B7C6',
  },
});

export default LeaveModal;
