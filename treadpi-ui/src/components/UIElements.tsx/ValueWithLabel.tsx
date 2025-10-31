import * as React from 'react';
import Row from './Row';

interface IValueWithLabelProps {
  value: string,
  unit:string,
  description: string
  style?:string
}

const ValueWithLabel = (props:IValueWithLabelProps) => {

    return (
      <div className={`valueWithLabel statusComponent ${props.style ?? ""}`}>
        <div className='description'>{props.description}</div>
        <Row>
        <div className='unit'>{props.unit}</div>
        <div className='value'>{props.value}</div>
        </Row>
      </div>
    )
}

export default ValueWithLabel;