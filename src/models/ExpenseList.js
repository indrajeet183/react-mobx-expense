import { types } from 'mobx-state-tree';

export const Expense = types.model({
    name:types.string,
    price:types.number,
    quantity:types.number,    
}).actions(self => ({
    changeName(newName) {
        self.name = newName
    },
    changePrice(newPrice) {
        self.price = newPrice
    },
    changeQuantity(newQuant) {
        self.quantity = newQuant
    },
})).views(self => ({
    get totalPrice () {
        return self.price * self.quantity
    }
}))

export const DailyExpense = types.model({
    date:types.string,
    //totalPrice:types.number,
    items:types.optional(types.array(Expense),[])
}).actions(self => ({
    changeDate (newDate) {
        self.date = newDate
    },    
    addItem (newItem) {
        self.items.push(newItem)
    },
    removeItem (name) {
        const index = self.items.findIndex(e => {
            if(e.name === name) 
                return e
        })
        self.items.splice(index,1)
    }
})).views(self => ({
    get totalPrice () {
        return self.items.reduce((sum,entry) => sum+(entry.price * entry.quantity),0)
    }
}))
