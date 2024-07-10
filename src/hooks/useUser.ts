import {useAtom} from 'jotai';
import {userAtom} from '../context';
import {useQuery} from '@tanstack/react-query';
import {useEffect} from 'react';

export const useUser = () => {
  const [user, setUser] = useAtom(userAtom);

  const {data: userInfo} = useQuery({
    queryKey: ['user'],
    // queryFn: getMyInformation,
    // enabled: !!Storage.getItem(TOKEN.ACCESS),
  });

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
