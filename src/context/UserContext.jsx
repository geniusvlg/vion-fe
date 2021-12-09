import React, { useEffect } from "react";
import api from '../services/api_cms';

var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext()

const Permission = React.createContext()

function userReducer (state, {type, data}) {
  switch (type) {
    case "UPDATE_INFO":
      return { ...state, ...data}
    default: {
      throw new Error(`Unhandled action type: ${type}`);
    }
  }
}

function UserProvider ({ children }) {
  var [state, dispatch] = React.useReducer(userReducer, { uid: "", username: "", phone_number: "", role: "", permission: [] })

  useEffect(() => {
    api.get('/user/check').then(({data}) => {
      dispatch({ type: "UPDATE_INFO", data })
    }).catch(err => {
      if(err.response?.status === 401) {
        window.location = '/login/index.html'
      } else {
        console.log(err)
      }
    })
  }, [])

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState () {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch () {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

function signOut () {
  // dispatch({ type: "SIGN_OUT_SUCCESS" })
  api.get('/user/logout').then(() => {
    window.location = '/login/index.html'
  }).catch(err => {
    console.log(err)
  })
}

export { Permission, UserProvider, useUserState, useUserDispatch, signOut }