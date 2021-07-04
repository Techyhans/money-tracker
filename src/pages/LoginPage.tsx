import { Card } from 'antd';

import {Login} from "../components/Login";
import "../css/login.css"

export const LoginPage = () => {
    return (
        <div className={"login-container"}>
            <Card style={{ width: "100%" }}>
                <Login />
            </Card>
        </div>
    )
}
