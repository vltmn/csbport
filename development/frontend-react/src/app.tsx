import React from 'react';
import 'bulma';
import '/style.scss';

import { CreatePage } from './pages/Create';
export class App extends React.Component {
    render() {
        return (
            <CreatePage />
        );
    }
}