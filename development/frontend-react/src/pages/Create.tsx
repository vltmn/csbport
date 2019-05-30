import React from 'react';
import { Hero } from '/components/Hero';


export class CreatePage extends React.Component {
    render() {
        return (<Hero color='is-primary'>
            <h1 className='title'>Create a new Port request</h1>
        </Hero>);
    }
}