import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";

export const App = () => {

    let [task,setTasks] = useState([
        {id: 1, title: 'HTML', isDone: true},
        {id: 2, title: 'CSS', isDone: true},
        {id: 3, title: 'React', isDone: true},
    ]);

    let removeTask = (id:number) => {
        let filteredTasks = task.filter(f=>f.id !== id)
        setTasks(filteredTasks)
    }

    return (
        <div className="App">
            <TodoList title={"what to learn"} tasks={task} removeTask={removeTask}/>
        </div>
    );
}

export type TaskType = {
    id: number,
    title: string,
    isDone: boolean,
}

