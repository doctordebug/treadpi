import * as React from 'react';

interface RequireType {
    children: React.ReactNode | React.ReactNode[] | string;
    justifyContent?: "center" | "left" | "right" | "space-between"
    id?: string;
    direction?: "horizontal" | "vertical"
}

const Row = (props: RequireType) => {

    return (
        <div className={"row" + (props.justifyContent ? " " +props.justifyContent : "") + (props.direction ? " direction-"+props.direction : "")} id={props.id ?? `id-${Math.round(Math.random()*10000)}`}>
            {props.children}
        </div>
    )
}

export default Row;