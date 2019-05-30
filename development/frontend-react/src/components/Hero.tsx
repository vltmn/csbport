import React from 'react';

interface Props {
    color: string;
}


export const Hero: React.FunctionComponent<Props> = ({ color, children }) => (
    <section className={`hero is-fullheight is-bold ${color}`}>
        <div className='hero-body'>
            <div className='container'>
                {children}
            </div>
        </div>
    </section>
);