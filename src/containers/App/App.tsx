import React, { FunctionComponent } from 'react';

import Navigation from '../../components/Navigation';

import './App.scss';
import FormTest from './FormTest';

const App: FunctionComponent = () => (
  <>
    <Navigation />
    <header className="App-header">
      <FormTest />
    </header>
  </>
);

export default App;
