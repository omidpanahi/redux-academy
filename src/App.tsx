import { useCallback, useEffect, useState } from 'react'

import UserDetails from './components/UserDetails'
import { getUsers } from './data/apiCalls'
import { transformUsers } from './data/transformers/user'
import HighlightWrapper from './components/HighlightWrapper'
import Dropdown from './components/Dropdown'
import { UserModel } from './types/models/user'
import { UiState } from './constants/uiState'

const SORT_OPTIONS = [
  { value: 'asc', title: 'Id ⬆️' },
  { value: 'dsc', title: 'Id ⬇️' },
  { value: 'nameasc', title: 'Name ⬆️' }
] as const

type SortOptionsValue = (typeof SORT_OPTIONS)[number]['value']

const App = () => {
  const [userList, setUserList] = useState<Array<UserModel>>([])
  const [uiState, setUiState] = useState(UiState.Idle)
  const [selectedSort, setSelectedSort] = useState<SortOptionsValue>('asc')

  const handleFetchData = useCallback(async () => {
    setUiState(UiState.Pending)

    try {
      const { data } = await getUsers()

      const transformedResponse = transformUsers(data.data)

      setUserList(transformedResponse)

      setUiState(UiState.Success)
    } catch (error) {
      console.log(error)
      setUiState(UiState.Error)
    }
  }, [])

  const sortedUsers = userList.sort((a, b) => {
    if (selectedSort === 'asc') return a.id - b.id

    if (selectedSort === 'dsc') return a.firstName.localeCompare(b.firstName)

    return b.id - a.id
  })

  useEffect(() => {
    handleFetchData()
  }, [handleFetchData])

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

  if (uiState === UiState.Error) return <div>Something went wrong...</div>

  return (
    <div>
      <button onClick={handleFetchData}>♻️</button>
      <Dropdown
        options={SORT_OPTIONS}
        selectedValue={selectedSort}
        onSelectedChange={setSelectedSort}
      />
      <div>{sortedUsers.map(renderUser)}</div>
    </div>
  )
}

export default App
