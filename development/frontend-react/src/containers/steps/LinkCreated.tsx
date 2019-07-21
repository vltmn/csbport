import React from 'react';
import { StepComponentProps } from '/containers/Wizard';
import { Link } from 'react-router-dom';
export interface LinkCreatedInput {
    id: string;
}

export const LinkCreated: React.FunctionComponent<StepComponentProps<LinkCreatedInput, {}>> = props => {
    return (
        <span>
            <div className='content'>
                <p className='has-text-dark'>Here is a link to the request</p>
            </div>
            <Link to={`/open/${props.input.id}`} className='button is-success'>
                {props.input.id}
            </Link>
        </span>
    );
};