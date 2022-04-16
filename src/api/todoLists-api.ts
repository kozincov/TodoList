import axios from "axios";

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'a8f18ed9-cd22-42f9-b24e-d66a98812746'
    }
}

export const todoListsAPI = {
    getTodoLists() {
        const promise = axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
        return promise
    },
    createTodoList(title: string) {
        const promise = axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', {title}, settings)
        return promise
    },
    removeTodoList(todoListId: string) {
        const promise = axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todoListId}`, settings)
        return promise
    },
    updateTodoList(todoListId: string, title: string) {
        const promise = axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todoListId}`, {title}, settings)
        return promise
    }
}