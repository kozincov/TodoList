import {TasksStateType} from "../App";
import {v1} from "uuid";
import {addTodoListACType} from "./todo-lists-reducer";

export const TasksReducer = (state: TasksStateType, action: GeneralTypeForAC) => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId].filter(f => f.id !== action.payload.taskId)
            }
        case "ADD-TASK":
            let newTask = {id: v1(), title: action.payload.title, isDone: false}
            return {
                ...state,
                [action.payload.todoListId]: [newTask, ...state[action.payload.todoListId]]
            }
        case "CHANGE-TASK-STATUS":
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId]
                    .map(m => m.id === action.payload.taskId
                        ? {...m, isDone: action.payload.isDone}
                        : m)
            }
        case "CHANGE-TASK-TITLE":
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId]
                    .map(m => m.id === action.payload.taskId
                    ? {...m, title: action.payload.title}
                    : m)
            }
        case "ADD-TODOLIST":
            return {
                ...state,
                [action.payload.todoListId]: []
            }
        default:
            return state
    }
};

export type GeneralTypeForAC = removeTaskACType
    | addTaskACType
    | changeTaskStatusACType
    | changeTaskTitleACType
    | addTodoListACType

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

export const addTaskAC = (todoListId: string, title: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            todoListId,
            title
        }
    } as const
}

export type addTaskACType = ReturnType<typeof addTaskAC>

export const changeTaskStatusAC = (todoListId: string, taskId: string, isDone: boolean) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            todoListId,
            taskId,
            isDone
        }
    } as const
}

export type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>

export const changeTaskTitleAC = (todoListId: string, taskId: string, title: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {
            todoListId,
            taskId,
            title
        }
    } as const
}

export type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
