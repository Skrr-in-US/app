import AsyncStorage from '@react-native-async-storage/async-storage';

export const authorization = async () => ({
  headers: {
    Authorization: await AsyncStorage.getItem('@access_token'),
  },
});
