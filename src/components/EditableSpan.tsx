import React from 'react';

export const EditableSpan = ({value,...props}: EditableSpanType) => {
    return (
            <span>{value}</span>
    );
};

export type EditableSpanType = {
    value: string,
}