import * as React from 'react';
import { Status } from '../helper/interfaces';
import { pretifyMeters, pretifySeconds } from '../helper/utils';
import ValueWithLabel from './UIElements.tsx/ValueWithLabel';

interface ITreadmillStatus {
  distance: number
}

const CurrentDistanceComponent = (props:ITreadmillStatus) => {

    return (
        <ValueWithLabel 
        unit="KM"
        value={pretifyMeters(props.distance)}
        description=""
        />
    )
}

export default CurrentDistanceComponent;