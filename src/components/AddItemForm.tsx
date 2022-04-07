import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from "./Button";

export const AddItemForm = ({addItem, ...props}: AddItemFormType) => {

    let [inputTitle, setInputTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    let callBackHandler = () => {
        if (inputTitle.trim() !== '') {
            addItem(inputTitle)
            setInputTitle('')
        } else {
            setError('Title is required')
        }
    }

    let onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputTitle(e.currentTarget.value)
    }

    let onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            callBackHandler();
        }
    }

    return (
        <div>
            <input
                value={inputTitle}
                onChange={onChangeHandler}
                className={error ? 'error' : ''}
                onKeyPress={onKeyPressHandler}
            />
            <Button callBack={callBackHandler} title={'+'}/>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    );
};

export type AddItemFormType = {
    addItem: (title: string) => void
}