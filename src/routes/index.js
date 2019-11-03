import React from 'react'
import { Switch, Route, Redirect } from "react-router-dom"
import { ConnectedRouter } from 'connected-react-router'
import history from './history'
import ScriptCreate from '../modules/scripts/components/ScriptCreate.jsx'
import ScriptList from '../modules/scripts/components/ScriptList.jsx'
import Script from '../modules/scripts/components/Script.jsx'

const MainRouter = () => {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route
          exact
          path="/">
          <Redirect to={{
            pathname: "/scripts/new" }} />
        </Route>
        <Route
          exact
          path="/scripts"
          component={ScriptList} />
        <Route
          exact
          path="/scripts/new"
          component={ScriptCreate} />
        <Route
          exact
          path="/scripts/:id([0-9]*)"
          component={Script} />
        <Route 
          exact
          path="/login"
          render={() => {
            return <div>Login</div>
          }}  />
      </Switch>
    </ConnectedRouter>
  )
}

export default MainRouter
