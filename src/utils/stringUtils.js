import padStart from 'lodash/padStart'

export const toHHMMSS = (value) => {
  const sec_num = parseInt(value, 10) // don't forget the second param
  const hours   = Math.floor(sec_num / 3600)
  const minutes = Math.floor((sec_num - (hours * 3600)) / 60)
  const seconds = sec_num - (hours * 3600) - (minutes * 60)

  if (!hours) {
    return `${padStart(minutes.toString(), 2, '0')}:${padStart(seconds.toString(), 2, '0')}`
  } else {
    return `${padStart(hours.toString(), 2, '0')}:${padStart(minutes.toString(), 2, '0')}:${padStart(seconds.toString(), 2, '0')}`
  }
}
