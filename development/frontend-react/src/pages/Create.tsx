import React from 'react';
import { Hero } from '/components/Hero';
import { Wizard, Step } from '/containers/Wizard';
import { SignIn } from '/containers/steps/SignIn';
import { PickDoor } from '/containers/steps/PickDoor';
import { LinkCreated } from '/containers/steps/LinkCreated';

const wizardSteps: Step<any, any>[] = [SignIn, PickDoor, LinkCreated].map(d => ({
    component: d
}));
export const CreatePage: React.FunctionComponent = () => (
  <Hero color='is-primary'>
    <h1 className='title'>Create a new Port request</h1>
    <div className='columns is-centered'>
      <div className='column is-half'>
        <div className='box' >
            <Wizard steps={wizardSteps} />
        </div>
      </div>
    </div>
  </Hero>
);