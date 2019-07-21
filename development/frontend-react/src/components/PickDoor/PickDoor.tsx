import { Door, createRequest } from '/services/api';
import React, { useState } from 'react';

export interface PickDoorComponentProps {
    doors: Door[];
    onDoorClicked: (doorCode: string) => void;
    loadingDoor: string | undefined;
}

export const PickDoorComponent: React.FunctionComponent<PickDoorComponentProps> = props => {
    return (
        <span>
            <div className='content'>
                <p className='has-text-dark'>Please select the door you want to create a link for</p>
            </div>
            {props.doors.map(door => (
                <div className='level' key={door.code}>
                    <button
                        className={`button is-fullwidth ${props.loadingDoor === door.code ? 'is-loading' : props.loadingDoor ? '' : 'is-info'}`}
                        onClick={() => props.onDoorClicked(door.code)}
                        disabled={!!props.loadingDoor}>
                        {door.text}
                    </button>
                </div>
            ))}
        </span>
    );
};