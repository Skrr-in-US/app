import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {theme} from '../styles/theme';
import {useQuery} from '@tanstack/react-query';
import {query} from '../services/query';
import {useAtom} from 'jotai';
import {voteAtom} from '../context';
import {useCreateAlert, useShuffleQuestion} from '../services/mutation';
import {shuffleArray} from '../utils/shuffleArray';

const backgroundColorList = shuffleArray([
  '#8E34FF',
  '#E95FE4',
  '#4E7CF2',
  '#F27F4E',
  '#32C08C',
  '#85CD11',
  '#11ABCD',
  '#6F8DA4',
  '#885851',
  '#555555',
  '#F35252',
  '#F0AF31',
]);

const VoteScreen = () => {
  const [vote, setVote] = useAtom(voteAtom);
  const [except, setExcept] = useState('');
  const [isVoted, setIsVoted] = useState(0);
  const {mutateAsync: shuffle} = useShuffleQuestion();
  const {data} = useQuery(query.question(except));
  const [userList, setUserList] = useState([] as any);
  const {mutate} = useCreateAlert();

  const handleVote = (user: any) => {
    mutate({
      receiveUser: user.id,
      summary: data.question.summary,
      gender: user.gender,
    });
    setIsVoted(user.id);
  };

  const nextVote = () => {
    if (vote.step >= 12) {
      setIsVoted(0);
      setExcept(String(data.question.id));
      return setVote(prev => ({...prev, step: 1}));
    }
    setVote(prev => ({...prev, step: prev.step + 1}));
    setIsVoted(0);
    setExcept(String(data.question.id));
  };

  const shuffleVote = async () => {
    setUserList(await shuffle());
  };

  const generateShuffleButton = () => {
    return (
      <TouchableOpacity onPress={shuffleVote} style={styles.shuffleButton}>
        <Image
          style={styles.shuffle}
          width={30}
          height={30}
          source={require('../assets/images/shuffle.png')}
        />
        <Text style={styles.shuffleText}>Shuffle</Text>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    setUserList(data?.users);
  }, [data]);

  return (
    <>
      {!!isVoted && (
        <TouchableOpacity onPress={nextVote} style={styles.continueClick} />
      )}
      <View
        style={[
          styles.container,
          {backgroundColor: backgroundColorList[vote.step - 1]},
        ]}>
        <View style={styles.wrap}>
          <Text style={styles.questionProcess}>{vote.step} of 12</Text>
          <View style={styles.questionBox}>
            <Image
              alt={data?.question?.summary}
              source={{
                uri: data?.question?.imoji,
              }}
              width={140}
              height={140}
            />
            <Text style={styles.questionText}>{data?.question?.question}</Text>
          </View>
          <View style={styles.column}>
            <FlatList
              style={styles.answerBox}
              data={userList}
              renderItem={render => (
                <TouchableOpacity
                  onPress={() => handleVote(render.item)}
                  style={[
                    styles.answerItem,
                    !!isVoted &&
                      // eslint-disable-next-line react-native/no-inline-styles
                      isVoted !== render.item.id && {opacity: 0.5},
                  ]}>
                  <Text style={styles.answerText}>{render.item.name}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={item => item.id}
              numColumns={2} // Number of columns in the grid
            />
            {isVoted ? (
              <Text style={styles.continue}>Tap to continue</Text>
            ) : (
              generateShuffleButton()
            )}
          </View>
        </View>
      </View>
    </>
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
    gap: 30,
  },
  questionProcess: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.white,
  },
  questionBox: {
    gap: 16,
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
    height: 28,
    fontWeight: '600',
    fontSize: 17,
    color: theme.white,
  },
  shuffleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  shuffle: {
    width: 28,
    height: 28,
  },
  shuffleText: {
    color: theme.white,
    fontSize: 17,
    fontWeight: '500',
  },
  continueClick: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 20,
  },
});

export default VoteScreen;
