import * as React from "react";
import { Status } from "../helper/interfaces";
import { convertKmHToPace, pretifyMeters, pretifySeconds } from "../helper/utils";
import ValueWithLabel from "./UIElements.tsx/ValueWithLabel";
import Row from "./UIElements.tsx/Row";

interface ITreadmillStatus {
  speed: number;
}

const CurrentSpeedComponent = (props: ITreadmillStatus) => {
  return (
    <Row direction="vertical">
    <ValueWithLabel
      unit="KMH"
      value={<Row>{(props.speed ?? 0).toFixed(2)}</Row>}
      description=""
      style="xxl"
    />
    <ValueWithLabel
      unit="min/km"
      value={<Row>{convertKmHToPace(props.speed)}</Row>}
      description=""
      style="m"
    />
    </Row>
  );
};

export default CurrentSpeedComponent;
