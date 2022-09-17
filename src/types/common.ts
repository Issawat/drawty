export type PenEvent = PointerEvent & {
  altitudeAngle?: number
  azimuthAngle?: number
}

export type Axis2D = {
  x: number | null
  y: number | null
}

export type Axis3D = Axis2D & {
  z: number | null
}
