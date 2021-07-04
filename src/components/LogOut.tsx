import React from 'react'
import { auth } from '../auth/FirebaseAuth'
import { useHistory } from 'react-router-dom'

export const LogOut = (): any => {
    const history = useHistory()

    const logout = () => {
        auth.signOut()
        history.push('/login')
    }

    const userEmail = auth.currentUser!.email

    return (
        <>
            <div>
                Welcome
                {userEmail}
                <button style={{ marginLeft: '20px' }} onClick={logout}>
                    Logout
                </button>
            </div>
        </>
    )
}
