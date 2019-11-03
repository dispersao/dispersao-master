import axios from 'axios'

export const fetchConfig = async () => {
  try {
    const config = await axios.get('/config.json')
    axios.defaults.baseURL = config.data.api.url
    axios.defaults.headers.post['Content-Type'] = 'json'

    const tokenRequest = await axios.post('/auth/local', {
      identifier: config.data.api.user,
      password: config.data.api.password
    })
    
    const token = tokenRequest.data.jwt
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

    return {
      ...config.data,
      api: {
        url: config.data.api.url,
        token: token
      }
    }
  } catch (e) {
    console.log(e)
    return e
  }
}
