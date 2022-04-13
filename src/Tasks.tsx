import React, {ChangeEvent, useCallback} from 'react';
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./components/EditableSpan";
import {Delete} from "@material-ui/icons";
import {useDispatch} from "react-redux";
import {TaskType} from "./App";

export type TasksPropsType = {
    task: TaskType
    todoListId: string
}

export const Tasks = React.memo(({task, todoListId}: TasksPropsType) => {

    const dispatch = useDispatch()

    const onTitleChangeHandler = useCallback((title: string) => {
        dispatch(changeTaskTitleAC(todoListId, task.id, title))
    }, [dispatch, todoListId, task.id]);

    const onClickHandler = useCallback(() => {
        dispatch(removeTaskAC(todoListId, task.id))
    }, [dispatch, todoListId, task.id]);

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        dispatch(changeTaskStatusAC(todoListId, task.id, newIsDoneValue))
    }, [dispatch, todoListId, task.id]);

    return (
        <div key={task.id} className={task.isDone ? 'is-done' : ''}>
            <Checkbox color='primary' onChange={onChangeHandler} checked={task.isDone}/>
            <EditableSpan value={task.title}
                          callBackForEditableSpan={onTitleChangeHandler}/>
            <IconButton onClick={onClickHandler}>
                <Delete/>
            </IconButton>
        </div>
    );
});
