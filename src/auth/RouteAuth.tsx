import React from 'react'
import { auth } from './FirebaseAuth'
import { useAuthState } from 'react-firebase-hooks/auth'
import { LoginPage } from '../pages/LoginPage'
import { Dashboard } from '../components/Dashboard'

export const RouteAuth = (): any => {
    const [user] = useAuthState(auth)
    return user ? <Dashboard /> : <LoginPage />
}
