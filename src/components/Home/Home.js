import React from 'react';
import AppBar from '../UI/AppBar/AppBar';
import ExpenseListView from '../Expense/ExpenseListView';

const home = () => {
  return (
    <div>
     <AppBar/>     
     <ExpenseListView/>
    </div>
  );
};

export default home