import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';

import Booking from './booking';

export default function App() {
  return (
    <Router>
      <QueryParamProvider ReactRouterRoute={ Route }>
        <Switch>
          <Route path="/">
            <Booking />
          </Route>
        </Switch>
      </QueryParamProvider>
    </Router>
  );
}
