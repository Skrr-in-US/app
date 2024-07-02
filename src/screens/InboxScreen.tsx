import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {theme} from '../styles/theme';
import {StackNavigationProp} from '@react-navigation/stack';
import RootStackParamList from '../types/RootStackParamList';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Inbox'>;
};

const InboxScreen: React.FC<Props> = ({navigation}) => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.inboxList}>
        {Array.from({length: 30}).map((_, index) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Detail')}
            style={styles.inboxItem}
            key={index}>
            <Image
              style={styles.diamonds}
              source={require('../assets/images/blue-diamonds.png')}
            />
            <Text style={styles.author}>From a boy</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.unlockBox}>
        <View style={styles.unlockButton}>
          <Text style={styles.unlockText}>🔒 See who likes you</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    height: '100%',
  },
  inboxList: {
    flex: 1,
    marginTop: 20,
    gap: 10,
    overflow: 'scroll',
    flexDirection: 'column',
    paddingHorizontal: 10,
  },
  inboxItem: {
    padding: 14,
    marginVertical: 10,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderRadius: 8,
    backgroundColor: theme.white,
    shadowColor: theme.shadow,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  diamonds: {
    width: 45,
    height: 45,
  },
  author: {
    fontSize: 18,
    fontWeight: '500',
  },
  unlockBox: {
    position: 'absolute',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    bottom: 20,
  },
  unlockButton: {
    width: '100%',
    height: 55,
    backgroundColor: theme.black,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: theme.black,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  unlockText: {
    color: theme.white,
    fontWeight: '700',
    fontSize: 18,
  },
});

export default InboxScreen;
