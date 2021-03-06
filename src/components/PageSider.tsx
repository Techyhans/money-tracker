import { Layout, Menu, Breadcrumb } from 'antd'
import { DesktopOutlined, PieChartOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons'
import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogOut } from './LogOut'

const { Header, Content, Footer, Sider } = Layout
const { SubMenu } = Menu

export const PageSider = (): JSX.Element => {
    const [collapsed, setCollapsed] = useState(false)
    const [isLogOutMode, setIsLogOutMode] = useState(false)
    const navigate = useNavigate()

    const onCollapse = (): void => {
        setCollapsed(!collapsed)
    }

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible={true} collapsed={collapsed} onCollapse={onCollapse}>
                <div className="logo" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item
                        key="1"
                        icon={<DesktopOutlined />}
                        onClick={(): void => navigate('/app/dashboard')}
                    >
                        Dashboard
                    </Menu.Item>
                    <Menu.Item
                        key="2"
                        icon={<PieChartOutlined />}
                        onClick={(): void => navigate('/app/insert')}
                    >
                        Insert Record
                    </Menu.Item>
                    <SubMenu key="sub1" icon={<UserOutlined />} title="User">
                        <Menu.Item key="3">Tom</Menu.Item>
                        <Menu.Item key="4">Bill</Menu.Item>
                        <Menu.Item key="5">Alex</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
                        <Menu.Item key="6">Team 1</Menu.Item>
                        <Menu.Item key="8">Team 2</Menu.Item>
                    </SubMenu>
                    <Menu.Item
                        key="9"
                        icon={<UserOutlined />}
                        onClick={(): void => setIsLogOutMode(!isLogOutMode)}
                    >
                        Log Out
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }} />
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>Bill</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                        {isLogOutMode && <LogOut />}
                        <Outlet />
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ??2018 Created by Ant UED</Footer>
            </Layout>
        </Layout>
    )
}
