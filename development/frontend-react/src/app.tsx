import React from 'react';
import 'bulma';
import '/style.scss';

import { CreatePage } from './pages/Create';
import { OpenPage } from './pages/Open';
import { HashRouter as Router, Route } from 'react-router-dom';

export const App: React.FunctionComponent = () => (
    <Router>
        <Route path='/' exact component={CreatePage} />
        <Route path='/open/:id' component={OpenPage} />
    </Router>
);