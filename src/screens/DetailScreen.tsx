import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {theme} from '../styles/theme';
import LinearGradient from 'react-native-linear-gradient';

const DetailScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.wrap}>
        <Image source={require('../assets/images/Girl.png')} />
        <Text style={styles.author}>
          From a girl
          {'\n'}
          in 12th grade
        </Text>
        <Text style={styles.question}>
          the one your parents think{'\n'}
          is good but is secretly bad
        </Text>
        <View style={styles.authorBox}>
          <View style={styles.authorButton}>
            <Text style={styles.authorText}>Anna Grace Smith</Text>
          </View>
          <Image
            style={styles.authorEmoji}
            source={require('../assets/images/backhand.png')}
          />
        </View>
        <Text style={styles.noticeText}>Skrr app on appstore</Text>
        <TouchableOpacity style={styles.share}>
          <LinearGradient
            colors={[
              '#ECCD60',
              '#FAA85C',
              '#F78458',
              '#F56C7F',
              '#FF3879',
              '#FF37D2',
            ]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.gradient}>
            <Text style={styles.shareText}>Share!</Text>
            <Image
              style={styles.shareEmoji}
              source={require('../assets/images/instagram.png')}
            />
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.unlockButton}>
          <Text style={styles.unlockText}>🔒 See who sent it</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingTop: 48,
    backgroundColor: theme.black,
  },
  wrap: {
    flex: 10,
    width: '100%',
    backgroundColor: theme.quiz.pink,
    borderRadius: 12,
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: 14,
    gap: 26,
  },
  personImage: {
    width: 60,
    height: 60,
  },
  author: {
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 17,
    color: theme.white,
  },
  question: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.white,
  },
  authorBox: {
    position: 'relative',
  },
  authorButton: {
    width: 150,
    height: 62,
    backgroundColor: theme.white,
    borderRadius: 6.8,
    shadowColor: theme.black,
    shadowOpacity: 0.25,
    shadowOffset: {width: 3, height: 4},
    shadowRadius: 4,
    elevation: 4,
    padding: 14,
    flexShrink: 0,
    flexBasis: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  authorText: {
    fontWeight: '600',
    fontSize: 17,
  },
  authorEmoji: {
    position: 'absolute',
    width: 88,
    height: 88,
    top: -44,
    right: -60,
  },
  noticeText: {
    color: theme.white,
    fontWeight: '700',
    fontSize: 17,
  },
  footer: {
    flex: 2,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  share: {
    width: '100%',
    height: 58,
    marginTop: 'auto',
    marginBottom: 20,
    borderRadius: 28,
    shadowColor: theme.black,
    shadowOpacity: 0.5,
    shadowOffset: {width: 2, height: 4},
    shadowRadius: 4,
    elevation: 4,
  },
  shareText: {
    fontSize: 17,
    fontWeight: '700',
    color: theme.white,
  },
  shareEmoji: {
    position: 'absolute',
    right: 20,
  },
  gradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 28,
  },
  unlockButton: {
    width: '100%',
    height: 55,
    backgroundColor: theme.grey,
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
  button: {
    width: '100%',
    height: 58,
  },
});

export default DetailScreen;
