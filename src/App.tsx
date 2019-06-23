import React from 'react';
import { createHashHistory } from 'history';
import { ApplicationReducer, IApplicationState } from './reducers/ApplicationReducers';
import StateProvider from './components/StateProvider/StateProvider';
import { Router, Switch, Route, Redirect } from 'react-router';
import { DeviceType } from './reducers/ApplicationReducers';

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
  theme: localStorage.getItem("theme") || "bp-dark",
  navbarTabId: localStorage.getItem('navbarTabId') || 'configuration',
  clientPortProps: {
    name: "pgwtap",
    peerName: "pgwtapgen",
    ip: "10.1.2.4",
    subnet: "24",
    mac: "00:00:00:00:10:04",
    onState: true,
    type: DeviceType.Tap 
  },
  serverPortProps: {
    name: "outtap",
    peerName: "outtapgen",
    ip: "0.0.0.0",
    subnet: "24",
    mac: "",
    onState: true,
    type: DeviceType.Veth
  },
  networkTranslation: {
    serverList: { "10.1.2.1" : "00:00:00:00:00:01"},
    inPorts: [1, 3, 5],
    outPortMap: { '1' : '2'},
    serverMap: {}
  }
}

const App: React.FC = () => {
  return (
    <StateProvider reducer={ApplicationReducer} initialState={initialState}>
      <Router history={history}>
        <Switch>
          <Route path="/" exact render={(props: any) => <Redirect to="/configuration"/> } />
          <Route path="/" render={(props: any) => <Admin {...props} /> } />
        </Switch>
      </Router>
    </StateProvider>
  );
}

export default App;
