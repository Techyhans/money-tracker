import React, { ChangeEvent, useState } from 'react'
import { auth } from '../auth/FirebaseAuth'

export const SignUp = () => {
    const [email, setemail] = useState<string>('')
    const [password, setpassword] = useState<string>('')
    const signup = () => {
        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // send verification mail.
                userCredential.user!.sendEmailVerification().then(() => {
                    auth.signOut().then(() => {
                        alert('Email sent')
                    })
                })
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
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setemail(e.target.value)
                }}
            />
            <br />
            <br />
            <input
                type="password"
                placeholder="password"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setpassword(e.target.value)
                }}
            />
            <br />
            <br />
            <button onClick={signup}>Sign-up</button>
        </div>
    )
}
