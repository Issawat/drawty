import { PenEvent } from '../types/common'
import { PenDeviceState } from '../types/device'

export function transformPenEventToPenState(event: PenEvent) {
  const penDeviceState: PenDeviceState = {
    id: event.pointerId,
    deviceType: event.pointerType,
    client: {
      x: event.clientX,
      y: event.clientY
    },
    tilt: {
      x: event.tiltX,
      y: event.tiltY
    },
    width: event.width,
    height: event.height,
    pressure: event.pressure,
    altitudeAngle: event.altitudeAngle,
    azimuthAngle: event.azimuthAngle,
    buttons: event.buttons,
    twist: event.twist
  }
  return penDeviceState
}
