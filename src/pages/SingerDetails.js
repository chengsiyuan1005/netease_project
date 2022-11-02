import React, { useEffect, useState } from "react";
import './pageCss/SingerDetails.css';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import {
    ArrowLeftOutlined,
    PlusOutlined,
    PlayCircleOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useGetFetch, usePostFetch } from '../hooks/useFetch';
import { Spin } from 'antd';
import store from "../redux/store/store";

export default function SingerDetails() {
    /* 第一种params方法传递参数：用useParams来获取 */
    const getParams = useParams();
    console.log(getParams);

    /* useEffect(() => {
      console.log(getParams);
    }) */

    // 获取整体data
    const [SongsDataLoading, SongsData] = useGetFetch('http://127.0.0.1:9115/artists', { id: getParams.id });
    console.log(SongsData, SongsDataLoading);

    // const [one, setOne] = useState([]);

    let songsList = SongsDataLoading ? '' : SongsData.hotSongs;



    // 获取头部数据
    let headData = null;
    let hotSongs = null;
    if (!SongsDataLoading) {
        // 歌单头信息
        headData = SongsData.artist;
        hotSongs = SongsData.hotSongs;

    }
    console.log(headData);
    console.log(hotSongs);



    // 向store传入dispatch
    function toPlayMusic(id, index) {
        console.log('这是点击id: ', id, index);
        let action = {
            type: 'CHANG_SONGS_LIST',
            value: {
                songsList: songsList,
                currentSongId: id,
                currentSongIndex: index
              }
        }
        store.dispatch(action);
        console.log(store.getState());
        
    }




    return (
        <div className="SingerDetails">
            {
                SongsDataLoading ? <Spin /> : <div className="back-img">
                    <img src={`${headData.picUrl}`} alt="" />
                    <div className="collection-songs"></div>
                    <div className="back-then">
                        <Link to={'/singer'}><ArrowLeftOutlined className="go-back-go" /></Link>
                        {headData.name}
                    </div>
                </div>
            }

            <div className="down">
                <div className="songs-content">
                    <div className="first-li">
                        <div className="first-li-left">
                            <PlayCircleOutlined className="play-all" />
                            <mark className="big-mark-one">播放全部</mark>
                            <mark className="small-mark-one">(共50首)</mark>
                        </div>
                        <div className="first-li-right">
                            <PlusOutlined />
                            <span>收藏</span>
                        </div>
                    </div>
                    <ul className="all-li">
                        {
                            SongsDataLoading ? <Spin /> : hotSongs.map((v, i) => <li key={v.al.id} className='all-li-box' onClick={() => toPlayMusic(v.al.id, i)}>
                                <div className="all-li-box-left">{i + 1}</div>
                                <div className="all-li-box-right">
                                    <p>{v.name}</p>
                                    <p>
                                        {
                                            v.ar.map(subV => <span key={subV.id}>{subV.name} </span>)
                                        }
                                    </p>
                                </div>
                            </li>)

                        }

                    </ul>
                </div>
            </div>
        </div>

    )
}
