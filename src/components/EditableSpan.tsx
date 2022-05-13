import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@mui/material";

export const EditableSpan = React.memo(({value, callBackForEditableSpan}: EditableSpanType) => {

    let [title, setTitle] = useState(value)
    let [editMode, setEditMode] = useState(false)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onBlurHandler = () => {
        setEditMode(false)
        callBackForEditableSpan(title)
    }

    const onDoubleHandler = () => {
        setEditMode(true)
    }

    return (
        editMode
            ?
            <TextField variant={'outlined'} value={title} onChange={onChangeHandler} autoFocus onBlur={onBlurHandler}/>
            : <span onDoubleClick={onDoubleHandler}>{value}</span>
    );
});

export type EditableSpanType = {
    value: string,
    callBackForEditableSpan: (newValue: string) => void
}