import {todoListsAPI, TodoListType} from "../api/todoLists-api";
import {Dispatch} from "redux";
import {setAppStatusAC} from "../app-reducer";

const initialState: TodoListEntityType[] = []


export const todoListsReducer = (state: TodoListEntityType[] = initialState, action: GeneralTypeForAC): TodoListEntityType[] => {
    switch (action.type) {
        case "SET-TODOLISTS":
            return action.payload.todoLists.map(m => {
                return {...m, filter: 'all'}
            })
        case "REMOVE-TODOLIST":
            return state.filter(f => f.id !== action.payload.todoListId)
        case "ADD-TODOLIST":
            return [{...action.payload.todoList, filter: 'all'}, ...state]
        case "CHANGE-TODOLIST-TITLE":
            return state.map(m => m.id === action.payload.todoListId ? {...m, title: action.payload.title} : m)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(m => m.id === action.payload.todoListId ? {...m, filter: action.payload.filter} : m)
        default:
            return state
    }
}

//action
export const removeTodoListAC = (todoListId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todoListId,
        }
    } as const
}
export const addTodoListAC = (todoList: TodoListType) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            todoList
        }
    } as const
}
export const changeTitleTodoListAC = (todoListId: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            todoListId,
            title
        }
    } as const
}
export const changeFilterTodoListAC = (todoListId: string, filter: FilterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            todoListId,
            filter
        }
    } as const
}
export const setTodoListsAC = (todoLists: TodoListType[]) => {
    return {
        type: 'SET-TODOLISTS',
        payload: {
            todoLists
        }
    } as const
}

//thunk
export const fetchTodoListsTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todoListsAPI.getTodoLists()
        .then((res) => {
            dispatch(setAppStatusAC('succeeded'))
            dispatch(setTodoListsAC(res.data))
        })
}
export const deleteTodoListTC = (todoListId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todoListsAPI.removeTodoList(todoListId)
        .then(() => {
            dispatch(setAppStatusAC('succeeded'))
            dispatch(removeTodoListAC(todoListId))
        })
}
export const addTodoListTC = (title: string) => (dispatch: Dispatch,) => {
    dispatch(setAppStatusAC('loading'))
    todoListsAPI.createTodoList(title)
        .then((res) => {
            dispatch(setAppStatusAC('succeeded'))
            dispatch(addTodoListAC(res.data.data.item))
        })
}
export const updateTodoListTitleTC = (todoListId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todoListsAPI.updateTodoList(todoListId, title)
        .then(() => {
            dispatch(setAppStatusAC('succeeded'))
            dispatch(changeTitleTodoListAC(todoListId, title))
        })
}

//type
export type GeneralTypeForAC = removeTodoListACType
    | addTodoListACType
    | changeTitleTodoListACType
    | changeFilterTodoListACType
    | getTodoListsACType
export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodoListEntityType = TodoListType & {
    filter: FilterValuesType
}
export type removeTodoListACType = ReturnType<typeof removeTodoListAC>
export type addTodoListACType = ReturnType<typeof addTodoListAC>
export type changeTitleTodoListACType = ReturnType<typeof changeTitleTodoListAC>
export type changeFilterTodoListACType = ReturnType<typeof changeFilterTodoListAC>
export type getTodoListsACType = ReturnType<typeof setTodoListsAC>