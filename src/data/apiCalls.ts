import axios from 'axios'

import { GetUsersResponse } from './types/responses'

export const fetchUsers = (page: number = 1) =>
  axios.get<GetUsersResponse>(`https://reqres.in/api/users?page=${page}`)
