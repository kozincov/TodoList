import React from 'react';
import {TaskType} from "./App";
import {Button} from "./components/Button";

export type TodoListType = {
    title: string,
    tasks: TaskType[],
    removeTask: (id: number) => void,
}

export const TodoList = ({title, tasks, removeTask, ...props}: TodoListType) => {


    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <Button callBack={() => {}} title={'+'}/>
            </div>
            <ul>
                {tasks.map(task => {
                        let onClickHandler = () => {
                            removeTask(task.id)
                        }
                        return (
                            <li key={task.id}>
                                <input type="checkbox" checked={task.isDone}/>
                                <span>{task.title}</span>
                                <Button callBack={onClickHandler} title={'x'}/>
                            </li>
                        )
                    }
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
