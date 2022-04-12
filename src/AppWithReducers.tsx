import React, {useReducer} from 'react';
import {v1} from 'uuid';
import './App.css';
import {TodoList} from "./TodoList";
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from '@material-ui/icons';
import {
    addTodoListAC,
    changeFilterTodoListAC,
    changeTitleTodoListAC,
    removeTodoListAC,
    todoListsReducer
} from "./state/todo-lists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TasksReducer} from "./state/tasks-reducer";

export const AppWithReducers = () => {

    let todoListId1 = v1();
    let todoListId2 = v1();

    let [todoLists, dispatchToTodoList] = useReducer(todoListsReducer, [
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, dispatchToTasks] = useReducer(TasksReducer, {
        [todoListId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todoListId2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });

    const updateTodoList = (todoListId: string, title: string) => {
        dispatchToTodoList(changeTitleTodoListAC(todoListId, title))
    }

    const updateTask = (todoListId: string, id: string, title: string) => {
        dispatchToTasks(changeTaskTitleAC(todoListId, id, title))
    }

    const removeTodoList = (todoListId: string) => {
        dispatchToTodoList(removeTodoListAC(todoListId))
        dispatchToTasks(removeTodoListAC(todoListId))
    }

    const addTask = (todoListId: string, title: string) => {
        dispatchToTasks(addTaskAC(todoListId, title))
    }

    const removeTask = (todoListId: string, id: string) => {
        dispatchToTasks(removeTaskAC(todoListId, id))
    }

    const changeFilter = (todoListId: string, value: FilterValuesType) => {
        dispatchToTodoList(changeFilterTodoListAC(todoListId, value))
    }

    const changeTaskStatus = (todoListId: string, id: string, isDone: boolean) => {
        dispatchToTasks(changeTaskStatusAC(todoListId, id, isDone))
    }

    const addTodoList = (title: string) => {
        let action = addTodoListAC(title)
        dispatchToTodoList(action)
        dispatchToTasks(action)
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