import React from 'react';
import {Provider} from "react-redux";
import {combineReducers, createStore} from 'redux';
import { v1 } from 'uuid';
import {AppRootStateType, store} from "../../state/store";
import {TasksReducer} from "../../state/tasks-reducer";
import {todoListsReducer} from "../../state/todo-lists-reducer";

const rootReducer = combineReducers({
    tasks: TasksReducer,
    todoLists: todoListsReducer
})

const initialGlobalState = {
    todoLists: [
        {id: "todoListId1", title: "What to learn", filter: "all"},
        {id: "todoListId2", title: "What to buy", filter: "all"}
    ] ,
    tasks: {
        ["todoListId1"]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        ["todoListId2"]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType);

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)



