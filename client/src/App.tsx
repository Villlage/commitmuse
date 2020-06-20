import React, { useLayoutEffect, useState } from 'react'
import Routes from './Routes'
import { Provider } from 'react-redux'
import store from './redux/store'
import UserService from './services/user.service'
import Loader from './app/components/Loader'
import { log } from './services/logging.service'

const configStore: any = store()
const userService = new UserService()

function App() {
  const [user, setUser] = useState<any>(null)
  const fetchUser = async () => {
    try {
      const res = await userService.checkAuth()
      if (res) {
        const user = await userService.getCurrentUser()
        return setUser(user)
      } else {
        return setUser(undefined)
      }
    } catch (e) {
      log('Error getting current user: ', e)
      setUser(undefined)
    }
  }

  useLayoutEffect(() => {
    fetchUser()
  }, [])

  return user !== null ? (
    <Provider store={configStore}>
      <Routes currentUser={user} fetchUser={fetchUser} />
    </Provider>
  ) : (
    <Loader />
  )
}

export default App
