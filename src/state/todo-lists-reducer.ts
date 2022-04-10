import {v1} from "uuid";
import {TodoListsType} from "../App";

export const todoListsReducer = (state: TodoListsType[], action: GeneralTypeForAC) => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(f => f.id !== action.payload.todoListId)
        }
        case "ADD-TODOLIST": {
            return [{id: v1(), title: action.payload.title, filter: "all"}, ...state]
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(m => m.id === action.payload.todoListId ? {...m, title: action.payload.title} : m)
        }
        default:
            return state
    }
}

export type GeneralTypeForAC = removeTodoListACType
    | addTodoListACType
    | changeTitleTodoListACType

export const removeTodoListAC = (todoListId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todoListId,
        }
    } as const
}

export type removeTodoListACType = ReturnType<typeof removeTodoListAC>

export const addTodoListAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            title,
        }
    } as const
}

export type addTodoListACType = ReturnType<typeof addTodoListAC>

export const changeTitleTodoListAC = (todoListId: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            todoListId,
            title
        }
    } as const
}

export type changeTitleTodoListACType = ReturnType<typeof changeTitleTodoListAC>
