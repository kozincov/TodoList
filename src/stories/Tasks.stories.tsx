import {Tasks} from '../Tasks';
import React from 'react'
import {ReduxStoreProviderDecorator} from "./decorators/ReduxStoreProviderDecorator";
import {TaskStatuses, TodoTaskPriority} from "../api/todoLists-api";

export default {
    title: 'Task Component',
    component: Tasks,
    decorators: [ReduxStoreProviderDecorator]
}

export const TasksFormBaseExample = () => {
    return <>
        <Tasks task={{
            id: '1', status: TaskStatuses.Completed, title: 'CSS', deadline: '', description: '',
            priority: TodoTaskPriority.Low, startDate: '', todoListId: 'todoList1', addedDate: '',
            order: 0
        }} todoListId={'todoList1'}/>
        <Tasks task={{
            id: '2', status: TaskStatuses.New, title: 'CSS', deadline: '', description: '',
            priority: TodoTaskPriority.Low, startDate: '', todoListId: 'todoList2', addedDate: '',
            order: 0
        }} todoListId={'todoList2'}/>
    </>
}