import React from 'react';
import { createHashHistory } from 'history';
import { ApplicationReducer, IApplicationState } from './reducers/ApplicationReducers';
import StateProvider from './components/StateProvider/StateProvider';
import { Router, Switch, Route, Redirect } from 'react-router';

import 'normalize.css/normalize.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Admin } from './layouts/Admin/Admin';

const history = createHashHistory();

const initialState: IApplicationState = {
  auth: "",
  loading: false,
  theme: "bp-dark",
  navbarTabId: localStorage.getItem('navbarTabId') || 'configuration'
}

const App: React.FC = () => {
  return (
    <StateProvider reducer={ApplicationReducer} initialState={initialState}>
      <Router history={history}>
        <Switch>
          <Route path="/" render={(props: any) => <Admin {...props} /> } />
          <Route path="/" exact render={(props: any) => <Redirect to="/configuration"/> } />
        </Switch>
      </Router>
    </StateProvider>
  );
}

export default App;
