import * as React from 'react';
import Button from '../elements/Button';
import { pause, start, stop } from '../helper/api';
import Row from './UIElements.tsx/Row';

const StartStopComponent = () => {

    return (
        <Row id='start-stop'>
            <Button onClick={pause}>Pause</Button>
            <Button onClick={start} type='primary'>Start</Button>
            <Button onClick={stop}>Stop</Button>
        </Row>
    )
}

export default StartStopComponent;