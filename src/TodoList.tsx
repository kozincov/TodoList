import React, {ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from '@material-ui/icons';

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

    const callBackHandlerAddTask = (title: string) => {
        addTask(todoListId, title)
    }

    const onClickHandlerAll = () => {
        changeFilter(todoListId, "all")
    }
    const onClickHandlerActive = () => {
        changeFilter(todoListId, "active")
    }
    const onClickHandlerCompleted = () => {
        changeFilter(todoListId, "completed")
    }

    const onClickHandlerRemoveTodoList = () => {
        removeTodoList(todoListId)
    }

    const callBackForEditableSpan = (tId: string, title: string) => {
        props.updateTask(todoListId, tId, title)
    }

    const callBackForEditableSpanTodo = (title: string) => {
        props.updateTodoList(todoListId, title)
    }


    return (
        <div>
            <h3>
                <EditableSpan value={title} callBackForEditableSpan={callBackForEditableSpanTodo}/>
                <IconButton onClick={onClickHandlerRemoveTodoList}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={callBackHandlerAddTask}/>
            <div>
                {tasks.map(task => {
                        const onClickHandler = () => {
                            removeTask(todoListId, task.id)
                        }
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            let newIsDoneValue = e.currentTarget.checked
                            changeTaskStatus(todoListId, task.id, newIsDoneValue)
                        };
                        return (
                            <div key={task.id} className={task.isDone ? 'is-done' : ''}>
                                <Checkbox color='primary' onChange={onChangeHandler} checked={task.isDone}/>
                                <EditableSpan value={task.title}
                                              callBackForEditableSpan={(title) => callBackForEditableSpan(task.id, title)}/>
                                <IconButton onClick={onClickHandler}>
                                    <Delete/>
                                </IconButton>
                            </div>
                        )
                    }
                )}
            </div>
            <div>
                <Button variant={filter === 'all' ? 'outlined' : 'text'}
                        onClick={onClickHandlerAll}
                        color='inherit'>All</Button>
                <Button variant={filter === 'active' ? 'outlined' : 'text'}
                        onClick={onClickHandlerActive}
                        color='primary'>Active</Button>
                <Button variant={filter === 'completed' ? 'outlined' : 'text'}
                        onClick={onClickHandlerCompleted}
                        color='secondary'>Completed</Button>
            </div>
        </div>
    );
};
