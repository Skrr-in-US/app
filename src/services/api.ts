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

export const getQuestion = async (except?: string) => {
  const {data} = await skrr.get('/question', {
    ...(await authorization()),
    params: {except},
  });
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

export const shuffleQuestion = async () => {
  const {data} = await skrr.get('/question/shuffle', await authorization());
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

// auth

export const requestSignup = async (signup: any) => {
  const {data} = await skrr.post('/auth', signup);
  return data;
};

export const requestSignin = async (signin: any) => {
  const {data} = await skrr.post('/auth/login', signin);
  return data;
};

export const getUser = async () => {
  const {data} = await skrr.get('/auth/user', await authorization());
  return data;
};
