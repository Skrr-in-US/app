import {useAtom} from 'jotai';
import {userAtom} from '../context';
import {useQuery} from '@tanstack/react-query';
import {useEffect} from 'react';
import {query} from '../services/query';

export const useUser = () => {
  const [user, setUser] = useAtom(userAtom);
  const {data: userInfo} = useQuery(query.user());

  useEffect(() => {
    if (userInfo) {
      setUser(userInfo);
    }
  }, [setUser, userInfo]);

  return {
    user,
    isLoggedIn: !!userInfo,
  };
};
