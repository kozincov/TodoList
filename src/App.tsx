import React from 'react';
import './App.css';
import {TodoList} from "./TodoList";

export const App = () => {

    let task1 = [
        {id: 1, title: 'HTML', isDone: true},
        {id: 2, title: 'CSS', isDone: true},
        {id: 3, title: 'React', isDone: true},
    ]
    let task2 = [
        {id: 1, title: 'HTML', isDone: true},
        {id: 2, title: 'CSS', isDone: true},
        {id: 3, title: 'React', isDone: true},
    ]


    return (
        <div className="App">
            <TodoList title={"what to learn"} tasks={task1}/>
            <TodoList title={"what to buy"} tasks={task2}/>
        </div>
    );
}

export type TaskType = {
    id: number,
    title: string,
    isDone: boolean,
}

