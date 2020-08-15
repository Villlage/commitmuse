import React, { useLayoutEffect, useState } from 'react'
import Routes from './Routes'
import { Provider } from 'react-redux'
import store from './redux/store'
import UserService from './services/user.service'
import Loader from './app/components/Loader'
import { log } from './services/logging.service'
import { User } from './interfaces/baseIntefaces'

const configStore: any = store()
const userService = new UserService()

function App() {
  const [currentUser, setCurrentUser] = useState<User | null | undefined>(undefined)
  const fetchUser = async () => {
    try {
      const res = await userService.checkAuth()
      if (res) {
        const user = await userService.getCurrentUser()
        return setCurrentUser(user)
      } else {
        return setCurrentUser(null)
      }
    } catch (e) {
      log('Error getting current user: ', e)
      return setCurrentUser(null)
    }
  }

  useLayoutEffect(() => {
    fetchUser()
  }, [])

  return currentUser !== undefined ? (
    <Provider store={configStore}>
      <Routes currentUser={currentUser as User} fetchUser={fetchUser} setCurrentUser={(u: User | null) => setCurrentUser(u)} />
    </Provider>
  ) : (
    <Loader />
  )
}

export default App
