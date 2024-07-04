import {queryOptions} from '@tanstack/react-query';
import {getAlert, getAlertDetail, getQuestion} from './api';

export const query = {
  question: () =>
    queryOptions({
      queryKey: ['question'],
      queryFn: getQuestion,
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
};
