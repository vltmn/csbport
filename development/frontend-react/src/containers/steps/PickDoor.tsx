import { Door, createRequest } from '/services/api';
import { StepComponentProps } from '/containers/Wizard';
import { LinkCreatedInput } from './LinkCreated';
import { useState } from 'react';
import { PickDoorComponent } from '/components/PickDoor/PickDoor';
import React from 'react';

export interface PickDoorInput {
  doors: Door[];
  username: string;
  password: string;
  serverPubKey: string;
}

export const PickDoor: React.FunctionComponent<
  StepComponentProps<PickDoorInput, LinkCreatedInput>
> = props => {
  const [loadingDoor, setLoadingDoor] = useState<string | undefined>(undefined);

  const doorPressed = (doorcode: string) => {
    setLoadingDoor(doorcode);
    createRequest(
      props.input.username,
      props.input.password,
      doorcode,
      props.input.serverPubKey
    )
      .then(d => d.data)
      .then(linkId => {
        setLoadingDoor(undefined);
        props.onCompleted({ id: linkId });
      });
  };

  return (
    <PickDoorComponent
      doors={props.input.doors}
      loadingDoor={loadingDoor}
      onDoorClicked={doorPressed}
    />
  );
};
