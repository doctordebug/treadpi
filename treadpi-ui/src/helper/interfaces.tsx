export type  Status = {
    speed: number,
    meters: number,
    time_in_millis: number,
    colts: number
}

export type ProgramShortDescription = {
    id: string,
    name: string,
    description: string,
    allowUserParams: boolean,
    userParams?: ProgramParameter[]
}

export type ProgramParameter = {
    name: string,
    label: string,
    value: number,
    min: number,
    max: number
}

export interface WorkoutProgram  {
  id: string
  name: string
  description: string
  parameters: Parameters
  steps: Step[]
}

export interface Parameters {
  allowUserParams: boolean
  fields: ProgramParameter[]
}

export interface Step {
  type: string
  durationSec?: number
  speed?: string
  repeat?: number
  steps?: Step[]
}