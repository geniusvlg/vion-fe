import React from 'react';

export const LoadingContext = React.createContext();
function LoadingContextComponent ({ children }) {
  const [isLoading, setIsLoading] = React.useState(false)
  return (
    <LoadingContext.Provider
      value={{
        isLoading, setIsLoading
      }}>
      {children}
    </LoadingContext.Provider>

  )
}
export default LoadingContextComponent;