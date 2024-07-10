import {atom} from 'jotai';

export const signupAtom = atom({
  school: '',
  grade: 0,
  firstName: '',
  lastName: '',
  gender: '',
  age: 0,
  password: '',
});

export const voteAtom = atom({
  step: 1,
});

export const modalAtom = atom({
  component: null,
  visible: false,
});

export const userAtom = atom({});
