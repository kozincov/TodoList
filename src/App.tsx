import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";

export const App = () => {

    let [task,setTasks] = useState([
        {id: 1, title: 'HTML', isDone: true},
        {id: 2, title: 'CSS', isDone: true},
        {id: 3, title: 'React', isDone: true},
    ]);


    return (
        <div className="App">
            <TodoList title={"what to learn"} tasks={task}/>
        </div>
    );
}

export type TaskType = {
    id: number,
    title: string,
    isDone: boolean,
}

