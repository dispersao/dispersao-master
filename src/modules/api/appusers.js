import axios from 'axios'

export const fetchAppusersTotal = async ({script}) => {
  const total = await axios.get(`appusers/count?script=${script}`)
  return total.data
}
