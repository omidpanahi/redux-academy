import { put, takeLatest, call, StrictEffect } from "redux-saga/effects"
import { actions as usersActions } from './users/slice'
import { transformUsers } from "../data/transformers/user"
import { fetchUsers } from "../data/apiCalls"

import { PayloadAction } from "@reduxjs/toolkit"
import { GetUsersResponse } from "../types/responses"

function* fetchUsersSaga({ payload: pageNumber }: PayloadAction<number>): Generator<StrictEffect, void, {data: GetUsersResponse}>{
    try {
      const { data } = yield call(fetchUsers, pageNumber) 
      const transformedResponse = transformUsers(data.data) 
      yield put(usersActions.fetchUsersSuccess({ users: transformedResponse }))
    } catch (error) {
     yield put(usersActions.fetchUsersFailure({error: (error as Error).message}));
    }
}

function* mySaga() {
    yield takeLatest(usersActions.fetchUsersRequest.type, fetchUsersSaga)
    // todo: add more sagas for inc/dec page number
}

export default mySaga