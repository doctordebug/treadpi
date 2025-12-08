import * as React from "react";
import ControllComponent from "./ControllComponent";
import StartStopComponent from "./StartStopComponent";
import StatusComponent from "./StatusComponent";
import { useQuery } from "react-query";
import { setSpeed, updateStatus } from "../helper/api";
import { ProgramParameter, Step, WorkoutProgram } from "../helper/interfaces";
import CurrentStepComponent from "./CurrentStep";

interface ActiveWorkoutProps {
  selectedProgram: WorkoutProgram;
}

interface WorkoutStepsWithParameters {
  steps: WorkoutSteps[];
}

export interface WorkoutSteps {
  durationSec: number;
  speed: number;
}

const ActiveWorkout = (props: ActiveWorkoutProps) => {
  const { selectedProgram } = props;

  const { data } = useQuery("status", updateStatus, {
    refetchInterval: 1000,
  });

  const [workoutWithParameters, setWorkoutWithParameters] = React.useState<WorkoutStepsWithParameters>();  
  const [currentStep, setCurrentStep] = React.useState<WorkoutSteps>();

  const handleSpeed = (
    s: Step,
    steps: WorkoutSteps[],
    parameter: ProgramParameter[]
  ) => {
    if (s.speed.includes("param")) {
      steps.push({
        durationSec: s.durationSec ?? 0,
        speed: parameter.find((p) => `param.${p.name}` === s.speed)?.value ?? 0,
      });
    } else {
      steps.push({
        durationSec: s.durationSec ?? 0,
        speed: Number(s.speed ?? 0),
      });
    }
  };

  const buildWorkout = (
    program: WorkoutProgram
  ): WorkoutStepsWithParameters => {
    let steps: WorkoutSteps[] = [];
    if (!program) {
      return { steps: steps };
    }
    if (!program.parameters.allowUserParams) {
      return {
        steps: program.steps.map((s) => {
          return { durationSec: s.durationSec, speed: Number(s.speed) };
        }),
      };
    }
    //build program steps by replacing parameters
    const parameter = program.parameters.fields;
    program.steps.forEach((s) => {
      if (s.type === "repeat") {
        const repeatCounter = s.repeat ?? 1;
        for (let i = 0; i <= repeatCounter; i++) {
          if (!s.steps) {
            //not a valid node
            continue;
          }
          s.steps.forEach((s) => {
            handleSpeed(s, steps, parameter);
          });
        }
      }

      if (s.type === "speed") {
        handleSpeed(s, steps, parameter);
      }
    });
    return { steps: steps };
  };


  
    function startProgram(program: WorkoutStepsWithParameters) {
      let currentStepIndex = 0;
      if(!program) return;
      function runNextStep() {
        const step = program.steps[currentStepIndex];
        
        setSpeed(step.speed); 
        setCurrentStep(step)
        setTimeout(() => {
          currentStepIndex++;
          if (currentStepIndex < program.steps.length) {
            runNextStep();
          } else {
            alert("DONE");
          }
        }, step.durationSec * 1000);
      }

      runNextStep();
    }
   

  React.useEffect(() => {
    console.log(selectedProgram);
    const workoutWithParams = buildWorkout(selectedProgram);
    console.log(workoutWithParams);
    setWorkoutWithParameters(workoutWithParams);

  }, [selectedProgram]);

  React.useEffect(() => {
    startProgram(workoutWithParameters)
  }, [workoutWithParameters]);


  return (
    <>
      <StatusComponent treadmillStatus={data} />
      <CurrentStepComponent currentStep={currentStep} />
      <ControllComponent treadmillStatus={data} />
      <StartStopComponent />
    </>
  );
};

export default ActiveWorkout;