import OSC from 'osc/dist/osc-browser'
import {
  getOscUrl,
  getOscPort
} from '../../config/selectors'

import store from '../../../store'

let oscPromise

const init = async () => {
  if (!oscPromise) {
    oscPromise = new Promise((resolve, reject) => {
      try {
        const url = getOscUrl(store.getState())
        const port = getOscPort(store.getState())

        let osc = new OSC.WebSocketPort({
          url: `${url}:${port}`
        })
  
        osc.on('ready', () => {
          resolve(osc)
        })
    
        osc.on('error', (e) => {
          reject(e)
        })
  
        osc.on('message', (oscMessage) => {
          parseOscMessage(oscMessage)
        })
        osc.open()
      } catch (e) {
        reject(e)
      }
    })
  }
  return oscPromise
}

const parseOscMessage = (oscMessage) => {
  switch (oscMessage.address) {
    case '/getScene':
      return console.log('dispatch getSceneACtion')
    default:
      return
  }
}

export const sendOscMessage = async (address, args) => {
  let osc = await init()
  osc.send({
    address: `/${address}`,
    args
  })
}
