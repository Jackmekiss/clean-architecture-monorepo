import React, { useEffect, useRef, useState } from 'react';
import { useAddMessageMutation } from '../../../app';
import LoginModal, { LoginModalRef } from '../../Login/LoginModal';

function ChatInput() {
  const loginModalRef = useRef<LoginModalRef>(null);
  const [addMessage, { isError, isLoading }] = useAddMessageMutation();
  const [value, setValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!value) return;
    addMessage({ content: value });
    setValue('');
  };

  useEffect(() => {
    if (isError) {
      loginModalRef.current?.open();
    }
  }, [isLoading]);

  return (
    <>
      <div className="flex h-[150px]">
        <form
          onSubmit={handleSubmit}
          className="flex flex-row gap-4 lg:gap-8 w-full items-center"
        >
          <textarea
            className="textarea textarea-primary w-full"
            placeholder="Aa..."
            value={value}
            onChange={handleChange}
          />
          <button type="submit" className="btn btn-primary">
            Send
          </button>
        </form>
      </div>
      <LoginModal ref={loginModalRef} />
    </>
  );
}

export default ChatInput;
