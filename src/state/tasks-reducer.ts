import {v1} from "uuid";
import {addTodoListACType, getTodoListsACType, removeTodoListACType} from "./todo-lists-reducer";
import {TasksStateType} from "../App";
import {TaskStatuses, TaskType, todoListsAPI, TodoTaskPriority} from "../api/todoLists-api";
import {Dispatch} from "redux";

const initialState: TasksStateType = {}

export const TasksReducer = (state: TasksStateType = initialState, action: GeneralTypeForAC) => {
    switch (action.type) {
        case "SET-TODOLISTS": {
            const stateCopy = {...state}
            action.payload.todoLists.forEach(f => {
                stateCopy[f.id] = []
            })
            return stateCopy
        }
        case "SET-TASKS": {
            return {
                ...state,
                [action.payload.todoListId]: action.payload.tasks
            }
        }
        case "REMOVE-TASK":
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId].filter(f => f.id !== action.payload.taskId)
            }
        case "ADD-TASK":
            let newTask = {
                id: v1(), title: action.payload.title, status: TaskStatuses.New, deadline: '', description: '',
                priority: TodoTaskPriority.Low, startDate: '', todoListId: action.payload.todoListId, addedDate: '',
                order: 0
            }
            return {
                ...state,
                [action.payload.todoListId]: [newTask, ...state[action.payload.todoListId]]
            }
        case "CHANGE-TASK-STATUS":
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId]
                    .map(m => m.id === action.payload.taskId
                        ? {...m, status: action.payload.status}
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
        case "REMOVE-TODOLIST":
            let copyState = {...state}
            delete copyState[action.payload.todoListId]
            return copyState
        default:
            return state
    }
};

export type GeneralTypeForAC = removeTaskACType
    | addTaskACType
    | changeTaskStatusACType
    | changeTaskTitleACType
    | addTodoListACType
    | removeTodoListACType
    | getTodoListsACType
    | setTasksACType

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

export const changeTaskStatusAC = (todoListId: string, taskId: string, status: TaskStatuses) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            todoListId,
            taskId,
            status
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

export const setTasksAC = (todoListId: string, tasks: TaskType[]) => {
    return {
        type: 'SET-TASKS',
        payload: {
            todoListId,
            tasks
        }
    } as const
}

export type setTasksACType = ReturnType<typeof setTasksAC>

export const fetchTasksTC = (todoListId: string) => (dispatch: Dispatch) => {
    todoListsAPI.getTasks(todoListId)
        .then((res) => {
            dispatch(setTasksAC(todoListId, res.data.items))
        })
}

export const addTaskTC = (todoListId: string, title: string) => (dispatch: Dispatch) => {
    todoListsAPI.createTask(todoListId, title)
        .then(() => {
            dispatch(addTaskAC(todoListId, title))
        })
}
