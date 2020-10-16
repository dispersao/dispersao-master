import axios from 'axios'

export const fetchConfig = async () => {
  try {
    const config = await axios.get('/config.json', {
      crossDomain: true
    })

    const { data: { api: { user, url, password } } } = config
    axios.defaults.baseURL = API_URL || url
    axios.defaults.headers.post['Content-Type'] = 'json'

    const tokenRequest = await axios.post('/auth/local', {
      identifier: API_USER || user,
      password: API_PASSWORD || password
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
