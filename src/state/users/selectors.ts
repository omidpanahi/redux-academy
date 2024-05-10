import { stateName } from "./constant"
import { AllState } from "./types"

const localState = (state: AllState) => state[stateName]

export const getUsers = (state: AllState) => localState(state).users

export const getUiState = (state: AllState) => localState(state).uiState
