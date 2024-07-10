import {queryOptions} from '@tanstack/react-query';
import {getAlert, getAlertDetail, getQuestion} from './api';

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
};
