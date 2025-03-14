import * as React from 'react';
import { Status } from '../helper/interfaces';
import Row from './UIElements.tsx/Row';
import SetSpeedComponent from './SetSpeedComponent';

interface ITreadmillStatus {
  treadmillStatus: Status
}

const ControllComponent = (props:ITreadmillStatus) => {

    return (
      <Row justifyContent='center' id="controll">
        <SetSpeedComponent speed={10}/>
        <SetSpeedComponent speed={11}/>
        <SetSpeedComponent speed={12}/>
        <SetSpeedComponent speed={13}/>
        <SetSpeedComponent speed={14}/>
        <SetSpeedComponent speed={15}/>
        <SetSpeedComponent speed={16}/>
        <SetSpeedComponent speed={17}/>
        <SetSpeedComponent speed={18}/>
      </Row>
    )
}

export default ControllComponent;