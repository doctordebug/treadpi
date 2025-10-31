import * as React from 'react';
import { Status } from '../helper/interfaces';
import { pretifyMeters, pretifySeconds } from '../helper/utils';
import ValueWithLabel from './UIElements.tsx/ValueWithLabel';

interface ITreadmillStatus {
  speed: number
}

const CurrentSpeedComponent = (props:ITreadmillStatus) => {

    return (
        <ValueWithLabel 
        unit="KMH"
        value={Math.round(props.speed) +".0"}
        description=""
        style='xxl'
        />
    )
}

export default CurrentSpeedComponent;