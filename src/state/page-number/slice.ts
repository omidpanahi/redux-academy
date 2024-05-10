import { createSlice, CaseReducer } from '@reduxjs/toolkit'
import { stateName } from './constant'
import { PageNumberState } from './types'

const initialState: PageNumberState = {
  pageNumber: 1,
}

const increment: CaseReducer<PageNumberState> = draft => {
  draft.pageNumber += 1
}

const decrement: CaseReducer<PageNumberState> = draft => {
  draft.pageNumber -= 1
}

export const pageNumberSlice = createSlice({
  name: stateName,
  initialState,
  reducers: {
    increment,
    decrement,
  },
})

export const { actions } = pageNumberSlice
export const plug = { [stateName]: pageNumberSlice.reducer }
export default pageNumberSlice
