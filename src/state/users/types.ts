import { UiState } from "../../constants/uiState"
import { UserModel } from "../../types/models/user"
import { stateName } from "./constant"

export type UsersState = {
    users: Array<UserModel>
    uiState: UiState
}

export type AllState = { [key in typeof stateName]: UsersState }
