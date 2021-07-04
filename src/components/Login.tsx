import React from 'react'

import { Form, Input, Button, Checkbox } from 'antd'
import { useHistory } from 'react-router-dom'

import { auth, provider } from '../auth/FirebaseAuth'
import firebase from 'firebase'

export const Login = (): any => {
    const history = useHistory()

    const emailSignIn = (values: any) => {
        firebase
            .auth()
            .signInWithEmailAndPassword(values.email, values.password)
            .then(() => {
                history.push('/dashboard')
            })
            .catch(alert)
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log(errorInfo)
    }

    const googleSignIn = () => {
        auth.signInWithPopup(provider).catch(alert)
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
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked">
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Email
                    </Button>
                    <Button type="primary" htmlType="submit" onClick={googleSignIn}>
                        Google
                    </Button>
                    <Button
                        type="primary"
                        htmlType="submit"
                        onClick={() => {
                            history.push('/signup')
                        }}
                    >
                        Sign Up
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}
