import React from 'react';

interface ErrorPropsEntity{
    errorText: string,
}

export function ErrorBlock(props: ErrorPropsEntity): JSX.Element {
    return (
        <p>{props.errorText}</p>
    );
}
