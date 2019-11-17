import OSC from 'osc/dist/osc-browser'
import {
  getOscUrl,
  getOscPort
} from '../../config/selectors'

import store from '../../../store'

let oscPromise
let promiseHash = {}
const TIMEOUT = 3000

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
  let callbacks = promiseHash[oscMessage.address]
  if (callbacks) {
    callbacks = callbacks
      .map((el) => {
        const { timeout, resolver, oneOff } = el
        clearTimeout(timeout)
        resolver(oscMessage.args)
        return oneOff ? null : el
      })
      .filter(Boolean)
    promiseHash[oscMessage.address] = [callbacks]
  }
}

export const sendOscMessagewithCallback = async (sender, messageCallback) => {
  let osc = await init()
  const promise = createCallbackPromise(messageCallback)
  osc.send(sender)
  return promise
}

const createCallbackPromise = (hash) => {
  promiseHash[hash.address] = promiseHash[hash.address] || []
  let timeout
  let resolver
  const promise = new Promise((resolve, reject) => {
    resolver = resolve
    timeout = setTimeout(() => {
      reject('timeout')
      promiseHash[hash.address] = promiseHash[hash.address].filter((stored) => {
        return stored.resolver !== resolve && stored.timeout !== timeout
      })
    }, TIMEOUT)
  })

  promiseHash[hash.address].push({
    promise,
    timeout,
    resolver,
    oneOff: true
  })

  console.log(promiseHash)

  return promise
}
