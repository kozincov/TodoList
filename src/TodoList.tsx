import React, {ChangeEvent} from 'react';
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from '@material-ui/icons';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TaskType, TodoListsType} from './App';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {changeFilterTodoListAC, changeTitleTodoListAC, removeTodoListAC} from "./state/todo-lists-reducer";

export type TodoListType = {
    todoListId: string,
}

export const TodoList = ({
                             todoListId,
                             ...props
                         }: TodoListType) => {

    const todoList = useSelector<AppRootStateType, TodoListsType>(state => state.todoLists
        .filter(f => f.id === todoListId)[0])

    let tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[todoListId])

    if (todoList.filter === 'active') {
        tasks = tasks.filter(f => !f.isDone)
    }

    if (todoList.filter === 'completed') {
        tasks = tasks.filter(f => f.isDone)
    }

    const dispatch = useDispatch();

    const callBackHandlerAddTask = (title: string) => {
        dispatch(addTaskAC(todoListId, title))
    }

    const onClickHandlerAll = () => {
        dispatch(changeFilterTodoListAC(todoListId, "all"))
    }
    const onClickHandlerActive = () => {
        dispatch(changeFilterTodoListAC(todoListId, "active"))
    }
    const onClickHandlerCompleted = () => {
        dispatch(changeFilterTodoListAC(todoListId, "completed"))
    }

    const onClickHandlerRemoveTodoList = () => {
        dispatch(removeTodoListAC(todoListId))
    }

    const callBackForEditableSpan = (tId: string, title: string) => {
        dispatch(changeTaskTitleAC(todoListId, tId, title))
    }

    const callBackForEditableSpanTodo = (title: string) => {
        dispatch(changeTitleTodoListAC(todoListId, title))
    }


    return (
        <div>
            <h3>
                <EditableSpan value={todoList.title} callBackForEditableSpan={callBackForEditableSpanTodo}/>
                <IconButton onClick={onClickHandlerRemoveTodoList}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={callBackHandlerAddTask}/>
            <div>
                {tasks.map(task => {
                        const onClickHandler = () => {
                            dispatch(removeTaskAC(todoListId, task.id))
                        }
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            let newIsDoneValue = e.currentTarget.checked
                            dispatch(changeTaskStatusAC(todoListId, task.id, newIsDoneValue))
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
                <Button variant={todoList.filter === 'all' ? 'outlined' : 'text'}
                        onClick={onClickHandlerAll}
                        color='inherit'>All</Button>
                <Button variant={todoList.filter === 'active' ? 'outlined' : 'text'}
                        onClick={onClickHandlerActive}
                        color='primary'>Active</Button>
                <Button variant={todoList.filter === 'completed' ? 'outlined' : 'text'}
                        onClick={onClickHandlerCompleted}
                        color='secondary'>Completed</Button>
            </div>
        </div>
    );
};
