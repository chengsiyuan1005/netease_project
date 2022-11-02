import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './pageCss/Register.css';
import {
    HomeOutlined,
    UserSwitchOutlined
} from '@ant-design/icons';
import { useInput } from './../hooks/useInput';
import { useCookieState } from 'ahooks';

export default function Register() {

    // 路由跳转
    const navigate = useNavigate();

    // 默认验证码为false
    const [isCaptcha, setIsCaptcha] = useState(true);
    // 获取验证码
    const [captcha, setCaptcha] = useState();
    // 刷新验证码点击事件
    const [clickSendCaptcha, setClickSendCaptcha] = useState(0);
    // 刷新验证码判断是否正确点击事件
    const [clickRegisterBtn, setClickRegisterBtn] = useState(0);

    // 昵称
    const nickName = useInput();
    // 手机号
    const phoneNumber = useInput();
    // 验证码
    const captchaNumber = useInput();
    // 密码
    const passWord = useInput();
    // 确认密码
    const confirm = useInput();

    // 昵称受控组件
    const [conNickName, setConNickName] = useState('');
    // 手机号受控组件
    const [conPhoneNumber, setConPhoneNumber] = useState('');
    // 密码受控组件
    const [conPassWord, setConPassWord] = useState('');
    // 确认密码受控组件
    const [conConfirm, setConConfirm] = useState('');
    // 验证码受控组件
    const [conCaptchaNumber, setConCaptchaNumber] = useState('');

    // 昵称错误提示
    const errorNickName = useRef();
    // 手机号错误提示
    const errorPhoneNumber = useRef();
    // 密码错误提示
    const errorPassword = useRef();
    // 确认密码错误提示
    const errorConfirm = useRef();
    // 验证码错误提示
    const errorCaptcha = useRef();

    // 昵称受控
    if (conNickName.length) {
        conNickName.length > 6 ? errorNickName.current.style.opacity = 1 : errorNickName.current.style.opacity = 0;

    }

    // 手机号受控
    if (conPhoneNumber.length) {
        conPhoneNumber.length > 11 ? errorPhoneNumber.current.style.opacity = 1 : errorPhoneNumber.current.style.opacity = 0;
    }

    // 密码受控
    if (conPassWord.length) {
        conPassWord.length > 16 ? errorPassword.current.style.opacity = 1 : errorPassword.current.style.opacity = 0;
    }

    // 确认密码受控
    if (conConfirm.length) {
        conConfirm.length > 16 ? errorConfirm.current.style.opacity = 1 : errorConfirm.current.style.opacity = 0;
    }

    // 验证码受控
    if (conCaptchaNumber.length) {
        conCaptchaNumber.length > 5 ? errorCaptcha.current.style.opacity = 1 : errorCaptcha.current.style.opacity = 0;
    }

    // 保存token到Cookie中
    const [token, setToken] = useCookieState('', {
        // 小存7天
        expires: (() => new Date(+new Date() + 1000 * 60 * 60 * 24 * 7))()
    });



    // 获取验证码数据 (点击'发送验证码'后 才刷新获取验证码数据)
    const sendCaptcha = () => {
        setIsCaptcha(false);
        setClickSendCaptcha(clickSendCaptcha + 1);
        console.log(clickSendCaptcha);
        console.log(phoneNumber.value);
        console.log(conPhoneNumber);
    }
    // 手机号获取验证码接口
    useEffect(() => {
        fetch(`http://127.0.0.1:9115/captcha/sent?phone=${conPhoneNumber}`).then(response => {
            return response.json();
        }).then(data => {
            setCaptcha(data)
            console.log(data);
        }).catch()
    }, [clickSendCaptcha])

    // 登录(判断验证码正确接口, 注册接口)
    const registerBtn = () => {
        // 昵称 / 密码 为空
        if (conNickName.length === 0) {
            alert('昵称栏为空!')
        } else if (conPassWord.length === 0) {
            alert('密码栏为空!')
        }


        console.log(captchaNumber.value);
        setClickRegisterBtn(clickRegisterBtn + 1);

        console.log(conCaptchaNumber);
        // 输入框中内容
        console.log('昵称::::' + conNickName, '密码:::' + conPassWord);

        if (token) {
            navigate('/login', { state: { token: token, nickName: conNickName, phoneNumber: conPhoneNumber } });
        }



    }
    // 验证码判断是否正确接口
    useEffect(() => {
        fetch(`http://127.0.0.1:9115/captcha/verify?phone=${conPhoneNumber}&captcha=${conCaptchaNumber}`).then(response => {
            return response.json();
        }).then(data => {
            setCaptcha(data)
            console.log(data);
            // 判断验证码是否正确
            if (data.data) {
                console.log('进来了');
                // 判断输入格式:
                if (conNickName.length <= 6 && conNickName.length > 0 && conPhoneNumber.length === 11 && conPassWord.length <= 16 && conPassWord.length > 0 && conPassWord === conConfirm && conCaptchaNumber.length <= 5) {
                    console.log('输入格式正确!');
                    fetch(`http://127.0.0.1:9115/register/cellphone?phone=${conPhoneNumber}&password=${conPassWord}&captcha=${conCaptchaNumber}&nickname=${conNickName}`).then(response => {
                        return response.json();
                    }).then(data => {
                        setCaptcha(data)
                        console.log(data);
                        data.token ? setToken(data.token) : setToken('');
                    }).catch()
                }
            }


        }).catch()
    }, [clickRegisterBtn])



    return (
        <div className='Register'>
            <div className="register-header">
                <Link to={'/'}><HomeOutlined /></Link>
                <Link to={'/login'}><UserSwitchOutlined /></Link>
            </div>
            <div className="register-in">
                <h2>注册</h2>
            </div>
            <form action="" method="get" id='register'>
                <span>昵&nbsp;&nbsp;&nbsp;&nbsp;称: </span>
                <span ref={errorNickName}> 昵称太长!</span>
                <input type="text" name="" id="" {...nickName} onChange={(e) => setConNickName(e.target.value)} />
                <span>手机号: </span>
                <span ref={errorPhoneNumber}> 手机号太长!</span>
                <input type="text" {...phoneNumber} onChange={(e) => setConPhoneNumber(e.target.value)} />
                <span>密&nbsp;&nbsp;&nbsp;&nbsp;码: </span>
                <span ref={errorPassword}> 密码太长!</span>
                <input type="password" name="" id="" {...passWord} onChange={(e) => setConPassWord(e.target.value)} />
                <span>确认密码:</span>
                <span ref={errorConfirm}> 确认密码太长!</span>
                <input type="password" name="" id="" {...confirm} onChange={(e) => setConConfirm(e.target.value)} />
                <span className='span-captcha'>验证码:</span>
                <span ref={errorCaptcha} className='captcha-over'> 验证码太长!</span>
                <input type="text" className='captcha' disabled={isCaptcha} placeholder='输入验证码' {...captchaNumber} onChange={(e) => setConCaptchaNumber(e.target.value)} />
            </form>
            <button className='send-captcha' onClick={sendCaptcha}>发送验证码</button>
            <div className="register-btn-over">
                <button id='register-btn' onClick={registerBtn}>注册</button>
            </div>
        </div>
    )
}
