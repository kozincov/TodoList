import {combineReducers, createStore} from "redux";
import {TasksReducer} from "./tasks-reducer";
import {todoListsReducer} from "./todo-lists-reducer";


const rootReducer = combineReducers({
    tasks: TasksReducer,
    todoLists: todoListsReducer
})

export const store = createStore(rootReducer)

export type AppRootStateType = ReturnType<typeof rootReducer>

