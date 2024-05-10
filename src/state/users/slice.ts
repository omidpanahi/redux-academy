import { createSlice, CaseReducer, PayloadAction } from '@reduxjs/toolkit'
import { stateName } from './constant'
import { UsersState } from './types'
import { UiState } from '../../constants/uiState'
import { UserModel } from '../../types/models/user'

const initialState: UsersState = {
  users: [],
  uiState: UiState.Idle,
}

const fetchUsersRequest: CaseReducer<UsersState> = (draft) => {
  draft.uiState = UiState.Pending;
}

const fetchUsersSuccess: CaseReducer<UsersState, PayloadAction<{ users: UserModel[] }>> = (draft, action) => {
  draft.users = action.payload.users
  draft.uiState = UiState.Success
}

const fetchUsersFailure: CaseReducer<UsersState, PayloadAction<{ errorObj: unknown }>> = (draft, action) => {
  console.log(action.payload.errorObj)
  draft.uiState = UiState.Error
}

export const usersSlice = createSlice({
  name: stateName,
  initialState,
  reducers: {
    fetchUsersRequest,
    fetchUsersSuccess,
    fetchUsersFailure,
  },
})

export const { actions } = usersSlice
export const plug = { [stateName]: usersSlice.reducer }
export default usersSlice
