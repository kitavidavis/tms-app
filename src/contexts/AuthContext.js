import { createContext, useContext, useState, useEffect, useMemo } from 'react'
import { TOKEN_NAME } from '../constants'
import axios from '../utils/axios'
import { AuthContext as AppAuthContext } from '../App'
// init context
const AuthContext = createContext()

// export the consumer
export function useAuth() {
  return useContext(AuthContext)
}

// export the provider (handle all the logic here)
export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isDone, setIsDone] = useState(false);
  const [account, setAccount] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token') || null)
  const { state, dispatch } = useContext(AppAuthContext);
  
  const register = (formData = {}) =>
    new Promise((resolve, reject) => {
      axios
        .post('/auth/register', formData)
        .then(({
          data: {
            data: accountData,
            token: accessToken,
          },
        }) => {
          setAccount(accountData)
          setToken(accessToken)
          setIsLoggedIn(true)
          setIsDone(true)
          resolve(true)
        })
        .catch((error) => {
          console.error(error)
          setIsDone(true)
          reject(error?.response?.data?.message || error.message)
        })
    })

  const login = (formData = {}) =>
    new Promise((resolve, reject) => {
      axios
        .post('/auth/login', formData)
        .then(({
          data: {
            data: accountData,
            token: accessToken,
          },
        }) => {
          setAccount(accountData)
          setToken(accessToken)
          setIsLoggedIn(true)
          setIsDone(true)
          resolve(true)
        })
        .catch((error) => {
          console.error(error)
          setIsDone(true)
          reject(error?.response?.data?.message || error.message)
        })
    })

  const logout = () => {
    setIsLoggedIn(false)
    setAccount(null)
    setToken(null)
  }

  const loginWithToken = async () => {
    try {
      const {
        data: {
          data: accountData,
          token: accessToken,
        },
      } = await axios.get('/auth/login', {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })

      setAccount(accountData)
      setToken(accessToken)
      setIsLoggedIn(true)
      setIsDone(true)
    } catch (error) {
      console.error(error)
      setIsDone(true)
      if (error?.response?.statusCode === 401) setToken(null)
    }
  }

  // This side effect keeps local storage updated with recent token value,
  // making sure it can be re-used upon refresh or re-open browser
  useEffect(() => {
    if (token) {
      localStorage.setItem(TOKEN_NAME, token)
    } else {
      localStorage.removeItem(TOKEN_NAME)
    }
  }, [token])

  // This side effect runs only if we have a token, but no account or logged-in boolean.
  // This "if" statement is "true" only when refreshed, or re-opened the browser,
  // if true, it will then ask the backend for the account information (and will get them if the token hasn't expired)
  useEffect(() => {
    if (!isLoggedIn && !account && token) loginWithToken()
  }, [isLoggedIn, account, token]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isDone,
        account,
        token,
        register,
        login,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  )
}
