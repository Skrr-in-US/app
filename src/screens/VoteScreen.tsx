import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Share,
} from 'react-native';
import {theme} from '../styles/theme';
import {useQuery} from '@tanstack/react-query';
import {query} from '../services/query';
import {useAtom} from 'jotai';
import {colorAtom, isNeedInviteAtom, voteAtom} from '../context';
import {useCreateAlert, useShuffleQuestion} from '../services/mutation';
import {useUser} from '../hooks/useUser';
import {WebView} from 'react-native-webview';
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
  const [isNeedInvite, setIsNeedInvite] = useAtom(isNeedInviteAtom);
  const [except, setExcept] = useState('');
  const [isVoted, setIsVoted] = useState(0);
  const [isShuffled, setIsShuffled] = useState(0);
  const {mutateAsync: shuffle} = useShuffleQuestion();
  const {data, refetch} = useQuery(query.question(except));
  const {user: userData} = useUser();
  const [userList, setUserList] = useState([] as any);
  const {mutateAsync} = useCreateAlert();
  const [backgroundColor, setBackgroundColor] = useAtom(colorAtom);

  console.log(data);

  useEffect(() => {
    if (!backgroundColor.length) {
      setBackgroundColor(backgroundColorList);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setBackgroundColor]);

  const handleVote = async (user: any) => {
    await mutateAsync({
      receiveUser: user.id,
      summary: data.question.summary,
      question: data.question.question,
      gender: userData[0].gender,
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
    setIsShuffled(0);
  };

  const shuffleVote = async () => {
    setUserList(await shuffle());
    setIsShuffled(prev => prev + 1);
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
    if (data?.isLock) {
      return setIsNeedInvite(true);
    }
    setIsNeedInvite(false);
    setUserList(data?.users);
  }, [data, setIsNeedInvite]);

  return isNeedInvite ? (
    <InviteView
      people={data?.people}
      school={data?.school}
      refresh={() => refetch()}
    />
  ) : (
    <>
      {!!isVoted && (
        <TouchableOpacity onPress={nextVote} style={styles.continueClick} />
      )}
      <View
        style={[
          styles.container,
          {backgroundColor: backgroundColor[vote.step - 1]},
        ]}>
        <View style={styles.wrap}>
          <Text style={styles.questionProcess}>{vote.step} of 12</Text>
          <View style={styles.questionBox}>
            <View style={styles.emojiWrap}>
              {data && (
                <WebView
                  source={{uri: data?.question?.imoji}}
                  javaScriptEnabled={true}
                  domStorageEnabled={true}
                  style={styles.emoji}
                />
              )}
            </View>
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
            {!!isVoted && (
              <View style={styles.continue}>
                <Text style={styles.continueText}>Tap to continue</Text>
              </View>
            )}
            {isShuffled < 7 && !isVoted && generateShuffleButton()}
            {isShuffled >= 7 && !isVoted && (
              <View style={styles.shuffleBlank} />
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
    paddingTop: '10%',
  },
  emojiWrap: {
    height: 240,
  },
  emoji: {
    width: 240,
    height: 100,
    backgroundColor: 'transparent',
  },
  wrap: {
    width: '100%',
    height: '100%',
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
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
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  continue: {
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueText: {
    fontWeight: '600',
    fontSize: 17,
    color: theme.white,
  },
  shuffleBlank: {
    width: 3,
    height: 28,
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

const InviteView = ({
  people,
  school,
  refresh,
}: {
  people: number;
  school: string;
  refresh: () => any;
}) => {
  const handleShareClick = async () => {
    await Share.share({
      message: 'Skrr | We can start if you come!',
    });
  };

  return (
    <View style={inviteStyles.container}>
      <View style={inviteStyles.main}>
        <Image
          // eslint-disable-next-line react-native/no-inline-styles
          style={{width: 140, height: 140}}
          source={require('../assets/images/loveletter_move.gif')}
        />
        <Text style={inviteStyles.title}>
          {`Your school needs ${5 - people} more\nmember to use Skrr`}
        </Text>
        <Text
          style={
            inviteStyles.friendText
          }>{`4 of 5 members from ${school} are now on Skrr`}</Text>
        <View style={inviteStyles.peopleBox}>
          <TouchableOpacity onPress={refresh} style={inviteStyles.refreshBox}>
            <Image
              // eslint-disable-next-line react-native/no-inline-styles
              style={{width: 13, height: 13}}
              source={require('../assets/images/refresh.png')}
            />
            <Text style={inviteStyles.refreshText}>Refresh</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        onPress={handleShareClick}
        style={inviteStyles.shareButton}>
        <Image
          style={inviteStyles.sms}
          source={require('../assets/images/sms.png')}
        />
        <Text style={inviteStyles.shareButtonText}>Invite a friend</Text>
      </TouchableOpacity>
    </View>
  );
};

const inviteStyles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 50,
  },
  main: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
  },
  friendText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    color: '#5E5E5E',
  },
  friendCount: {
    fontSize: 20,
    fontWeight: '700',
  },
  shareButton: {
    width: '80%',
    height: 54,
    borderRadius: 60,
    backgroundColor: theme.white,
    shadowColor: theme.shadow,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 16,
    elevation: 16,
    shadowOpacity: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareButtonText: {
    fontSize: 17,
    fontWeight: '700',
  },
  sms: {
    width: 24,
    height: 24,
    position: 'absolute',
    left: '8%',
  },
  peopleBox: {
    gap: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  refreshBox: {
    gap: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  refreshText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#939393',
  },
});
