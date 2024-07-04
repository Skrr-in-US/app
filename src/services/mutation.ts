import {useMutation} from '@tanstack/react-query';
import {
  createAlert,
  createQuestion,
  deleteQuestion,
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
