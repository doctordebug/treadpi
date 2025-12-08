import * as React from 'react';
import Button from '../elements/Button';
import { pause, start, stop } from '../helper/api';
import Row from './UIElements.tsx/Row';
import { WorkoutSteps } from './ActiveWorkout';
import { convertKmHToPace, pretifySeconds, pretifySecondsShort } from '../helper/utils';

interface CurrentStepComponentProps {
    currentStep: WorkoutSteps
}

const CurrentStepComponent = (props:CurrentStepComponentProps) => {

    const printStep = (step:WorkoutSteps) =>  {
        if(!step || !step.durationSec || !step.speed){
            return ""
        }
        return `Pace ${convertKmHToPace(step.speed)} min/km for ${pretifySecondsShort(step.durationSec * 1000)} min`;
    }

    return (
        <Row justifyContent='center'>
            {printStep(props.currentStep)}
        </Row>
    )
}

export default CurrentStepComponent;