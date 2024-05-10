import { stateName } from "./constant"

export type PageNumberState = {
    pageNumber: number
}

export type AllState = { [key in typeof stateName]: PageNumberState }
