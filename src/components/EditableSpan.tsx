import React, {ChangeEvent, useState} from 'react';

export const EditableSpan = ({value, callBackForEditableSpan, ...props}: EditableSpanType) => {

    let [title, setTitle] = useState(value)
    let [editMode, setEditMode] = useState(false)

    let onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    let onBlurHandler = () => {
        setEditMode(false)
        callBackForEditableSpan(title)
    }

    let onDoubleHandler = () => {
        setEditMode(true)
    }

    return (
        editMode
            ? <input value={title} onChange={onChangeHandler} autoFocus onBlur={onBlurHandler}/>
            : <span onDoubleClick={onDoubleHandler}>{value}</span>
    );
};

export type EditableSpanType = {
    value: string,
    callBackForEditableSpan: (newValue: string) => void
}