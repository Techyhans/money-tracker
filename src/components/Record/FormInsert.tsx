import { Form, Input, Button, Select, DatePicker, Table, Divider, Alert } from 'antd'
import React, { ChangeEvent, useState } from 'react'
import { database } from '../../auth/FirebaseAuth'
import moment from 'moment-timezone'

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
    },
]

interface DataType {
    key: React.Key
    name: string
    amount: number
}

export const FormInsert = (): JSX.Element => {
    const [nameToAdd, setNameToAdd] = useState<string>('')
    const [amountToAdd, setAmountToAdd] = useState<number>(0)
    const [data, setData] = useState<DataType[]>([])
    const [showAlert, setShowAlert] = useState<boolean>(false)

    const onSubmit = (values: any): void => {
        // Init Firebase
        const ref = database.ref()
        const uniqueKey = ref.child('orders').push().key

        // Form Data To Submit
        const dataToSubmit = {
            payBy: values.payBy,
            foodTotal: +values.foodTotal,
            deliveryTotal: +values.deliveryTotal,
            discountTotal: +values.discountTotal,
            orderDate: moment(values.orderDate)
                .tz('Asia/Kuala_Lumpur')
                .format('YYYY-MM-DD HH:mm:ss'),
            taxTotal: +values.taxTotal,
            cleared: 0,
            details: {},
            key: uniqueKey!,
        }
        dataToSubmit.details = data

        // Submit to firebase
        const usersRef = ref.child('orders').child(uniqueKey!)
        usersRef.set(dataToSubmit).then((): void => {
            setShowAlert(true)
        })
    }

    const onRowClick = (record: any): any => {
        return {
            onClick: (): void => {
                setData(data.filter((item: DataType): any => item.key !== record.key))
            },
        }
    }

    const onRowAdd = (): void => {
        setData((): DataType[] => [
            ...data,
            {
                key: data.length + 1,
                name: nameToAdd,
                amount: amountToAdd,
            },
        ])
    }

    return (
        <>
            {showAlert && (
                <Alert message="Data Saved Successfully" type="success" showIcon={true} />
            )}
            <Table onRow={onRowClick} columns={columns} dataSource={data} />
            <Form
                labelCol={{ span: 2 }}
                layout={'horizontal'}
                initialValues={{ size: 'large' }}
                size={'large'}
                onFinish={onSubmit}
            >
                <Form.Item label="Pay By" name="payBy">
                    <Select>
                        <Select.Option value="hansheng">Han Sheng</Select.Option>
                        <Select.Option value="annabelle">Annabelle</Select.Option>
                        <Select.Option value="elizabeth">Elizabeth</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Food Total" name="foodTotal">
                    <Input />
                </Form.Item>
                <Form.Item label="Delivery Total" name="deliveryTotal">
                    <Input />
                </Form.Item>
                <Form.Item label="Discount" name="discountTotal">
                    <Input />
                </Form.Item>
                <Form.Item label="Tax" name="taxTotal">
                    <Input />
                </Form.Item>
                <Form.Item label="Date" name="orderDate">
                    <DatePicker />
                </Form.Item>
                <Divider />
                <Form.Item label="Name">
                    <Select onSelect={(e: string): void => setNameToAdd(e)}>
                        <Select.Option value="hansheng">Han Sheng</Select.Option>
                        <Select.Option value="annabelle">Annabelle</Select.Option>
                        <Select.Option value="elizabeth">Elizabeth</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Amount">
                    {/* tslint:disable-next-line:prettier */}
                    <Input onChange={(e: ChangeEvent<HTMLInputElement>): void => setAmountToAdd(+e.target.value)} />
                </Form.Item>
                <Form.Item label="Button">
                    <Button htmlType="button" onClick={onRowAdd}>
                        Add
                    </Button>
                </Form.Item>
                <Divider />
                <Form.Item label="Button">
                    <Button htmlType="submit">Submit</Button>
                </Form.Item>
            </Form>
        </>
    )
}
