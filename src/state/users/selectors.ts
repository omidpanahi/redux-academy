import { createSelector } from "@reduxjs/toolkit"
import { stateName } from "./constant"
import { AllState } from "./types"

const localState = (state: AllState) => state[stateName]

export const getUsers = (state: AllState) => localState(state).users
// write an selector with selector creator

export const getUiState = (state: AllState) => localState(state).uiState
export const getErrors = (state: AllState) => localState(state).errors
