import * as React from 'react';
import { Status } from '../helper/interfaces';
import { pretifyMeters, pretifySeconds } from '../helper/utils';
import CurrentSpeedComponent from './CurrentSpeedComponent';
import CurrentTimeComponent from './CurrentTimeComponent';
import CurrentDistanceComponent from './CurrentDistanceComponent';
import Row from './UIElements.tsx/Row';

interface ITreadmillStatus {
  treadmillStatus: Status
}

const StatusComponent = (props:ITreadmillStatus) => {

    return (
      <div className='status-component'>
      <Row justifyContent='center'>
        <CurrentTimeComponent time={props.treadmillStatus?.time_in_millis}/>
        <CurrentDistanceComponent distance={props.treadmillStatus?.meters}/>
        </Row>
      <Row justifyContent='center'>
        <CurrentSpeedComponent speed={props.treadmillStatus?.speed}/>
      </Row>
      </div>
    )
}

export default StatusComponent;