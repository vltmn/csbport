import React from 'react';

export interface OpenDoorComponentProps {
    used: boolean;
    name: string;
    loading: boolean;
    onOpenDoor: () => void;
}

export const OpenDoorComponent: React.FunctionComponent<OpenDoorComponentProps> = props => (
    <span>
        <p className='p'>
            Welcome to {props.name}.  Click the button below to use your request and open the door.
        </p>
        <button
            className={`button is-fullwidth ${props.used ?
                'is-success' :
                props.loading ?
                'is-loading' :
                'is-primary'
            }`}
            onClick={() => props.onOpenDoor()}
            disabled={props.used}>
            {
                props.used ?
                'Request used!' :
                props.loading ?
                '' :
                'Use'
            }
            </button>
    </span>
);