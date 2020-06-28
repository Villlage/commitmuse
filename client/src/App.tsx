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
  const [user, setUser] = useState<User | null | undefined>(null)
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
      // setUser(undefined)
      return setUser({
        id: 1,
        first_name: 'Amy',
        last_name: 'Owens',
        phone_number: '555555',
        user_role: 0,
        confirmed_at: '',
        email: 'sample@mail.com',
        is_active: true,
        profile_picture: '/assets/images/amy_owens.svg',
        profile_picture_link: '/assets/images/amy_owens.svg',
        created_at: '',
        updated_at: '',
        hourly_rate: 40
      })
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
