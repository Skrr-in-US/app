import React, {useState} from 'react';
import {
  Image,
  // Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useModal} from '../hooks/useModal';
import {theme} from '../styles/theme';
import LinearGradient from 'react-native-linear-gradient';
import WebView from 'react-native-webview';

// const continueUrl = 'https://lm4igjit2hy.typeform.com/to/zOL3cAxW';

const PaymentModal = () => {
  const [isClickedPayment, setIsClickedPayment] = useState(false);
  const {closeModal} = useModal();

  const handleContinueClick = async () => {
    setIsClickedPayment(prev => !prev);
    // console.log(handleClick);
    // handleClick();
    // setIsClickedContinue(prev => !prev);
    // const supported = await Linking.canOpenURL(continueUrl);
    // if (supported) {
    // await Linking.openURL(continueUrl);
    // }
  };

  return (
    <View style={styles.container}>
      {isClickedPayment ? (
        <>
          <TouchableOpacity
            onPress={closeModal}
            style={styles.backgroundModal}
          />
          <View style={styles.webview}>
            <WebView
              source={{uri: 'https://lm4igjit2hy.typeform.com/to/zOL3cAxW'}}
              javaScriptEnabled
              domStorageEnabled
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                zIndex: 80,
                borderRadius: 14,
              }}
            />
          </View>
        </>
      ) : (
        <>
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
              source={require('../assets/images/searchletter.png')}
            />
            <Text style={styles.perweek}>
              Reveal 10 Names{'\n'}Via Your Email
            </Text>
            <View style={styles.footer}>
              <LinearGradient
                colors={['#FAB500', '#F39E00']}
                start={{x: 0, y: 0}}
                end={{x: 0, y: 1}}
                style={styles.priceTag}>
                <Text style={styles.priceText}>FREE!</Text>
              </LinearGradient>
              <Text style={styles.priceAmount}>Submit your email👇</Text>
              <TouchableOpacity onPress={handleContinueClick}>
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
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  webview: {
    width: '86%',
    height: '86%',
    position: 'absolute',
  },
  backgroundModal: {
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
    height: '82%',
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
    fontWeight: '600',
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
