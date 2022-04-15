import {action} from '@storybook/addon-actions'
import React from 'react'
import {EditableSpan} from "../components/EditableSpan";

export default {
    title: 'EditableSpan Component',
    component: EditableSpan
}

const changeCallback = action("Value changed")

export const EditableSpanFormBaseExample = () => {
    return <>
        <EditableSpan value={'Start value'} callBackForEditableSpan={changeCallback}/>
    </>
}