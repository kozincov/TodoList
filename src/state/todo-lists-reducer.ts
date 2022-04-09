import {TodoListsType} from "../App";

export const todoListsReducer = (state: TodoListsType[], action: GeneralTypeForAC) => {
    switch (action.type) {
        case "REMOVE-TODOLIST":{
            return state.filter(f => f.id !== action.payload.todoListId)
        }
        default: return state

    }
}

export type GeneralTypeForAC = removeTodoListACType

export const removeTodoListAC = (todoListId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todoListId,
        }
    } as const
}

export type removeTodoListACType = ReturnType<typeof removeTodoListAC>