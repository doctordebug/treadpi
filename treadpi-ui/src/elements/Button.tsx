import * as React from 'react';

type IButtonProperties = {
    onClick: () => void;
    children: any;
    type? : 'primary';
    variant?: 'small' | "speedControll";
}

const Button = (prop: IButtonProperties) => {
    return (
        <div onClick={prop.onClick} className={'btn btn-'+ (prop.type ?? 'default') + (prop.variant ? " btn-"+prop.variant : "") }>{prop.children}</div>
    )
}

export default Button;