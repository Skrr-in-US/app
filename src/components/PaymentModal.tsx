import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useModal} from '../hooks/useModal';
import {theme} from '../styles/theme';
import LinearGradient from 'react-native-linear-gradient';

const PaymentModal = () => {
  const {closeModal} = useModal();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={closeModal} style={styles.background} />
      <LinearGradient
        colors={['#040204', '#2D2B2D']}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        style={styles.modal}>
        <View style={styles.header}>
          <Text style={styles.title}>See who likes you</Text>
          <View style={styles.headerBox}>
            <Text style={styles.subtitle}>with</Text>
            <Text style={styles.godmode}>⚡️GOD MODE</Text>
          </View>
        </View>
        <Image
          style={styles.letter}
          source={require('../assets/images/letter.png')}
        />
        <Text style={styles.perweek}>Reveal 10 Names{'\n'}Per Week</Text>
        <View style={styles.footer}>
          <LinearGradient
            colors={['#FAB500', '#F39E00']}
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
            style={styles.priceTag}>
            <Text style={styles.priceText}>30% OFF</Text>
          </LinearGradient>
          <Text style={styles.priceAmount}>$4.99/week</Text>
          <TouchableOpacity>
            <LinearGradient
              colors={['#FFBA00', '#F68A00']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.continue}>
              <Text style={styles.priceAmount}>Continue</Text>
            </LinearGradient>
          </TouchableOpacity>
          <Text onPress={closeModal} style={styles.maybelater}>
            Maybe Later
          </Text>
        </View>
      </LinearGradient>
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
  modal: {
    width: '92%',
    height: '72%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 17,
    borderWidth: 2.4,
    borderColor: '#D68F24',
    shadowColor: '#D68F24',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
    paddingVertical: 30,
    gap: 20,
  },
  title: {
    fontSize: 27.6,
    fontWeight: '700',
    color: theme.white,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.white,
  },
  godmode: {
    fontSize: 20,
    fontWeight: '800',
    color: '#F99801',
    textShadowColor: '#F99801',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 6,
    elevation: 6,
  },
  header: {
    gap: 8,
    alignItems: 'center',
  },
  headerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  letter: {
    width: 184,
    height: 150,
  },
  perweek: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.white,
    textAlign: 'center',
    paddingVertical: 10,
  },
  footer: {
    alignItems: 'center',
    gap: 14,
  },
  priceTag: {
    width: 86,
    height: 28,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  priceText: {
    fontSize: 13,
    fontWeight: '800',
  },
  priceAmount: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.white,
  },
  continue: {
    width: 240,
    height: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  maybelater: {
    fontSize: 16,
    fontWeight: '600',
    color: '#767676',
  },
});

export default PaymentModal;
