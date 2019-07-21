import React, { useState } from 'react';

export interface SignInComponentProps {
  invalid: boolean;
  signIn: (username: string, password: string) => void;
  loading: boolean;
}
export const SignInComponent: React.FunctionComponent<SignInComponentProps> = (
  props: SignInComponentProps
) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div className='content'>
      <p>Please sign in with your account from the CSB homepage.</p>
      <div className='field'>
        <input
          disabled={props.loading}
          value={username}
          onChange={e => setUsername(e.target.value)}
          id='username'
          type='text'
          className={`input${props.invalid ? ' is-danger' : ''}`}
          placeholder='Username'
        />
      </div>
      <div className='field'>
        <input
          disabled={props.loading}
          value={password}
          onChange={e => setPassword(e.target.value)}
          type='password'
          id='password'
          className={`input${props.invalid ? ' is-danger' : ''}`}
          placeholder='Password'
        />
      </div>
      <button
        disabled={props.loading}
        className={`button is-fullwidth is-info${props.loading ? ' is-loading' : ''}`}
        onClick={() => props.signIn(username, password)}
      >
        Sign in
      </button>
    </div>
  );
};
