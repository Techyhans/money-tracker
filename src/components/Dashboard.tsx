import { database } from '../auth/FirebaseAuth'
import React, { useState, useEffect } from 'react'
import { Table, Divider, Result, Button, Modal } from 'antd'

type Details = {
    amount: number
    name: string
}

interface DataProps {
    cleared: number
    deliveryTotal: number
    details: Details[]
    discountTotal: number
    foodTotal: number
    orderDate: string
    payBy: string
    key: string
}

interface TableProp {
    uniqueKey: string
    orderDate: string
    payBy: string
}

const tableColumns = [
    {
        title: 'Key',
        dataIndex: 'uniqueKey',
    },
    {
        title: 'Order Date',
        dataIndex: 'orderDate',
    },
    {
        title: 'Pay By',
        dataIndex: 'payBy',
    },
]

export const Dashboard = (): JSX.Element => {
    const [dataFromServer] = useState<DataProps[]>([])
    const [tableData, setTableData] = useState<TableProp[]>([])
    const [selectedKey, setSelectedKey] = useState<string>('')

    const [isModalVisible, setIsModalVisible] = useState(false)

    const showModal = (): void => {
        setIsModalVisible(true)
    }

    const handleCancel = (): void => {
        setIsModalVisible(false)
    }

    useEffect((): void => {
        database
            .ref()
            .child('orders')
            .get()
            .then((snapshot): void => {
                snapshot.forEach((item): void => {
                    dataFromServer.push(item.val())
                })
                const tempTableData: TableProp[] = []
                dataFromServer.forEach((item): void => {
                    const js = {
                        orderDate: item.orderDate,
                        payBy: item.payBy,
                        uniqueKey: item.key,
                    }
                    tempTableData.push(js)
                })
                setTableData(tempTableData)
            })
    }, [dataFromServer])

    const onRowClick = (record: any): object => {
        return {
            onClick: (): void => {
                const selectedRow = dataFromServer.find(
                    (item): boolean => item.orderDate === record.orderDate
                )
                setSelectedKey(selectedRow!.key)
                showModal()
            },
        }
    }

    const onUpdateData = (): void => {
        console.log(selectedKey)
        database
            .ref()
            .child('orders')
            .child(selectedKey)
            .update({
                cleared: 1,
            })
            .then((): void => {
                handleCancel()
            })
            .catch((e): void => {
                console.log(e)
            })
    }

    const onDeleteData = (): void => {
        database
            .ref()
            .child('orders')
            .child(selectedKey)
            .remove()
            .then((): void => {
                setTableData(
                    tableData.filter((item: TableProp): any => item.uniqueKey !== selectedKey)
                )
                handleCancel()
            })
    }

    return (
        <>
            <Modal
                title="Basic Modal"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Close
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        loading={false}
                        onClick={(): void => onUpdateData()}
                    >
                        Mask as Completed
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        loading={false}
                        onClick={(): void => onDeleteData()}
                    >
                        Delete
                    </Button>,
                ]}
            >
                <Result
                    status="warning"
                    title="Completed or Delete?"
                    subTitle="Complete = OK | Delete = Cancel"
                />
            </Modal>
            <h1>dashboard</h1>
            <Divider />
            <Table columns={tableColumns} dataSource={tableData} onRow={onRowClick} />
        </>
    )
}
