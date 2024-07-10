import {useSetAtom} from 'jotai';
import {modalAtom} from '../context';
import {useCallback} from 'react';

export const useModal = () => {
  const setModal = useSetAtom(modalAtom);

  const openModal = useCallback(
    ({component}: any) => {
      setModal({component, visible: true});
    },
    [setModal],
  );

  const closeModal = useCallback(() => {
    setModal({component: null, visible: false});
  }, [setModal]);

  return {openModal, closeModal};
};
