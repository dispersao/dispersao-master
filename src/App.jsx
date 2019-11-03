import React from 'react'
import store from './store'
import { Provider } from 'react-redux'
import { hot } from 'react-hot-loader/'
import Router from './routes'
import Dataloader from './modules/config/components/DataLoader.jsx'


const App = () => {
  return (
    <Provider store={store}>
      <Dataloader>
        <Router />
      </Dataloader>
    </Provider>
  )
}

export default hot(module)(App)

