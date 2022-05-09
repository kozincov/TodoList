import {v1} from "uuid";
import {todoListsAPI, TodoListType} from "../api/todoLists-api";
import {Dispatch} from "redux";

const initialState: TodoListEntityType[] = []

export  type FilterValuesType = 'all' | 'active' | 'completed'

export type TodoListEntityType = TodoListType & {
    filter: FilterValuesType
}

export const todoListsReducer = (state: TodoListEntityType[] = initialState, action: GeneralTypeForAC): TodoListEntityType[] => {
    switch (action.type) {
        case "SET-TODOLISTS": {
            return action.payload.todoLists.map(m => {
                return {...m, filter: 'all'}
            })
        }
        case "REMOVE-TODOLIST": {
            return state.filter(f => f.id !== action.payload.todoListId)
        }
        case "ADD-TODOLIST": {
            return [{
                id: action.payload.todoListId,
                title: action.payload.title,
                filter: "all",
                addedDate: '',
                order: 0
            }, ...state]
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(m => m.id === action.payload.todoListId ? {...m, title: action.payload.title} : m)
        }
        case "CHANGE-TODOLIST-FILTER": {
            return state.map(m => m.id === action.payload.todoListId ? {...m, filter: action.payload.filter} : m)
        }
        default:
            return state
    }
}

export type GeneralTypeForAC = removeTodoListACType
    | addTodoListACType
    | changeTitleTodoListACType
    | changeFilterTodoListACType
    | getTodoListsACType

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
            todoListId: v1(),
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

export const changeFilterTodoListAC = (todoListId: string, filter: FilterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            todoListId,
            filter
        }
    } as const
}

export type changeFilterTodoListACType = ReturnType<typeof changeFilterTodoListAC>

export const getTodoListsAC = (todoLists: TodoListType[]) => {
    return {
        type: 'SET-TODOLISTS',
        payload: {
            todoLists
        }
    } as const
}

export type getTodoListsACType = ReturnType<typeof getTodoListsAC>

export const fetchTodoListsTC = () => (dispatch: Dispatch) => {
    todoListsAPI.getTodoLists()
        .then((res) => {
            dispatch(getTodoListsAC(res.data))
        })
}

export const deleteTodoListTC = (todoListId: string) => (dispatch: Dispatch) => {
    todoListsAPI.removeTodoList(todoListId)
        .then(() => {
            dispatch(removeTodoListAC(todoListId))
        })
}

export const addTodoListTC = (title: string) => (dispatch: Dispatch,) => {
    todoListsAPI.createTodoList(title)
        .then((res) => {
            dispatch(addTodoListAC(res.data.data.item.title))
        })
}
