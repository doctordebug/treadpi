import * as React from "react";
import { Status } from "../helper/interfaces";
import Row from "./UIElements.tsx/Row";
import SetSpeedComponent from "./SetSpeedComponent";
import Button from "../elements/Button";
import { setSpeed } from "../helper/api";

interface ITreadmillStatus {
  treadmillStatus: Status;
}

const ControllComponent = (props: ITreadmillStatus) => {
  return (
    <>
      <Row justifyContent="center">
        <Button variant="speedControll"
          onClick={() => {
            setSpeed(Math.max(0, props.treadmillStatus.speed - 1));
          }}
        >
          -1
        </Button>
        <Button variant="speedControll"
          onClick={() => {
            setSpeed(Math.max(0, props.treadmillStatus.speed - 0.2));
          }}
        >
          -
        </Button>
        <Button variant="speedControll"
          onClick={() => {
            setSpeed(Math.min(20, props.treadmillStatus.speed + 0.2));
          }}
        >
          +
        </Button>
        <Button variant="speedControll"
          onClick={() => {
            setSpeed(Math.min(20, props.treadmillStatus.speed + 1));
          }}
        >
          +1
        </Button>
      </Row>
      <Row justifyContent="center" id="controll">
        <SetSpeedComponent speed={6} />
        <SetSpeedComponent speed={8} />
        <SetSpeedComponent speed={10} />
        <SetSpeedComponent speed={12} />
        <SetSpeedComponent speed={14} />
        <SetSpeedComponent speed={16} />
        <SetSpeedComponent speed={18} />
        <SetSpeedComponent speed={20} />
      </Row>
    </>
  );
};

export default ControllComponent;
