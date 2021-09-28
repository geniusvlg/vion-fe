/* eslint-disable no-restricted-globals */
import axios from 'axios'

export default axios.create({
  baseURL: appConfigs.api_url,
  withCredentials: !['http', location.origin].every(v => appConfigs.api_url.startsWith(v))
})