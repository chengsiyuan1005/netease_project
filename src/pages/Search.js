import React, { useState, useEffect } from 'react';
import './pageCss/Search.css';
import { useGetFetch, usePostFetch } from '../hooks/useFetch';
import { Spin, Carousel } from 'antd';
import {
    ArrowLeftOutlined
} from '@ant-design/icons';
import { Link, Outlet } from 'react-router-dom';
import { useInput } from '../hooks/useInput';


export default function Search() {
    // 推荐歌手api
    const [hotSongsLoading, hotSongs] = useGetFetch('http://127.0.0.1:9115/search/hot', { offset: 0 });
    // console.log(hotSongs);

    // 输入
    const info = useInput('');
    console.log('输入框中的信息为: ', info.value);

    // 搜索内容api
    // 歌手, 专辑
    // const [suggestLoading, suggest] = useGetFetch('http://127.0.0.1:9115/search/suggest', { keywords: info });
    // 音乐
    // const [searchLoading, search] = useGetFetch('http://127.0.0.1:9115/search', { keywords: info });

    // console.log('search中: ', search);
    const [theSingers, setTheSingers] = useState('');
    const [theAlbums, setTheAlbums] = useState('');
    const [theSongsData, setTheSongsData] = useState('');
    const [isRight, setIsRight] = useState(false);
    const [t, setT] = useState(0);



    useEffect(() => {
        if (!info.value) {
            return;
        }
        if (info.value !== undefined) {
            fetch(`http://127.0.0.1:9115/search/suggest?keywords=${info.value.trim()}`).then(response => {
                return response.json();
            }).then(dataOne => {

                setTheSingers(dataOne);
                setTheAlbums(dataOne);
                console.log('suggest中: ', dataOne);
            }).catch()

            fetch(`http://127.0.0.1:9115/search?keywords=${info.value}`).then(response => {
                return response.json();
            }).then(dataTwo => {
                console.log('search中: ', dataTwo);
                setTheSongsData(dataTwo.result);
            }).catch()
        }

        return () => {
            setIsRight(true);
        }
    }, [info.value])
    console.log('这是真or假?: ', isRight);
    console.log(theSingers, theAlbums, theSongsData);





    // // 拿出歌手, 专辑 (如果有的话)
    // let theSingers = [];
    // let theAlbums = [];
    // let theSongsData = [];
    // if (!suggestLoading && !searchLoading) {
    //     if (suggest.result.playlists.length >= 1) {
    //         theAlbums = suggest.result.playlists;
    //     }
    //     if (suggest.result.artists.length >= 1) {
    //         theSingers = suggest.result.artists;
    //     }
    //     theSongsData = search;
    // }
    // console.log(theAlbums, theSingers, theSongsData);


    return (
        <div className='Search'>
            <div className="head-mat">
                <div className="head">
                    <Link to={"/"}><ArrowLeftOutlined className='arrow' /></Link>
                    <input type="text" className='search-input' placeholder='搜索歌曲, 歌手, 专辑' {...info} id='special'/>
                </div>
                <div className="hot-search">
                    <h1>热门搜索</h1>
                    <ul className="hot-search-list">
                        {
                            hotSongsLoading ? <Spin /> : hotSongs.result.hots.map((v, i) =>
                                <li key={i}><span>{v.first}</span></li>
                            )
                        }
                    </ul>
                </div>
            </div>

            {
                !isRight ? '' : <div className="over">
                    <ul className="over-singer">
                        <h5>相关歌手</h5>
                        {
                            !theSingers ? <Spin /> : theSingers.result.artists.map((v) => <li key={v.id}>
                                <img src={`${v.picUrl}`} alt="" />
                                <span>歌手: {v.name}</span>
                            </li>)
                        }
                        <h5>相关歌单</h5>
                        {
                            !theAlbums ? <Spin /> : theAlbums.result.playlists.map((v) => <li key={v.id}>
                                <img src={`${v.coverImgUrl}`} alt="" />
                                <span>{v.name}</span>
                            </li>)
                        }
                        {
                            !theSongsData ? <Spin /> : theSongsData.songs.map(v => <li key={v.id}>
                                <h3>{v.name}</h3>
                                {
                                    v.artists.map(subV => <mark key={subV.id}>{subV.name}</mark>)
                                }
                            </li>)
                        }
                    </ul>
                </div>
            }

        </div>
    )
}
