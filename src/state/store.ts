import {applyMiddleware, combineReducers, createStore} from "redux";
import {TasksReducer} from "./tasks-reducer";
import {todoListsReducer} from "./todo-lists-reducer";
import thunk from "redux-thunk";


const rootReducer = combineReducers({
    tasks: TasksReducer,
    todoLists: todoListsReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>

