import React, { useState } from 'react'
import { auth } from '../auth/FirebaseAuth'
import { useNavigate } from 'react-router-dom'
import { Modal, Button, Result } from 'antd'

export const LogOut = (): any => {
    const navigate = useNavigate()

    const [isModalVisible, setIsModalVisible] = useState(true)

    const showModal = () => {
        setIsModalVisible(true)
    }

    const handleOk = () => {
        setIsModalVisible(false)
    }

    const handleCancel = () => {
        setIsModalVisible(false)
    }

    const logout = () => {
        auth.signOut().then((result) => {
            navigate('/login')
        })
    }

    const userEmail = auth.currentUser!.email

    return (
        <>
            <Modal title="Warning" visible={isModalVisible} onOk={logout} onCancel={handleCancel}>
                <Result status="warning" title="Are you sure want to log out?" />
            </Modal>
        </>
    )
}
