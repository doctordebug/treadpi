import * as React from 'react';
import { Status } from '../helper/interfaces';
import { convertKmHToPace, pretifyMeters, pretifySeconds } from '../helper/utils';
import CurrentSpeedComponent from './CurrentSpeedComponent';
import CurrentTimeComponent from './CurrentTimeComponent';
import CurrentDistanceComponent from './CurrentDistanceComponent';
import Row from './UIElements.tsx/Row';
import { setSpeed } from '../helper/api';
import Button from '../elements/Button';

interface ISetSpeedProps {
  speed: number
}

const SetSpeedComponent = (props:ISetSpeedProps) => {

    return (
      <Row justifyContent='center'>
        <Button onClick={() => setSpeed(props.speed)} type='primary' variant='small'>
          <div className='speed'>
            {props.speed}
          </div>
          <div className='unit'>km/h</div>
          <div className='pace'>
            {convertKmHToPace(props.speed)}
          </div>
          <div className='unit'>min/km</div>
        </Button>
      </Row>
    )
}

export default SetSpeedComponent;