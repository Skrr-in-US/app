import {queryOptions} from '@tanstack/react-query';
import {getAlert, getAlertDetail, getQuestion, getSchool, getUser} from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const query = {
  question: (except?: string) =>
    queryOptions({
      queryKey: ['question', except],
      queryFn: () => getQuestion(except),
    }),
  alert: () =>
    queryOptions({
      queryKey: ['alert'],
      queryFn: getAlert,
    }),
  alertDetail: (id: number) =>
    queryOptions({
      queryKey: ['alertDetail', id],
      queryFn: () => getAlertDetail(id),
    }),
  user: () =>
    queryOptions({
      queryKey: ['user'],
      queryFn: getUser,
      enabled: !!(async () => await AsyncStorage.getItem('@token'))(),
    }),
  school: (keyword: string) =>
    queryOptions({
      queryKey: ['school'],
      queryFn: () => getSchool(keyword),
    }),
};
