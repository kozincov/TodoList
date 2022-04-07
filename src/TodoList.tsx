import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from "./App";
import {Button} from "./components/Button";

export type TodoListType = {
    title: string,
    tasks: TaskType[],
    removeTask: (id: string) => void,
    changeFilter: (value: FilterValuesType) => void,
    addTask: (title: string) => void,
    changeTaskStatus:(id:string, isDone:boolean)=>void,
    filter: string,
}

export const TodoList = ({
                             title,
                             tasks,
                             removeTask,
                             changeFilter,
                             addTask,
                             changeTaskStatus,
                             filter,
                             ...props}: TodoListType) => {

    let [inputTitle, setInputTitle] = useState('')

    let [error, setError] = useState<string | null>(null)

    let callBackHandler = () => {
        if (inputTitle.trim() !== '') {
            addTask(inputTitle)
            setInputTitle('')
        } else {
            setError('Title is required')
        }
    }
    let onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputTitle(e.currentTarget.value)
    }

    let onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
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
                    className={error ? 'error' : ''}
                    onKeyPress={onKeyPressHandler}
                />
                <Button callBack={callBackHandler} title={'+'}/>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            <ul>
                {tasks.map(task => {
                        let onClickHandler = () => {
                            removeTask(task.id)
                        }
                    let onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
                            let newIsDoneValue = e.currentTarget.checked
                            changeTaskStatus(task.id, newIsDoneValue)
                    };
                        return (
                            <li key={task.id}>
                                <input type="checkbox" onChange={onChangeHandler} checked={task.isDone}/>
                                <span>{task.title}</span>
                                <Button callBack={onClickHandler} title={'x'}/>
                            </li>
                        )
                    }
                )}
            </ul>
            <div>
                <Button className={filter === 'all' ? 'active-filter' : ''} callBack={onClickHandlerAll} title={'All'}/>
                <Button className={filter === 'active' ? 'active-filter' : ''} callBack={onClickHandlerActive} title={'Active'}/>
                <Button className={filter === 'completed' ? 'active-filter' : ''} callBack={onClickHandlerCompleted} title={'Completed'}/>
            </div>
        </div>
    );
};
