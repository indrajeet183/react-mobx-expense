import {getSnapshot} from 'mobx-state-tree';

import {Expense, DailyExpense} from './ExpenseList';

const today = new Date ().toLocaleDateString ();

it ('can create instance of model Expense', () => {
  const expense = Expense.create ({
    "_id":'',
    name: 'First',
    price: 20,
    quantity: 4,
    type:'TestType',
    date:'2019-04-25'
  });

  expect(getSnapshot(expense)).toEqual({
    "_id":'',
    name: 'First',
    price: 20,
    quantity: 4,
    type:'TestType',
    date:'2019-04-25'
  });
});

it ('can create instance of DailyExpense', () => {
  const dailyExpense = DailyExpense.create ({
    date: today,
    items: [
      {"_id":"","date":"2019-04-25",name: 'First Item', price: 20, quantity: 4,type:'TestType'},
      {"_id":"","date":"2019-04-25",name: 'Second Item', price: 10, quantity: 2,type:'TestType'},
    ],
  });

  expect (getSnapshot (dailyExpense)).toEqual ({
    date: today,
    items: [
      {"_id":"","date":"2019-04-25",name: 'First Item', price: 20, quantity: 4,type:'TestType'},
      {"_id":"","date":"2019-04-25",name: 'Second Item', price: 10, quantity: 2,type:'TestType'},
    ],
  });
});

it ('can add item in DailyExpense', () => {
  const dailyExpense = DailyExpense.create ({
    date: today,
    items: [],
  });

  dailyExpense.addItem ({"_id":"","date":"2019-04-25",name: 'First Item', price: 20, quantity: 4,type:'TestType'});

  expect (dailyExpense.items.length).toBe (1);
  expect (dailyExpense.items[0].name).toBe ('First Item');
  expect (dailyExpense.items[0].price).toBe (20);
  expect (dailyExpense.items[0].quantity).toBe (4);
  expect (dailyExpense.items[0].type).toBe ('TestType');
});

it ('can remove item in DailyExpense', () => {
  const dailyExpense = DailyExpense.create ({
    date: today,
    items: [{"_id":"","date":"2019-04-25",name: 'First Item', price: 20, quantity: 4,type:'TestType'}],
  });

  expect(dailyExpense.items.length).toBe(1);

  dailyExpense.removeItem('First Item');

  expect(dailyExpense.items.length).toBe(0);
});

it ('can calculate total price of DailyExpense', () => {
  const dailyExpense = DailyExpense.create ({
    date: today,    
    items: [
      {"_id":"","date":"2019-04-25",name: 'First Item', price: 20, quantity: 4,type:'TestType'},
      {"_id":"","date":"2019-04-25",name: 'Second Item', price: 10, quantity: 2,type:'TestType'},
      {"_id":"","date":"2019-04-25",name: 'Third Item', price: 5, quantity: 1,type:'TestType'}
    ],
  });

  expect(dailyExpense.totalPrice).toBe(105)
});
