import { useCallback, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import UserDetails from './components/UserDetails'
import HighlightWrapper from './components/HighlightWrapper'
import Dropdown from './components/Dropdown'
import { UserModel } from './types/models/user'
import { UiState } from './constants/uiState'
import { getPageNumber } from './state/page-number/selectors'
import { actions as pageNumberActions } from './state/page-number/slice'
import { actions as usersActions } from './state/users/slice'
import { getErrors, getUiState, getUsers } from './state/users/selectors'

const SORT_OPTIONS = [
  { value: 'asc', title: 'Id ⬆️' },
  { value: 'dsc', title: 'Id ⬇️' },
  { value: 'nameasc', title: 'Name ⬆️' }
] as const

type SortOptionsValue = (typeof SORT_OPTIONS)[number]['value']

const App = () => {
  const dispatch = useDispatch()

  const [selectedSort, setSelectedSort] = useState<SortOptionsValue>('asc')
  const pageNumber = useSelector(getPageNumber)
  const userList = useSelector(getUsers)
  const uiState = useSelector(getUiState)
  const usersError = useSelector(getErrors)

  const sortedUsers = [...userList].sort((a, b) => {
    if (selectedSort === 'asc') return a.id - b.id

    if (selectedSort === 'dsc') return a.firstName.localeCompare(b.firstName)

    return b.id - a.id
  })
  const handleFetchData = useCallback(async () => {
    dispatch(usersActions.fetchUsersRequest(pageNumber))
  }, [pageNumber])
  
  useEffect(() => {
    handleFetchData()
  }, [pageNumber])

  const renderUser = ({ id, email, firstName, lastName }: UserModel) => {
    return (
      <div key={id}>
        <HighlightWrapper>
          <>
            <h3>
              {firstName} {lastName} ({id})
            </h3>
            <UserDetails email={email} />
          </>
        </HighlightWrapper>
      </div>
    )
  }

  if (uiState === UiState.Pending) return <div>Loading...</div>

  if (uiState === UiState.Error) return <div>{usersError}</div>

  return (
    <div>
      <button onClick={() => handleFetchData()}>GET USERS ♻️</button>
      <Dropdown
        options={SORT_OPTIONS}
        selectedValue={selectedSort}
        onSelectedChange={setSelectedSort}
      />
      <div>{sortedUsers.map(renderUser)}</div>
      <hr />
      <h4>Page: {pageNumber}</h4>
      <button onClick={() => dispatch(pageNumberActions.decrement())}>Previous</button>
      <button onClick={() => dispatch(pageNumberActions.increment())}>Next</button>
    </div>
  )
}

export default App
