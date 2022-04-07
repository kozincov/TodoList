import React, {ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from "./App";
import {Button} from "./components/Button";
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";

export type TodoListType = {
    title: string,
    tasks: TaskType[],
    removeTask: (todoListId: string, id: string) => void,
    changeFilter: (todoListId: string, value: FilterValuesType) => void,
    addTask: (todoListId: string, title: string) => void,
    changeTaskStatus: (todoListId: string, id: string, isDone: boolean) => void,
    filter: string,
    todoListId: string,
    removeTodoList: (todoListId: string) => void,
    updateTodoList: (todoListId: string, title: string) => void,
    updateTask: (todoListId: string, id: string, title: string) => void,
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
                             removeTodoList,
                             ...props
                         }: TodoListType) => {

    let callBackHandlerAddTask = (title: string) => {
        addTask(todoListId, title)
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

    let onClickHandlerRemoveTodoList = () => {
        removeTodoList(todoListId)
    }

    let callBackForEditableSpan = (tId: string, title: string) => {
        props.updateTask(todoListId, tId, title)
    }

    let callBackForEditableSpanTodo = (title: string) => {
        props.updateTodoList(todoListId, title)
    }


    return (
        <div>
            <h3>
                <EditableSpan value={title} callBackForEditableSpan={callBackForEditableSpanTodo}/>
                <Button callBack={onClickHandlerRemoveTodoList} title={'X'}/>
            </h3>
            <AddItemForm addItem={callBackHandlerAddTask}/>
            <ul>
                {tasks.map(task => {
                        let onClickHandler = () => {
                            removeTask(todoListId, task.id)
                        }
                        let onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            let newIsDoneValue = e.currentTarget.checked
                            changeTaskStatus(todoListId, task.id, newIsDoneValue)
                        };
                        return (
                            <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                                <input type="checkbox" onChange={onChangeHandler} checked={task.isDone}/>
                                <EditableSpan value={task.title}
                                              callBackForEditableSpan={(title) => callBackForEditableSpan(task.id, title)}/>
                                <Button callBack={onClickHandler} title={'x'}/>
                            </li>
                        )
                    }
                )}
            </ul>
            <div>
                <Button className={filter === 'all' ? 'active-filter' : ''} callBack={onClickHandlerAll} title={'All'}/>
                <Button className={filter === 'active' ? 'active-filter' : ''} callBack={onClickHandlerActive}
                        title={'Active'}/>
                <Button className={filter === 'completed' ? 'active-filter' : ''} callBack={onClickHandlerCompleted}
                        title={'Completed'}/>
            </div>
        </div>
    );
};
