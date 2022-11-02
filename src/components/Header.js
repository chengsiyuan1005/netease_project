import React from 'react';
import './componentsCss/Header.css';
import {
    MenuOutlined,
    SearchOutlined
} from '@ant-design/icons';
import { NavLink } from 'react-router-dom';

export default function Header() {
    const isActive = ({ isActive }) => ({ borderBottom: isActive ? "#fff solid .2rem" : "none" })

    return (
        <div className='Header'>
            <div className="header-over">
                <div className="search">
                    <NavLink to={"/login"}><MenuOutlined className='search-one' /></NavLink>
                    <span className='search-two'>云音悦</span>
                    <NavLink to={"/search"}><SearchOutlined className='search-three' /></NavLink>
                </div>
                <ul className="items">
                    <li><NavLink to={"/recommend"} style={isActive}>推荐</NavLink></li>
                    <li><NavLink to={"/singer"} style={isActive}>歌手</NavLink></li>
                    <li><NavLink to={"/rank"} style={isActive}>排行榜</NavLink></li>
                </ul>
            </div>
        </div>
    )
}
