import axios from 'axios'

import { GetUsersResponse } from './types/responses'

export const getUsers = (page: number = 1) =>
  axios.get<GetUsersResponse>(`https://reqres.in/api/users?page=${page}`)
