import React, { useState } from 'react'
import { auth } from '../auth/FirebaseAuth'
import { useNavigate } from 'react-router-dom'
import { Modal, Result } from 'antd'

export const LogOut = (): any => {
    const navigate = useNavigate()

    const [isModalVisible, setIsModalVisible] = useState(true)

    const handleCancel = (): void => {
        setIsModalVisible(false)
    }

    const logout = (): void => {
        auth.signOut().then((result): any => {
            navigate('/login')
        })
    }

    return (
        <>
            <Modal title="Warning" visible={isModalVisible} onOk={logout} onCancel={handleCancel}>
                <Result status="warning" title="Are you sure want to log out?" />
            </Modal>
        </>
    )
}
