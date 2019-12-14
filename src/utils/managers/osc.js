import OSC from 'osc/dist/osc-browser'
import {
  getOscUrl,
  getOscPort
} from '../../modules/config/selectors'

import store from '../../store'

let oscPromise
let promiseHash = {}
let callbackHash = {}

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
  let promises = promiseHash[oscMessage.address]
  let callbacks = callbackHash[oscMessage.address]

  if (promises) {
    promises = promises
      .map((el) => {
        const { timeout, resolver, oneOff } = el
        clearTimeout(timeout)
        resolver(oscMessage.args)
        return oneOff ? null : el
      })
      .filter(Boolean)
    promiseHash[oscMessage.address] = [promises]
  }

  if (callbacks) {
    callbacks.forEach(cbk => {
      cbk(oscMessage.address, oscMessage.args)
    })
  }
}

export const addListener = (address, callback) => {
  callbackHash[address] = callbackHash[address] || []
  const registered = callbackHash[address].filter(cbk => cbk === callback)
  if (!registered.length) {
    callbackHash[address].push(callback)
  }
}

export const removeListener = (address, callback) => {
  if (callbackHash[address]) {
    callbackHash.filter(cbk => cbk !== callback)
  }
}

export const sendMessage = async (message, messageCallback) => {
  let osc = await init()
  const promise = createCallbackPromise(messageCallback)
  osc.send(message)
  return promise
}

export const notify = async (message) => {
  let osc = await init()
  osc.send(message)
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

  return promise
}
