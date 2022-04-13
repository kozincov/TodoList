import React, {useCallback} from 'react';
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from '@material-ui/icons';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TaskType, TodoListsType} from './App';
import {addTaskAC} from "./state/tasks-reducer";
import {changeFilterTodoListAC, changeTitleTodoListAC, removeTodoListAC} from "./state/todo-lists-reducer";
import {Tasks} from "./Tasks";

export type TodoListType = {
    todoListId: string,
}

export const TodoList = React.memo(({
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

    const callBackHandlerAddTask = useCallback((title: string) => {
        dispatch(addTaskAC(todoListId, title))
    }, [dispatch, todoListId])

    const onClickHandlerAll = useCallback(() => {
        dispatch(changeFilterTodoListAC(todoListId, "all"))
    }, [dispatch, todoListId])

    const onClickHandlerActive = useCallback(() => {
        dispatch(changeFilterTodoListAC(todoListId, "active"))
    }, [dispatch, todoListId])

    const onClickHandlerCompleted = useCallback(() => {
        dispatch(changeFilterTodoListAC(todoListId, "completed"))
    }, [dispatch, todoListId])

    const onClickHandlerRemoveTodoList = useCallback(() => {
        dispatch(removeTodoListAC(todoListId))
    }, [dispatch, todoListId])

    const callBackForEditableSpanTodo = useCallback((title: string) => {
        dispatch(changeTitleTodoListAC(todoListId, title))
    }, [dispatch, todoListId])


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
                {
                    tasks.map(m => {
                        return (
                            <Tasks key={m.id} task={m} todoListId={todoListId}/>
                        )
                    })
                }
            </div>
            < div>
                < Button variant={todoList.filter === 'all' ? 'outlined' : 'text'}
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
});
