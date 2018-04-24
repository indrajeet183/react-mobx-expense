import {getSnapshot} from 'mobx-state-tree';

import {Expense, DailyExpense} from './ExpenseList';

const today = new Date ().toLocaleDateString ();

it ('can create instance of model Expense', () => {
  const expense = Expense.create ({
    name: 'First',
    price: 20,
    quantity: 4,
  });

  // expect (expense.name).toBe ('First');
  // expect (expense.price).toBe (20);
  // expect (expense.quantity).toBe (4);

  expect (getSnapshot (expense)).toMatchSnapshot ();
});

it ('can create instance of DailyExpense', () => {
  const dailyExpense = DailyExpense.create ({
    date: today,
    items: [
      {name: 'First Item', price: 20, quantity: 4},
      {name: 'Second Item', price: 10, quantity: 2},
    ],
  });

  // expect (dailyExpense.items.length).toBe (2);
  // expect (dailyExpense.totalPrice).toBe (100);
  // expect (dailyExpense.items[0].name).toBe ('First Item');
  // expect (dailyExpense.items[0].price).toBe (20);
  // expect (dailyExpense.items[0].quantity).toBe (4);

  expect (getSnapshot (dailyExpense)).toEqual ({
    date: today,
    items: [
      {name: 'First Item', price: 20, quantity: 4},
      {name: 'Second Item', price: 10, quantity: 2},
    ],
  });
});

it ('can add item in DailyExpense', () => {
  const dailyExpense = DailyExpense.create ({
    date: today,
    items: [],
  });

  dailyExpense.addItem ({name: 'First Item', price: 20, quantity: 4});

  expect (dailyExpense.items.length).toBe (1);
  expect (dailyExpense.items[0].name).toBe ('First Item');
  expect (dailyExpense.items[0].price).toBe (20);
  expect (dailyExpense.items[0].quantity).toBe (4);
});

it ('can remove item in DailyExpense', () => {
  const dailyExpense = DailyExpense.create ({
    date: today,
    items: [{name: 'First Item', price: 20, quantity: 4}],
  });

  expect (dailyExpense.items.length).toBe (1);

  dailyExpense.removeItem ('First Item');

  expect (dailyExpense.items.length).toBe (0);
});

it ('can calculate total price of DailyExpense', () => {
  const dailyExpense = DailyExpense.create ({
    date: today,    
    items: [
      {name: 'First Item', price: 20, quantity: 4},
      {name: 'Second Item', price: 10, quantity: 2},
      {name: 'Third Item', price: 5, quantity: 1}
    ],
  });

  expect(dailyExpense.totalPrice).toBe(105)
});
