import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from "./App";
import {Button} from "./components/Button";

export type TodoListType = {
    title: string,
    tasks: TaskType[],
    removeTask: (todoListId: string, id: string) => void,
    changeFilter: (todoListId: string, value: FilterValuesType) => void,
    addTask: (todoListId: string, title: string) => void,
    changeTaskStatus:(todoListId: string, id:string, isDone:boolean)=>void,
    filter: string,
    todoListId:string,
}

export const TodoList = ({
                             title,
                             tasks,
                             removeTask,
                             changeFilter,
                             addTask,
                             changeTaskStatus,
                             filter,
                             todoListId,
                             ...props}: TodoListType) => {

    let [inputTitle, setInputTitle] = useState('')

    let [error, setError] = useState<string | null>(null)

    let callBackHandler = () => {
        if (inputTitle.trim() !== '') {
            addTask(todoListId, inputTitle)
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
        changeFilter(todoListId, "all")
    }
    let onClickHandlerActive = () => {
        changeFilter(todoListId, "active")
    }
    let onClickHandlerCompleted = () => {
        changeFilter(todoListId, "completed")
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
                            removeTask(todoListId, task.id)
                        }
                    let onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
                            let newIsDoneValue = e.currentTarget.checked
                            changeTaskStatus(todoListId, task.id, newIsDoneValue)
                    };
                        return (
                            <li key={task.id} className={task.isDone ? 'is-done' : ''}>
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
