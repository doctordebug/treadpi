import * as React from 'react';
import ControllComponent from "./ControllComponent"
import StartStopComponent from "./StartStopComponent"
import StatusComponent from "./StatusComponent"
import { useQuery } from 'react-query';
import {  updateStatus } from '../helper/api';
import { ProgramParameter, WorkoutProgram } from '../helper/interfaces';

interface ActiveWorkoutProps {
  selectedProgram: WorkoutProgram
}

interface WorkoutStepsWithParameters {
  steps: WorkoutSteps[]
}

interface WorkoutSteps {
  durationSec: number,
  speed: number, 
}

const ActiveWorkout = (props: ActiveWorkoutProps ) => {

  const {selectedProgram} = props

  const {data} = useQuery("status", updateStatus, {
    refetchInterval: 1000
  });

  const buildWorkout = (program:WorkoutProgram, parameter:ProgramParameter[]) : WorkoutStepsWithParameters =>{
    let steps : WorkoutSteps[] = [] 
    if(!program){
      return {steps: steps};
    }
    if(!program.parameters.allowUserParams){
      return {steps:  program.steps.map(s => {
        return {durationSec: s.durationSec, speed: Number(s.speed)}})}
    }
    //build program steps by replacing parameters
    program.steps.forEach(s => {
      if(s.type === 'speed' && s.speed.includes('param')){
        steps.push(
          {durationSec: s.durationSec ?? 0, speed: parameter.find(p => p.name === s.speed)?.value ?? 0}
        )
      }
    })
    return {steps: steps};
  }

  React.useEffect(() => {
    //TODO: Build loops
    console.log(selectedProgram)
  }, [selectedProgram]);  

return (
    <>
        <StatusComponent treadmillStatus={data}/>
        <ControllComponent treadmillStatus={data}/>
        <StartStopComponent/>
    </>
)
}

export default ActiveWorkout;