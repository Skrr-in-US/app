import {skrr} from '.';
import {authorization} from './authorization';

type CreateQuestionDto = {
  question: string;
  summary: string;
  imoji: string;
};

// question

export const createQuestion = async (query: CreateQuestionDto) => {
  const {data} = await skrr.post('/question', query, await authorization());
  return data;
};

export const getQuestion = async () => {
  const {data} = await skrr.get('/question', await authorization());
  return data;
};

export const updateQuestion = async (id: number) => {
  const {data} = await skrr.patch(`/question/${id}`);
  return data;
};

export const deleteQuestion = async (id: number) => {
  const {data} = await skrr.delete(`/question/${id}`);
  return data;
};

// alert

type CreateAlertDto = {
  receiveUser: number;
  summary: string;
  gender: string;
};

export const createAlert = async (query: CreateAlertDto) => {
  const {data} = await skrr.post('/alert', query, await authorization());
  return data;
};

export const getAlert = async () => {
  const {data} = await skrr.get('/alert', await authorization());
  return data;
};

export const getAlertDetail = async (id: number) => {
  const {data} = await skrr.get(`/alert/${id}`, await authorization());
  return data;
};
