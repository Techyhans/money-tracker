import React from 'react'
import { Routes, Route, HashRouter } from 'react-router-dom'

import { LoginPage } from '../pages/LoginPage'
import { SignUp } from '../components/SignUp'
import { DashboardPage } from '../pages/DashboardPage'
import { ServerErrorPage } from '../pages/ServerErrorPage'
import { PageSider } from '../components/PageSider'
import { FormInsert } from '../components/Record/FormInsert'
import { RouteAuth } from '../auth/RouteAuth'

export const Routing = () => (
    <HashRouter>
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/app" element={<PageSider />}>
                <RouteAuth path="/dashboard" comp={<DashboardPage />} />
                <RouteAuth path="/insert" comp={<FormInsert />} />
            </Route>
            <Route path="/" element={<LoginPage />} />
            <Route path="*" element={<ServerErrorPage />} />
        </Routes>
    </HashRouter>
)
