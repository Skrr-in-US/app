import {atom} from 'jotai';

export const signupAtom = atom({
  school: '',
  grade: 0,
  firstName: '',
  lastName: '',
  gender: '',
  age: '' as unknown as number,
  password: '',
  isLoginMode: false,
});

export const voteAtom = atom({
  step: 1,
});

export const modalAtom = atom({
  component: null,
  visible: false,
});

export const isNeedInviteAtom = atom(false);

export const userAtom = atom([] as any);

export const colorAtom = atom([] as any);
