import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from './Navigation';
import Shuffle from './Shuffle';
import Signin from './Signin';

const App = () => (
  <Router>
    <Fragment>
      <Navigation />
      <Route exact path="/signin" component={Signin} />
      <Route exact path="/" component={Shuffle} />
    </Fragment>
  </Router>
);

export default App;
