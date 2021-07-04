import React from "react";
import { HashRouter, Switch, Route } from 'react-router-dom'

import {LoginPage} from "../pages/LoginPage";
import {DashboardPage} from "../pages/DashboardPage";

export const Routes = () => {
    return (
        <HashRouter>
            <Switch>
                <Route path="/login" component={LoginPage} />
                <Route path="/dashboard" component={DashboardPage} />
            </Switch>
        </HashRouter>
    )
}
