import React, {createContext, useContext, useState} from 'react'

type loginInfoType = {
  email: string,
  password: string,
  checked: boolean,
  token: string,
  isAdmin: boolean,
  id: string
}

type contextType = {
  loginInfo: loginInfoType
  setLoginInfo: React.Dispatch<React.SetStateAction<loginInfoType>>
}

const LoginContext = createContext<contextType | null>(null)

export function useLogin() {
  return useContext(LoginContext)
}


const LoginProvider = ({children}: any) => {

  const [loginInfo, setLoginInfo] = useState<loginInfoType>({
    email: '',
    password: '',
    checked: false,
    token: '',
    isAdmin: false,
    id: ''
  })


  return (
    <LoginContext.Provider value={{loginInfo, setLoginInfo}}>
      {children}
    </LoginContext.Provider>
  )
}

export default LoginProvider