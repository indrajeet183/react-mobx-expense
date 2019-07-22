import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import {Provider} from 'mobx-react';
import expenseStore from './models/ExpenseList';
import registerServiceWorker from './registerServiceWorker';

const mainApp = (
  <Provider expenseStore={expenseStore}>
    <App></App>
  </Provider>
);

ReactDOM.render (mainApp, document.getElementById ('root'));
registerServiceWorker ();
