import React, {ChangeEvent, useCallback} from 'react';
import {deleteTaskTC, updateTaskStatusTC, updateTaskTitleTC,} from "./state/tasks-reducer";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./components/EditableSpan";
import {Delete} from "@mui/icons-material";
import {useDispatch} from "react-redux";
import {TaskStatuses, TaskType} from "./api/todoLists-api";

export type TasksPropsType = {
    task: TaskType
    todoListId: string
}

export const Tasks = React.memo(({task, todoListId}: TasksPropsType) => {

    const dispatch = useDispatch()

    const onTitleChangeHandler = useCallback((title: string) => {
        dispatch(updateTaskTitleTC(todoListId, task.id, title))
    }, [dispatch, todoListId, task.id]);

    const onClickHandler = useCallback(() => {
        dispatch(deleteTaskTC(todoListId, task.id))
    }, [dispatch, todoListId, task.id]);

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        dispatch(updateTaskStatusTC(todoListId, task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New))
    }, [dispatch, todoListId, task.id]);

    return (
        <div key={task.id} className={task.status === TaskStatuses.Completed ? 'is-done' : ''}>
            <Checkbox color='primary' onChange={onChangeHandler} checked={task.status === TaskStatuses.Completed}/>
            <EditableSpan value={task.title}
                          callBackForEditableSpan={onTitleChangeHandler}/>
            <IconButton onClick={onClickHandler}>
                <Delete/>
            </IconButton>
        </div>
    );
});
