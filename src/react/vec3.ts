//@ts-ignore
import vec3, { Vec3 } from 'vec3'

export default vec3 as unknown as (...args: [x: number, y: number, z: number] | [Record<'x' | 'y' | 'z', number>]) => Vec3

export type CoordinateComponent = 'x' | 'y' | 'z'
export const coordinateComponents = ['x', 'y', 'z'] as const

export type ArrayPoint = [number, number, number]
export type TrianglePoints = [Vec3, Vec3, Vec3]
