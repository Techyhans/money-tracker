import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'

import { LoginPage } from '../pages/LoginPage'
import { LogOut } from '../components/LogOut'
import { SignUp } from '../components/SignUp'

export const Routes = (): any => (
    <HashRouter>
        <Switch>
            <Route path="/login" exact={true} component={LoginPage} />
            <Route path="/signup" component={SignUp} />
            <Route path="/dashboard" component={LogOut} />
        </Switch>
    </HashRouter>
)
