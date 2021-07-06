import React, { Component } from 'react'
import { auth } from './FirebaseAuth'
import { useAuthState } from 'react-firebase-hooks/auth'
import { LoginPage } from '../pages/LoginPage'
import { Dashboard } from '../components/Dashboard'
import { PageSider } from '../components/PageSider'

export const RouteAuth = (): any => {
    const [user] = useAuthState(auth)
    return user ? <PageSider /> : <LoginPage />
}
