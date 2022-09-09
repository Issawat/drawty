import { Axis2D } from './common'

export type DeviceStatus = {
  id: number
  width: number
  height: number
  pressure: number
  tilt: Axis2D
  client: Axis2D
  buttons: number
  twist: number
  altitudeAngle: number
  azimuthAngle: number
}
