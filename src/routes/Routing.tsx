import React from 'react'
import { Routes, Route, HashRouter, Navigate } from 'react-router-dom'

import { LoginPage } from '../pages/LoginPage'
import { SignUp } from '../components/SignUp'
import { DashboardPage } from '../pages/DashboardPage'
import { ServerErrorPage } from '../pages/ServerErrorPage'
import { PageSider } from '../components/PageSider'
import { FormInsert } from '../components/Record/FormInsert'

export const Routing = (): any => (
    <HashRouter>
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/app" element={<PageSider />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/insert" element={<FormInsert />} />
            </Route>
            <Route path="/" element={<LoginPage />} />
            <Route path="*" element={<ServerErrorPage />} />
        </Routes>
    </HashRouter>
)
