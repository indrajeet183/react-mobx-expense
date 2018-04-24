import React from 'react';
import AppBar from '../UI/AppBar';
import ExpenseListView from '../Expense/ExpenseListView';
import { DailyExpense } from '../../models/ExpenseList';

let list = DailyExpense.create({
  date: new Date().toLocaleDateString(),
    items: [
      {name: 'First Item', price: 20, quantity: 4},
      {name: 'Second Item', price: 10, quantity: 2},
    ],
})

const home = () => {
  return (
    <div>
     <AppBar/>      
     <ExpenseListView list={list}/>
    </div>
  );
};

export default home