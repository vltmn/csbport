import React from 'react';
import { Hero } from '/components/Hero';
import { Open } from '/containers/Open';

interface OpenPageProps {
  match: {
    params: {
      id: string;
    };
  };
}
export const OpenPage: React.FunctionComponent<OpenPageProps> = props => {
  const id = props.match.params.id;
  return (
    <Hero color='is-info'>
      <h1 className='title'>Open port</h1>
      <div className='columns is-centered'>
        <div className='column is-half'>
          <div className='box'>
            <Open id={id} />
          </div>
        </div>
      </div>
    </Hero>
  );
};
