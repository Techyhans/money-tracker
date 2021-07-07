import {
    Form,
    Input,
    Button,
    Select,
    Cascader,
    DatePicker,
    InputNumber,
    TreeSelect,
    Switch,
} from 'antd'
import { database } from '../../auth/FirebaseAuth'
import { JSXElementConstructor } from 'react'

export const FormInsert = (): JSX.Element => {
    const onSubmit = (values: any): void => {
        const ref = database.ref()
        const uniqueKey = ref.child('2').push().key
        const usersRef = ref.child(uniqueKey!)
        usersRef
            .set({
                alanisawesome: {
                    date_of_birth: 'June 23, 1912',
                    full_name: 'Alan Turing',
                },
                gracehop: {
                    date_of_birth: 'December 9, 1906',
                    full_name: 'Grace Hopper',
                },
            })
            .then((r) => console.log(r))
    }

    return (
        <>
            <Form
                labelCol={{ span: 2 }}
                layout={'horizontal'}
                initialValues={{ size: 'large' }}
                size={'large'}
                onFinish={onSubmit}
                onFinishFailed={() => null}
            >
                <Form.Item label="Name">
                    <Input />
                </Form.Item>
                <Form.Item label="Select">
                    <Select>
                        <Select.Option value="demo">Demo</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="TreeSelect">
                    <TreeSelect
                        treeData={[
                            {
                                title: 'Light',
                                value: 'light',
                                children: [{ title: 'Bamboo', value: 'bamboo' }],
                            },
                        ]}
                    />
                </Form.Item>
                <Form.Item label="Cascader">
                    <Cascader
                        options={[
                            {
                                value: 'zhejiang',
                                label: 'Zhejiang',
                                children: [
                                    {
                                        value: 'hangzhou',
                                        label: 'Hangzhou',
                                    },
                                ],
                            },
                        ]}
                    />
                </Form.Item>
                <Form.Item label="DatePicker">
                    <DatePicker />
                </Form.Item>
                <Form.Item label="InputNumber">
                    <InputNumber />
                </Form.Item>
                <Form.Item label="Switch">
                    <Switch />
                </Form.Item>
                <Form.Item label="Button">
                    <Button htmlType="submit">Button</Button>
                </Form.Item>
            </Form>
        </>
    )
}
