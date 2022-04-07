import React, {useState} from 'react';
import { v1 } from 'uuid';
import './App.css';
import {TodoList} from "./TodoList";

export const App = () => {

    let [task,setTasks] = useState<TaskType[]>([
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'React', isDone: true},
    ]);

    let addTask = (title: string) => {
        let newTask = {id: v1(), title, isDone: false}
        setTasks([newTask, ...task])
    }

    let removeTask = (id:string) => {
        let filteredTasks = task.filter(f=>f.id !== id)
        setTasks(filteredTasks)
    }

    let [filter,setFilter] = useState<FilterValuesType>('all');

    let tasksForTodoList = task;

    if (filter === 'active'){
        tasksForTodoList = tasksForTodoList.filter(f => !f.isDone)
    }

    if (filter === 'completed'){
        tasksForTodoList = tasksForTodoList.filter(f => f.isDone)
    }

    let changeFilter = (value:FilterValuesType) => {
        setFilter(value)
    }

    let changeTaskStatus = (id: string, isDone: boolean) => {
        setTasks(task.map(m=>m.id === id?{...m,isDone}:m))
    }

    return (
        <div className="App">
            <TodoList
                title={"what to learn"}
                tasks={tasksForTodoList}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
            />
        </div>
    );
}

export  type FilterValuesType = 'all' | 'active' | 'completed'

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}

