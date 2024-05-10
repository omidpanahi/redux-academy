import { stateName } from "./constant"
import { AllState } from "./types"

const localState = (state: AllState) => state[stateName]

export const getPageNumber = (state: AllState) => localState(state).pageNumber
