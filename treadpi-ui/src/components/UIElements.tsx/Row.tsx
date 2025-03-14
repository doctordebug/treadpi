import * as React from 'react';

interface RequireType {
    children: React.ReactNode | React.ReactNode[] | string;
    justifyContent?: "center" | "left" | "right"
    id?: string
}

const Row = (props: RequireType) => {

    return (
        <div className={"row" + (props.justifyContent ? " " +props.justifyContent : "")} id={props.id ?? `id-${Math.round(Math.random()*10000)}`}>
            {props.children}
        </div>
    )
}

export default Row;