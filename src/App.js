import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Menu from './menu';
import Switch from './switch';

const App = () => (
  <Router>
    <Menu />
    <Switch />
  </Router>
);

export default App;