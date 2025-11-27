import * as React from 'react';
import ActiveWorkout from './ActiveWorkout';
import ProgramSelection from './ProgramSelection';
import { ProgramParameter, ProgramShortDescription, WorkoutProgram } from '../helper/interfaces';
import { loadProgramById } from '../helper/api';

const AppLayout = () => {
  
  const [selectedProgram, setSelectedProgram] = React.useState<WorkoutProgram>();
  //todo: make it an enum
  const [appState, setAppState] = React.useState<"SELECT_PROGRAM"|"RUNNING"|"SUMMARY">("SELECT_PROGRAM");

  const applyParamsToProgram = (shortProgram: ProgramShortDescription, fullPRogram:WorkoutProgram) => {
    const copy = fullPRogram;
    copy.parameters.fields = shortProgram.userParams;
    return copy;
  }

  const fetchFullProgram = (program: ProgramShortDescription) => {
    loadProgramById(program.id).then((prog) => {
      setSelectedProgram(applyParamsToProgram(program,prog));
      setAppState("RUNNING")
    })
  }

  return(      
  <div className="appLayout">
   {appState === "SELECT_PROGRAM" && <ProgramSelection onProgramSelected={(programSelection) => {fetchFullProgram(programSelection)}}/>}
   {appState === "RUNNING" && selectedProgram && <ActiveWorkout selectedProgram={selectedProgram}/>}
   {/*currentState === AppState.SUMMARY && <WorkoutSummary />*/}
  </div>
)
}

export default AppLayout;