import {addTodoListACType, getTodoListsACType, removeTodoListACType} from "./todo-lists-reducer";
import {TasksStateType} from "../App";
import {TaskStatuses, TaskType, todoListsAPI, UpdateTaskType} from "../api/todoLists-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

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
            return {
                ...state,
                [action.payload.task.todoListId]: [action.payload.task, ...state[action.payload.task.todoListId]]
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
                [action.payload.todoList.id]: []
            }
        case "REMOVE-TODOLIST":
            let copyState = {...state}
            delete copyState[action.payload.todoListId]
            return copyState
        default:
            return state
    }
};

// action
export const removeTaskAC = (todoListId: string, taskId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            todoListId,
            taskId
        }
    } as const
}
export const addTaskAC = (task: TaskType) => {
    return {
        type: 'ADD-TASK',
        payload: {
            task
        }
    } as const
}
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
export const setTasksAC = (todoListId: string, tasks: TaskType[]) => {
    return {
        type: 'SET-TASKS',
        payload: {
            todoListId,
            tasks
        }
    } as const
}
export type removeTaskACType = ReturnType<typeof removeTaskAC>

// thunk
export const fetchTasksTC = (todoListId: string) => (dispatch: Dispatch) => {
    todoListsAPI.getTasks(todoListId)
        .then((res) => {
            dispatch(setTasksAC(todoListId, res.data.items))
        })
}
export const addTaskTC = (todoListId: string, title: string) => (dispatch: Dispatch) => {
    todoListsAPI.createTask(todoListId, title)
        .then((res) => {
            dispatch(addTaskAC(res.data.data.item))
        })
}
export const deleteTaskTC = (todoListId: string, taskId: string) => (dispatch: Dispatch) => {
    todoListsAPI.deleteTask(todoListId, taskId)
        .then(() => {
            dispatch(removeTaskAC(todoListId, taskId))
        })
}
export const updateTaskStatusTC = (todoListId: string, taskId: string, status: TaskStatuses) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const allTasksFromState = getState().tasks
        const task = allTasksFromState[todoListId].find(f => f.id === taskId)

        if (task) {
            const model: UpdateTaskType = {
                title: task.title,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline,
                status
            }

            todoListsAPI.updateTask(todoListId, taskId, model)
                .then(() => {
                    dispatch(changeTaskStatusAC(todoListId, taskId, status))
                })
        }
    }
export const updateTaskTitleTC = (todoListId: string, taskId: string, title: string) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const allTasksFromState = getState().tasks
        const task = allTasksFromState[todoListId].find(f => f.id === taskId)

        if (task) {
            const model: UpdateTaskType = {
                title,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline,
                status: task.status
            }

            todoListsAPI.updateTask(todoListId, taskId, model)
                .then(() => {
                    dispatch(changeTaskTitleAC(todoListId, taskId, title))
                })
        }
    }

// type
export type GeneralTypeForAC =
    | removeTaskACType
    | addTaskACType
    | changeTaskStatusACType
    | changeTaskTitleACType
    | addTodoListACType
    | removeTodoListACType
    | getTodoListsACType
    | setTasksACType
export type addTaskACType = ReturnType<typeof addTaskAC>
export type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export type setTasksACType = ReturnType<typeof setTasksAC>
