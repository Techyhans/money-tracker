import { database } from '../auth/FirebaseAuth'
import React, { useState, useEffect } from 'react'
import { Table, Divider } from 'antd'

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
}

interface TableProp {
    orderDate: string
    payBy: string
}

const tableColumns = [
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
    const [tableData, setTableData] = useState<TableProp[]>([])

    useEffect((): void => {
        const dataFromServer: DataProps[] = []
        database.ref().on('value', (snapshot): void => {
            snapshot.forEach((item): void => {
                dataFromServer.push(item.val())
            })
            const tempTableData: TableProp[] = []
            dataFromServer.forEach((item): void => {
                const js = {
                    orderDate: item.orderDate,
                    payBy: item.payBy,
                }
                tempTableData.push(js)
            })
            setTableData(tempTableData)
        })
    }, [])

    return (
        <>
            <h1>dashboard</h1>
            <Divider />
            <Table columns={tableColumns} dataSource={tableData} />
        </>
    )
}
