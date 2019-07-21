import React, { useState, useEffect } from 'react';
import { ValidatedRequest, validateRequest, useRequest } from '/services/api';
import { OpenDoorComponent } from '/components/OpenDoor';

export interface OpenProps {
  id: string;
}
export const Open: React.FunctionComponent<OpenProps> = props => {
  const [validatedRequest, setValidatedRequest] = useState<
    ValidatedRequest | undefined
  >(undefined);

  useEffect(() => {
    validateRequest(props.id)
      .then(d => d.data)
      .then(validated => setValidatedRequest(validated))
      .catch(err =>
        setError(`The request has already been used or doesn't exist.`)
  );
  }, [props.id]);

  const [error, setError] = useState<string | undefined>(undefined);
  const [requestUsed, setRequestUsed] = useState(false);
  const [isUsing, setIsUsing] = useState(false);

  const onPressOpenDoor = () => {
      setIsUsing(true);
      useRequest(props.id)
        .then(_ => setIsUsing(false))
        .then(_ => setRequestUsed(true));
  };

  return error ? (
    <p className='p'>{error}</p>
  ) : validatedRequest ? (
    <OpenDoorComponent loading={isUsing} name={validatedRequest.name} onOpenDoor={() => onPressOpenDoor()} used={requestUsed} />
  ) : (
    <a className='button is-white is-loading' />
  );
};
