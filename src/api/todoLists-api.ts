import axios from "axios";

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'a8f18ed9-cd22-42f9-b24e-d66a98812746'
    }
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
})

export type TodoListType = {
    id: string
    title: string
    addedDate: string
    order: number
}

type ResponseType<D = {}> = {
    resultCode: number
    fieldsError: string[]
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

export type UpdateTaskType = {
    title: string
    description: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
}

export type CreateTaskType<D = {}> = {
    data: D
    item: TaskType
    resultCode: number
    message: string[]
}

type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}

export const todoListsAPI = {
    getTodoLists() {
        return instance.get<TodoListType[]>(`todo-lists`)
    },
    createTodoList(title: string) {
        return instance.post<ResponseType<{ item: TodoListType }>>(`todo-lists`, {title})
    },
    removeTodoList(todoListId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todoListId}`)
    },
    updateTodoList(todoListId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todoListId}`, {title})
    },
    getTasks(todoListId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todoListId}/tasks`)
    },
    deleteTask(todoListId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todoListId}/tasks/${taskId}`)
    },
    updateTask(todoListId: string, taskId: string, title: string) {
        return instance.put<UpdateTaskType>(`todo-lists/${todoListId}/tasks/${taskId}`,{title})
    },
    createTask(todoListId: string, title: string) {
        return instance.post<CreateTaskType>(`/todo-lists/${todoListId}/tasks`, {title})
    }
}