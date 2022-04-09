import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

export const AddItemForm = ({addItem, ...props}: AddItemFormType) => {

    let [inputTitle, setInputTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const callBackHandler = () => {
        if (inputTitle.trim() !== '') {
            addItem(inputTitle)
            setInputTitle('')
        } else {
            setError('Title is required')
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            callBackHandler();
        }
    }

    return (
        <div>
            <TextField variant={'outlined'}
                       value={inputTitle}
                       onChange={onChangeHandler}
                       error={!!error}
                       onKeyPress={onKeyPressHandler}
                       label={'Title'}
                       helperText={error}
            />
            <IconButton color="primary" onClick={callBackHandler}>
                <AddBox/>
            </IconButton>
        </div>
    );
};

export type AddItemFormType = {
    addItem: (title: string) => void
}