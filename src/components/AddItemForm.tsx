import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@mui/material";
import {AddBox} from "@mui/icons-material";

export const AddItemForm = React.memo(({addItem}: AddItemFormType) => {

    let [inputTitle, setInputTitle] = useState('')
    let [error, setError] = useState<boolean>(false)

    const callBackHandler = () => {
        if (inputTitle.trim() !== '') {
            addItem(inputTitle)
            setInputTitle('')
        } else {
            setError(true)
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setInputTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {

        if (e.charCode === 13) {
            callBackHandler();
        }
    }

    return (
        <div>
            <TextField variant={'outlined'}
                       value={inputTitle}
                       onChange={onChangeHandler}
                       error={error}
                       onKeyPress={onKeyPressHandler}
                       label={'Title'}
                       helperText={error && 'Title is required'}
            />
            <IconButton color="primary" onClick={callBackHandler}>
                <AddBox/>
            </IconButton>
        </div>
    );
});

export type AddItemFormType = {
    addItem: (title: string) => void
}