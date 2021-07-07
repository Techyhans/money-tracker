import React, { useState } from 'react'
import { Form, Input, Button, Checkbox } from 'antd'
import { useNavigate } from 'react-router-dom'

import { auth, provider } from '../auth/FirebaseAuth'
import firebase from 'firebase'
import { Spinner } from './Spinner'
import { LoginProps } from '../shared/model'

export const Login = (): JSX.Element => {
    const [loading, setLoading] = useState<boolean>(false)
    const [isError, setIsError] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>('')

    const navigate = useNavigate()

    const emailSignIn = (values: LoginProps): void => {
        setLoading(true)
        firebase
            .auth()
            .signInWithEmailAndPassword(values.email, values.password)
            .then((): void => {
                navigate('/app/dashboard')
            })
            .catch((e): void => {
                setLoading(false)
                setIsError(true)
                setErrorMessage(e.message)
            })
    }

    const onFinishFailed = (errorInfo: any): void => {
        console.log(errorInfo)
    }

    const googleSignIn = (): void => {
        setLoading(true)
        auth.signInWithPopup(provider)
            .then((): void => {
                navigate('/app/dashboard')
            })
            .catch(alert)
    }

    const onSignUp = (): void => {
        navigate('/signup')
    }

    const onRemoveError = (): void => {
        setIsError(false)
    }

    return (
        <>
            <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={emailSignIn}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input onClick={onRemoveError} />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password onClick={onRemoveError} />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked">
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                {isError && <p>{errorMessage}</p>}

                <Form.Item>
                    {loading ? (
                        <Spinner />
                    ) : (
                        <div>
                            <Button type="primary" htmlType="submit">
                                Email
                            </Button>
                            <Button type="primary" htmlType="submit" onClick={googleSignIn}>
                                Google
                            </Button>
                            <Button type="primary" htmlType="submit" onClick={onSignUp}>
                                Sign Up
                            </Button>
                        </div>
                    )}
                </Form.Item>
            </Form>
        </>
    )
}
