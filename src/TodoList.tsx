import React from 'react';
import {TaskType} from "./App";

export type TodoListType = {
    title: string,
    tasks: TaskType[],
}

export const TodoList = ({title,tasks, ...props}: TodoListType) => {
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {tasks.map(task=>
                <li key={task.id}>
                    <input type="checkbox" checked={task.isDone}/>
                    <span>{task.title}</span>
                    <button>x</button>
                </li>
                )}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
};
