import {TasksStateType} from "../App";

export const TasksReducer = (state: TasksStateType, action: GeneralTypeForAC) => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId].filter(f => f.id !== action.payload.taskId)
            }
        default:
            return state
    }
};

export type GeneralTypeForAC = removeTaskACType

export const removeTaskAC = (todoListId: string, taskId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            todoListId,
            taskId
        }
    } as const
}

export type removeTaskACType = ReturnType<typeof removeTaskAC>
