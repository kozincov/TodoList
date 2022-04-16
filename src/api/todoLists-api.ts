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

export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}

export const todoListsAPI = {
    getTodoLists() {
        const promise = axios.get<TodoListType[]>(`https://social-network.samuraijs.com/api/1.1/todo-lists`, settings)
        return promise
    },
    createTodoList(title: string) {
        const promise = axios.post<ResponseType<{ item: TodoListType }>>(`https://social-network.samuraijs.com/api/1.1/todo-lists`, {title}, settings)
        return promise
    },
    removeTodoList(todoListId: string) {
        const promise = axios.delete<ResponseType<{}>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todoListId}`, settings)
        return promise
    },
    updateTodoList(todoListId: string, title: string) {
        const promise = axios.put<ResponseType<{}>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todoListId}`, {title}, settings)
        return promise
    },
    getTask(todoListId: string) {
        const promise = axios.get(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todoListId}/tasks`, settings)
        return promise
    }
}