import React from 'react';
import {FilterValuesType, TaskType} from "./App";
import {Button} from "./components/Button";

export type TodoListType = {
    title: string,
    tasks: TaskType[],
    removeTask: (id: number) => void,
    changeFilter: (value: FilterValuesType) => void,
}

export const TodoList = ({title, tasks, removeTask,changeFilter, ...props}: TodoListType) => {

    let onClickHandlerAll = () => {changeFilter("all")}
    let onClickHandlerActive = () => {changeFilter("active")}
    let onClickHandlerCompleted = () => {changeFilter("completed")}

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
                <Button callBack={onClickHandlerAll} title={'All'}/>
                <Button callBack={onClickHandlerActive} title={'Active'}/>
                <Button callBack={onClickHandlerCompleted} title={'Completed'}/>
            </div>
        </div>
    );
};
