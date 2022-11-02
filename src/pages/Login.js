import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import './pageCss/Login.css';
import { HomeOutlined } from '@ant-design/icons';
import { useInput } from '../hooks/useInput';

export default function Login() {

    // 登录页面接收注册页面传来的token & nickName (如果有的话)
    const currentLocation = useLocation();
    console.log(currentLocation);

    // 用户名
    const nickName = useInput();
    // 手机号
    const phoneNumber = useInput();
    // 密码
    const passWord = useInput();
    console.log(nickName.value);

    // state中传值 nickName & phoneNumber
    let demo
    currentLocation.state ? nickName.value = currentLocation.state.nickName : demo = null;
    currentLocation.state ? phoneNumber.value = currentLocation.state.phoneNumber : nickName.phoneNumber = null;

    // 存登录信息
    const [loginInfo, setLoginInfo] = useState();
    // 存点击登录是否点击登录按钮
    const [isLoginInBtn, setIsLoginInBtn] = useState(0);

    // 点击登录
    const loginIn = () => {
        setIsLoginInBtn(isLoginInBtn + 1);
    }
    // 登录 (点击登录才登录)
    useEffect(() => {
        fetch(`http://127.0.0.1:9115/login/cellphone?phone=${phoneNumber}&password=${passWord}`).then(response => {
            return response.json();
        }).then(data => {
            setLoginInfo(data);
            console.log('登录信息~~~', data);
        }).catch()
    }, [isLoginInBtn])



    return (
        <div className='Login'>
            <div className="login-header">
                <Link to={'/'}><HomeOutlined /></Link>
            </div>
            <div className="login-in">
                <h2>登录</h2>
            </div>
            <form action="" method="get" id='register'>
                <span>用户名: </span>
                <input type="text" name="" id="" {...nickName} />
                <span>手机号: </span>
                <input type="text" {...phoneNumber} />
                <span>密&nbsp;&nbsp;&nbsp;&nbsp;码: </span>
                <input type="password" name="" id="" {...passWord} />
            </form>
            <div className="login-btn-over">
                <button id='login-btn' onClick={loginIn}>登录</button>
            </div>
            <div className="go-register">
                <p>没有账号? <NavLink to={"/register"}><span>点击注册</span></NavLink></p>
            </div>
        </div>
    )
}
