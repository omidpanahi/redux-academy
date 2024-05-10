import { put, takeLatest, call } from "redux-saga/effects"
import { actions as usersActions } from './users/slice'
import { transformUsers } from "../data/transformers/user"
import { fetchUsers } from "../data/apiCalls"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function* fetchUsersSaga(): any {
    try {
        // todo: handle payload
      const { data } = yield call(fetchUsers)

      const transformedResponse = transformUsers(data.data)
    //   dispatch(usersActions.fetchUsersSuccess({ users: transformedResponse }))
      yield put(usersActions.fetchUsersSuccess({ users: transformedResponse }))
    } catch (error) {
    //   dispatch(usersActions.fetchUsersFailure({ errorObj: error }))
     console.error(error);
     yield put(usersActions.fetchUsersFailure());
    }
}

function* mySaga() {
    yield takeLatest(usersActions.fetchUsersRequest.type, fetchUsersSaga)
    // todo: add more sagas for inc/dec page number (dont't forget to pass the page number in payload)
}

export default mySaga