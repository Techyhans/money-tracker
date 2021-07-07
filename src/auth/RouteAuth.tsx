import React, { ReactElement } from 'react'
import { auth } from './FirebaseAuth'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Navigate, Route } from 'react-router-dom'

type RouteProps = {
    path: string
    comp: ReactElement
}

export const RouteAuth = ({ path, comp }: RouteProps): ReactElement => {
    const [user] = useAuthState(auth)
    return user ? <Route path={path} element={comp} /> : <Navigate to={'/login'} />
}
