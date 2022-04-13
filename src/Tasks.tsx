import React, {ChangeEvent} from 'react';
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./components/EditableSpan";
import {Delete} from "@material-ui/icons";
import {useDispatch} from "react-redux";
import {TaskType} from "./App";

export type TasksPropsType = {
    task: TaskType[]
    todoListId: string
}

export const Tasks = ({task, todoListId}: TasksPropsType) => {

    const dispatch = useDispatch()

    const callBackForEditableSpan = (tId: string, title: string) => {
        dispatch(changeTaskTitleAC(todoListId, tId, title))
    }

    return (
        <div>
            {
                task.map(task => {
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
                )
            }
        </div>
    );
};

