import { types } from 'mobx-state-tree';


/**
 * Expense model which holds individual item
 */
export const Expense = types.model({
    _id:types.optional(types.string,''),    
    name:types.string,
    price:types.number,
    quantity:types.number,    
    type:types.string,
    date:types.optional(types.string,'')
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
    updateItem(item) {
        self.name = item.name
        self.price = item.price
        self.quantity = parseInt(item.quantity)
    }
})).views(self => ({
    get totalPrice () {2
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
    },
    replaceItemArr(arr){
        self.items = arr
    },
    getItem(id){
        return self.items.filter(_v => { return _v._id == id })
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
            let quantity = ele.quantity?ele.quantity:1
            data[index]?data[index]+=ele.price*quantity:data[index]=ele.price*quantity
        })

        return data;
    }
}))

const expenseStore = DailyExpense.create({

})

export default expenseStore


