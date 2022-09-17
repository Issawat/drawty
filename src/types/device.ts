import { Axis2D } from "./common";

export type PenDeviceState = {
  id: number | null;
  deviceType: string | null;
  tilt: Axis2D;
  client: Axis2D;
  width?: number;
  height?: number;
  pressure?: number;
  buttons?: number;
  twist?: number;
  altitudeAngle?: number;
  azimuthAngle?: number;
};
