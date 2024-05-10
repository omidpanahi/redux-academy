import axios from 'axios'

import { GetUsersResponse } from '../types/responses'

export const getUsers = () =>
  axios.get<GetUsersResponse>('https://reqres.in/api/users')