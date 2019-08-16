import React, { setGlobal, getGlobal } from 'reactn';
import ReactDOM from 'react-dom';
import './index.scss';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { HashRouter as Router } from 'react-router-dom';
import App from 'components/App';
import Loki from 'lokijs';
import LokiIDBAdapter from 'lokijs/src/loki-indexed-adapter';
import * as Iota from '@iota/core';
import { initialState, DBContext } from './store';


const userData = localStorage.getItem('userData');
if (userData) {
  try {
    const user = JSON.parse(userData);
    setGlobal({ ...initialState, ...user, loggedIn: true });
    console.log(getGlobal());
  } catch (err) {
    localStorage.removeItem('userData');
    setGlobal(initialState);
  }
} else {
  setGlobal(initialState);
}

const adapter = new LokiIDBAdapter();

const autoloadCallback = () => {
  console.log('Database loaded');
  const userCollection = loki.getCollection('users');
  if (!userCollection) {
    loki.addCollection('users');
  }
};

const loki = new Loki('test.db', {
  adapter,
  autoload: true,
  autosave: true,
  autosaveInterval: 4000,
  /* eslint-disable-next-line */
  autoloadCallback,
});


/* debugging */
window.iota = Iota;


const MOUNT_NODE = document.getElementById('root');

const render = () => {
  console.log('render called');
  ReactDOM.render(
    <Router>
      <CssBaseline />
      <DBContext.Provider value={loki}>
        <App />
      </DBContext.Provider>
    </Router>,
    MOUNT_NODE,
  );
};

render();
