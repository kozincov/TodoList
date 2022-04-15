import {Tasks} from '../Tasks';
import {action} from '@storybook/addon-actions'
import React from 'react'
import {ReduxStoreProviderDecorator} from "./decorators/ReduxStoreProviderDecorator";

export default {
    title: 'Task Component',
    component: Tasks,
    decorators: [ReduxStoreProviderDecorator]
}

const callback = action("Button 'add' was pressed inside the form")

export const TasksFormBaseExample = () => {
    return <>
        <Tasks task={ { id: '1', isDone: true, title: 'CSS' } } todoListId={'todoList1'}/>
        <Tasks task={ { id: '2', isDone: false, title: 'CSS' } } todoListId={'todoList2'}/>
    </>
}