import {
  forwardRef, useEffect, useImperativeHandle, useRef,
} from 'react';
import { useSelector } from 'react-redux';
import { selectToken, selectIsConnected, selectAccount } from '@core/account/adapters/selectors/accountSelectors';
import { useLazyRetrieveAccountQuery, useRegisterAccountMutation } from '../../../app';

interface Props {}

export interface LoginModalRef {
  open: () => void;
}

const LoginModal = forwardRef((props: Props, ref) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const { data } = useSelector(selectToken);
  const isConnected = useSelector(selectIsConnected);
  const { data: account } = useSelector(selectAccount);
  const [registerAccount, { isSuccess }] = useRegisterAccountMutation();
  const [retrieveAccount] = useLazyRetrieveAccountQuery();

  const handleOnLogin = () => {
    registerAccount({ googleToken: 'fake' });
  };

  useEffect(() => {
    if (isConnected && isSuccess) {
      modalRef.current?.close();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (!account && data) {
      retrieveAccount();
    }
  }, [data]);

  useImperativeHandle(ref, () => ({
    open: () => {
      modalRef.current?.showModal();
    },
  }));

  return (
    <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
      <form method="dialog" className="modal-box">
        <h3 className="font-bold text-lg">Hello!</h3>
        <p className="py-4">You need to be connected to perform this action!</p>
        <button onClick={handleOnLogin} className="btn w-full btn-outline btn-primary">Continue</button>
      </form>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
});

export default LoginModal;
