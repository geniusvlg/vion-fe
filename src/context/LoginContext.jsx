import React from 'react';

export const LoginContext = React.createContext();
function LoginContextComponent ({ children }) {
  const [isLogin, setIsLogin] = React.useState(false)
  return (
    <LoginContext.Provider
      value={{
        isLogin, setIsLogin
      }}>
      {children}
    </LoginContext.Provider>

  )
}
export default LoginContextComponent