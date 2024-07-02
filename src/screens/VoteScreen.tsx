import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {theme} from '../styles/theme';

const VoteScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.wrap}>
        <Text style={styles.questionProcess}>2 of 12</Text>
        <View style={styles.questionBox}>
          <Image source={require('../assets/images/face.png')} />
          <Text style={styles.questionText}>
            always sends the best meme at{'\n'} perfect moment
          </Text>
        </View>
        <View style={styles.column}>
          <FlatList
            style={styles.answerBox}
            data={[
              'Anna Grace Smith',
              'Sam Altman',
              'Hailey Maclhow',
              'Anna Grade Smith',
            ]}
            renderItem={render => (
              <TouchableOpacity style={styles.answerItem}>
                <Text style={styles.answerText}>{render.item}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.toString()}
            numColumns={2} // Number of columns in the grid
          />
          <Text style={styles.continue}>Tap to continue</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flex: 1,
    backgroundColor: theme.quiz.purple,
    paddingTop: 65,
  },
  wrap: {
    width: '100%',
    height: '100%',
    borderTopColor: theme.white,
    borderTopWidth: 1,
    padding: 30,
    alignItems: 'center',
    gap: 60,
  },
  questionProcess: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.white,
  },
  questionBox: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionText: {
    fontWeight: '500',
    fontSize: 22,
    color: theme.question,
    textAlign: 'center',
  },
  answerBox: {
    width: '100%',
    flexGrow: 0,
  },
  answerItem: {
    margin: 4,
    width: 150,
    height: 62,
    backgroundColor: theme.white,
    borderRadius: 6.8,
    flexShrink: 0,
    flexBasis: 150,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  answerText: {
    fontWeight: '600',
    fontSize: 17,
    color: theme.black,
  },
  column: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  continue: {
    fontWeight: '600',
    fontSize: 17,
    color: theme.white,
  },
});

export default VoteScreen;
