import React, {useState} from 'react';
import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {theme} from '../styles/theme';
import {StackNavigationProp} from '@react-navigation/stack';
import RootStackParamList from '../types/RootStackParamList';
import {useQuery} from '@tanstack/react-query';
import {query} from '../services/query';
import {useModal} from '../hooks/useModal';
import PaymentModal from '../components/PaymentModal';
import {track} from '@amplitude/analytics-react-native';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Inbox'>;
};

const InboxScreen: React.FC<Props> = ({navigation}) => {
  const {openModal} = useModal();
  const {data, isSuccess, refetch} = useQuery(query.alert());
  const [refreshing, setRefreshing] = useState(false);

  const handleOpenPaymentModal = () => {
    openModal({component: <PaymentModal />});
  };

  const handleRefresh = React.useCallback(() => {
    setRefreshing(true);
    track('handleRefresh', {...data});
    setTimeout(() => {
      setRefreshing(false);
      refetch();
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        style={styles.inboxList}>
        {isSuccess &&
          data.map((inbox: any) => {
            const imageSource = (() => {
              switch (inbox.gender) {
                case 'boy':
                  return require('../assets/images/blue-diamonds.png');
                case 'girl':
                  return require('../assets/images/red-diamonds.png');
                case 'non-binary':
                  return require('../assets/images/blue-diamonds.png');
              }
            })();
            return (
              <TouchableOpacity
                onPress={() => {
                  track('clickInboxDetail', {...data, ...inbox});
                  navigation.navigate('Detail', {id: inbox.id});
                }}
                style={styles.inboxItem}
                key={inbox.id}>
                <Image style={styles.diamonds} source={imageSource} />
                <Text style={styles.author}>From a {inbox.gender}</Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
      <TouchableOpacity
        onPress={handleOpenPaymentModal}
        style={styles.unlockBox}>
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
    bottom: '5%',
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
