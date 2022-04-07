import React from 'react';

type ButtonType = {
    callBack: () => void,
    title: string,
    className?: string,
}

export const Button = ({callBack, title, className, ...props}: ButtonType) => {

    let onClickHandler = () => {
        callBack()
    }

    return (
        <button className={className} onClick={onClickHandler}>{title}</button>
    );
};