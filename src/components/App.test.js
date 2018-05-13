import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'mobx-react';
import expenseStore from '../models/ExpenseList'

it('renders without crashing', () => {
  const div = document.createElement('div');
  const mainApp = (
    <Provider expenseStore={expenseStore}>
      <App></App>
    </Provider>
  )
  ReactDOM.render(mainApp, div);
  ReactDOM.unmountComponentAtNode(div);
});
