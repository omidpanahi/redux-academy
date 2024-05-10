import { UserDto } from "../types/dtos/user"
import { UserModel } from "../types/models/user"

const transformUser = ({ id, email, first_name, last_name, avatar }: UserDto): UserModel => ({
  id,
  email,
  firstName: first_name,
  lastName: last_name,
  avatar
})

export const transformUsers = (users: Array<UserDto>) => users.map(transformUser)
