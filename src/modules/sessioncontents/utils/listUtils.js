import { Map } from 'immutable'

export const getSessioncontentsByType = (sessioncontents, type) => {
  
  return sessioncontents.filter(sescon => {
    let sesconOb = Map.isMap(sescon) ? sescon.toJS() : sescon
    return sesconOb[type]
  })
}

export const getSessioncontentsIdsByType = (sessioncontents, type) => {
  return getSessioncontentsByType(sessioncontents, type)
    .map(sescon => {
      let sesconOb = Map.isMap(sescon) ? sescon.toJS() : sescon
      return sesconOb[type]
    })
}
