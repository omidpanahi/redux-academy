import { createSlice, CaseReducer, PayloadAction } from '@reduxjs/toolkit'
import { stateName } from './constant'
import { UsersState } from './types'
import { UiState } from '../../constants/uiState'
import { getUsers } from '../../data/apiCalls'
import { transformUsers } from '../../data/transformers/user'

const initialState: UsersState = {
  users: [],
  uiState: UiState.Idle,
}

const fetchUsersRequest: CaseReducer<UsersState, PayloadAction<{ pageNumber: number }>> = (draft, action) => {
  draft.uiState = UiState.Pending;

  getUsers(action.payload.pageNumber).then(({ data }) => {
    const transformedResponse = transformUsers(data.data)
    draft.users = transformedResponse
    draft.uiState = UiState.Success
  }).catch((error) => {
    console.log(error)
    draft.uiState = UiState.Error
  })
}

export const usersSlice = createSlice({
  name: stateName,
  initialState,
  reducers: {
    fetchUsersRequest,
    // fetchUsersSuccess,
    // fetchUsersFailure,
  },
})

export const { actions } = usersSlice
export const plug = { [stateName]: usersSlice.reducer }
export default usersSlice
