import {useMutation} from '@tanstack/react-query';
import {
  createAlert,
  createQuestion,
  deleteQuestion,
  refreshFcd,
  requestSignin,
  requestSignup,
  requestSupport,
  shuffleQuestion,
  updateQuestion,
} from './api';

export const useCreateQuestionMutation = () => {
  return useMutation({
    mutationFn: createQuestion,
  });
};

export const useUpdateQuestionMutation = () => {
  return useMutation({
    mutationFn: updateQuestion,
  });
};

export const useDeleteQuestionMutation = () => {
  return useMutation({
    mutationFn: deleteQuestion,
  });
};

export const useCreateAlert = () => {
  return useMutation({
    mutationFn: createAlert,
  });
};

export const useSignup = () => {
  return useMutation({
    mutationFn: requestSignup,
  });
};

export const useSignin = () => {
  return useMutation({
    mutationFn: requestSignin,
  });
};

export const useShuffleQuestion = () => {
  return useMutation({
    mutationFn: shuffleQuestion,
  });
};

export const useSupport = () => {
  return useMutation({
    mutationFn: requestSupport,
  });
};

export const useRefreshFcdToken = () => {
  return useMutation({
    mutationFn: refreshFcd,
  });
};
