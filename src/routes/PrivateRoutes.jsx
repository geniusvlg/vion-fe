import {Route,Navigate} from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';
import {useContext} from 'react'
const PrivateRoutes = ({children}) => {
  const context=useContext(AuthContext)
  return context?.user? children : <Navigate to="/signIn" />;
}

export default PrivateRoutes