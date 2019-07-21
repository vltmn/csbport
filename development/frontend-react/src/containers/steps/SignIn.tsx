import React, { useState } from 'react';
import { StepComponentProps } from 'containers/Wizard';
import { PickDoorInput } from './PickDoor';
import { SignInComponent } from '/components/SignIn';
import { getPubKey, getDoors } from '/services/api';

export const SignIn: React.FunctionComponent<
  StepComponentProps<void, PickDoorInput>
> = props => {
  const [loading, setLoading] = useState(false);
  const [invalid, setInvalid] = useState(false);

  const signInRequest = async (username: string, password: string): Promise<PickDoorInput> => {
    const pubKey = (await getPubKey()).data;
    const doors = (await getDoors(username, password, pubKey)).data;
    return {doors, username, password, serverPubKey: pubKey};
  };
  const signIn = (username: string, password: string) => {
    setLoading(true);
    signInRequest(username, password)
      .then(d => {
        setLoading(false);
        props.onCompleted(d);
      })
      .catch(err => {
        setLoading(false);
        setInvalid(true);
      });
  };
  return (
    <SignInComponent invalid={invalid} loading={loading} signIn={signIn} />
  );
};
