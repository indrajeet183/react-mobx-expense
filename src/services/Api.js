import axios from 'axios';

export const api = () => { 
    return axios.create({
        baseURL:'http://localhost:3099/expense/'
    })
}

export const addExpense = (data) => { return api().post('addExpense',data) }

export const getExpense = (date) => { return api().get('getExpense/'+date) }