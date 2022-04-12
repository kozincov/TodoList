import React from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from '@material-ui/icons';
import {
    addTodoListAC,
    changeFilterTodoListAC,
    changeTitleTodoListAC,
    removeTodoListAC
} from "./state/todo-lists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export const AppWithRedux = () => {

    const todoLists = useSelector<AppRootStateType, TodoListsType[]>(state => state.todoLists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch();

    const updateTodoList = (todoListId: string, title: string) => {
        dispatch(changeTitleTodoListAC(todoListId, title))
    }

    const updateTask = (todoListId: string, id: string, title: string) => {
        dispatch(changeTaskTitleAC(todoListId, id, title))
    }

    const removeTodoList = (todoListId: string) => {
        dispatch(removeTodoListAC(todoListId))
        dispatch(removeTodoListAC(todoListId))
    }

    const addTask = (todoListId: string, title: string) => {
        dispatch(addTaskAC(todoListId, title))
    }

    const removeTask = (todoListId: string, id: string) => {
        dispatch(removeTaskAC(todoListId, id))
    }

    const changeFilter = (todoListId: string, value: FilterValuesType) => {
        dispatch(changeFilterTodoListAC(todoListId, value))
    }

    const changeTaskStatus = (todoListId: string, id: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(todoListId, id, isDone))
    }

    const addTodoList = (title: string) => {
        dispatch(addTodoListAC(title))
    }

    return (
        <div className="App">
            <AppBar position={"static"}>
                <Toolbar>
                    <IconButton edge={"start"} color={"inherit"} aria-label={"menu"}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={"h6"}>
                        News
                    </Typography>
                    <Button color={"inherit"}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todoLists.map(m => {
                            let tasksForTodoList = tasks[m.id];

                            if (m.filter === 'active') {
                                tasksForTodoList = tasksForTodoList.filter(f => !f.isDone)
                            }

                            if (m.filter === 'completed') {
                                tasksForTodoList = tasksForTodoList.filter(f => f.isDone)
                            }
                            return <Grid item key={m.id}>
                                <Paper style={{padding: "10px"}}>
                                    <TodoList
                                        todoListId={m.id}
                                        title={m.title}
                                        tasks={tasksForTodoList}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeTaskStatus}
                                        filter={m.filter}
                                        removeTodoList={removeTodoList}
                                        updateTodoList={updateTodoList}
                                        updateTask={updateTask}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export  type FilterValuesType = 'all' | 'active' | 'completed'

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean,
}

export type TodoListsType = {
    id: string,
    title: string,
    filter: string,
}

export type TasksStateType = {
    [key: string]: TaskType[],
}