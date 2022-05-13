import React from 'react';
import {Provider} from "react-redux";
import {combineReducers, createStore} from 'redux';
import {v1} from 'uuid';
import {TaskStatuses, TodoTaskPriority} from '../../api/todoLists-api';
import {AppRootStateType} from "../../state/store";
import {TasksReducer} from "../../state/tasks-reducer";
import {todoListsReducer} from "../../state/todo-lists-reducer";

const rootReducer = combineReducers({
    tasks: TasksReducer,
    todoLists: todoListsReducer
})

const initialGlobalState: AppRootStateType = {
    todoLists: [
        {id: "todoListId1", title: "What to learn", filter: "all", addedDate: '', order: 0},
        {id: "todoListId2", title: "What to buy", filter: "all", addedDate: '', order: 0}
    ],
    tasks: {
        ["todoListId1"]: [
            {
                id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed, deadline: '', description: '',
                priority: TodoTaskPriority.Low, startDate: '', todoListId: "todoListId1", addedDate: '',
                order: 0
            },
            {
                id: v1(), title: "JS", status: TaskStatuses.Completed, deadline: '', description: '',
                priority: TodoTaskPriority.Low, startDate: '', todoListId: "todoListId1", addedDate: '',
                order: 0
            }
        ],
        ["todoListId2"]: [
            {
                id: v1(), title: "Milk", status: TaskStatuses.Completed, deadline: '', description: '',
                priority: TodoTaskPriority.Low, startDate: '', todoListId: "todoListId1", addedDate: '',
                order: 0
            },
            {
                id: v1(), title: "React Book", status: TaskStatuses.Completed, deadline: '', description: '',
                priority: TodoTaskPriority.Low, startDate: '', todoListId: "todoListId1", addedDate: '',
                order: 0
            }
        ]
    },
    app: {
        status: 'idle'
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState);

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)



