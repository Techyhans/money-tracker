import React, { useState } from 'react'
import { auth } from '../auth/FirebaseAuth'

export const SignUp = (): any => {
    const [email, setemail] = useState('hanshengliang@outlook.com')
    const [password, setpassword] = useState('Hansheng0512#')
    const signup = () => {
        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // send verification mail.
                userCredential.user!.sendEmailVerification()
                auth.signOut()
                alert('Email sent')
            })
            .catch(alert)
    }

    return (
        <div className="App">
            <br />
            <br />
            <input
                type="email"
                placeholder="Email"
                onChange={(e) => {
                    setemail(e.target.value)
                }}
            />
            <br />
            <br />
            <input
                type="password"
                placeholder="password"
                onChange={(e) => {
                    setpassword(e.target.value)
                }}
            />
            <br />
            <br />
            <button onClick={signup}>Sign-up</button>
        </div>
    )
}
