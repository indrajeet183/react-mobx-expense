import { types } from 'mobx-state-tree';


/**
 * Expense model which holds individual item
 */
export const Expense = types.model({
    name:types.string,
    price:types.number,
    quantity:types.number,    
    type:types.string
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
    changeType(newType) {
        self.type = newType
    },
})).views(self => ({
    get totalPrice () {
        return self.quantity?self.price * self.quantity:self.price
    }
}))


/**
 * DailyExpense model which have arrays of Expense 
 * Also have date as unique identifier
 */
export const DailyExpense = types.model({
    date:types.optional(types.string,''),
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
        return self.items.reduce((sum,entry) => sum+(entry.price * (entry.quantity?entry.quantity:1)),0)
    },
    get allCategories () {
        return self.items.reduce((a,k)=>(a.includes(k.type)||a.push(k.type),a),[])
    },
    get chartData () {
        const labels = this.allCategories;
        let data = [];

        self.items.forEach((ele) => {
            let index = labels.indexOf(ele.type);
            data[index]?data[index]+=ele.price:data[index]=ele.price
        })

        return data;
    }
}))

const expenseStore = DailyExpense.create({

})

export default expenseStore


