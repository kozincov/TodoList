import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from "./App";
import {Button} from "./components/Button";

export type TodoListType = {
    title: string,
    tasks: TaskType[],
    removeTask: (id: string) => void,
    changeFilter: (value: FilterValuesType) => void,
    addTask: (title: string) => void,
}

export const TodoList = ({title, tasks, removeTask, changeFilter, addTask, ...props}: TodoListType) => {

    let [inputTitle, setInputTitle] = useState('')

    let callBackHandler = () => {
        addTask(inputTitle)
        setInputTitle('')
    }
    let onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputTitle(e.currentTarget.value)
    }

    let onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            callBackHandler();
        }
    }

    let onClickHandlerAll = () => {
        changeFilter("all")
    }
    let onClickHandlerActive = () => {
        changeFilter("active")
    }
    let onClickHandlerCompleted = () => {
        changeFilter("completed")
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input
                    value={inputTitle}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                />
                <Button callBack={callBackHandler} title={'+'}/>
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
