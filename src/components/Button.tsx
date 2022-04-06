import React from 'react';

type ButtonType = {
    callBack: () => void,
    title: string,
}

export const Button = ({callBack, title, ...props}: ButtonType) => {

    let onClickHandler = () => {
        callBack()
    }

    return (
        <div>
            <button onClick={onClickHandler}>{title}</button>
        </div>
    );
};