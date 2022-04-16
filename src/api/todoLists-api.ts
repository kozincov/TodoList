import axios from "axios";

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'a8f18ed9-cd22-42f9-b24e-d66a98812746'
    }
}

export type TodoListType = {
    id: string
    title: string
    addedDate: string
    order: number
}

type ResponseType<D> = {
    resultCode: number
    messages: string[]
    data: D
}

export const todoListsAPI = {
    getTodoLists() {
        const promise = axios.get<TodoListType[]>(`https://social-network.samuraijs.com/api/1.1/todo-lists`, settings)
        return promise
    },
    createTodoList(title: string) {
        const promise = axios.post<ResponseType<{item: TodoListType}>>(`https://social-network.samuraijs.com/api/1.1/todo-lists`, {title}, settings)
        return promise
    },
    removeTodoList(todoListId: string) {
        const promise = axios.delete<ResponseType<{}>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todoListId}`, settings)
        return promise
    },
    updateTodoList(todoListId: string, title: string) {
        const promise = axios.put<ResponseType<{}>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todoListId}`, {title}, settings)
        return promise
    }
}