import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";

export const App = () => {

    let [task,setTasks] = useState<TaskType[]>([
        {id: 1, title: 'HTML', isDone: true},
        {id: 2, title: 'CSS', isDone: true},
        {id: 3, title: 'React', isDone: true},
    ]);

    let removeTask = (id:number) => {
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

    return (
        <div className="App">
            <TodoList
                title={"what to learn"}
                tasks={tasksForTodoList}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export  type FilterValuesType = 'all' | 'active' | 'completed'

export type TaskType = {
    id: number,
    title: string,
    isDone: boolean,
}

