import React, { useEffect, useState } from "react";
import './pageCss/SongsSheet.css';
import { useLocation, useParams, useSearchParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeftOutlined,
  HeartOutlined,
  MoreOutlined,
  MessageOutlined,
  PlusOutlined,
  PlayCircleOutlined,
  
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useGetFetch, usePostFetch } from '../hooks/useFetch';
import { Spin } from 'antd';
import store from '../redux/store/store';

export default function SongsSheet() {
  /* 第一种params方法传递参数：用useParams来获取 */
  const getParams = useParams();
  console.log(getParams);

  /* useEffect(() => {
    console.log(getParams);
  }) */

  // 获取整体data
  const [SongsSheetDataLoading, SongsSheetData] = useGetFetch('http://127.0.0.1:9115/playlist/detail', { id: getParams.id });
  console.log(SongsSheetData, SongsSheetDataLoading);

  // 获取歌单列表
  let songsList = SongsSheetDataLoading ? '' : SongsSheetData.playlist.tracks;
  console.log(songsList);


  // 获取头部数据
  let headData = null;
  if (!SongsSheetDataLoading) {
    // 歌单头信息
    headData = SongsSheetData.playlist;

  }
  console.log(headData);
  // console.log(songsId);

  // 获取每条歌曲数据
  // let temporaryArr = [];
  // useEffect(() => {
  //   if (songsId.length === 10) {
  //     for (let i = 0; i < songsId.length; i++) {
  //       fetch(`http://127.0.0.1:9115/lyric?id=${songsId[i].id}`).then(response => {
  //         return response.json();
  //       }).then(data => {
  //         console.log('每条歌曲中的信息: ', data);
  //         // temporaryArr.push(data);
  //       }).catch()
  //     }
  //   }

  // })

  // setSongsArr(temporaryArr);
  // console.log('得到的songsArr: ', songsArr);

  // 点击事件进入进入歌曲播放组件
  // const navigate = useNavigate();
  function toPlayMusic(id, index) {
    console.log('这是点击id: ', id);
    const action = {
      type: 'CHANG_SONGS_LIST',
      value: {
        songsList: songsList,
        currentSongId: id,
        currentSongIndex: index,
        musicPause: 1,
        isOpen: true
      }
    };
    store.dispatch(action);

    console.log(store.getState());
  }




  return (
    <div className="SongsSheet">
      {
        SongsSheetDataLoading ? <Spin /> :
          <div className="back-img">
            <img src={`${headData.coverImgUrl}`} alt="" style={{ filter: 'blur(8px)' }} />
            <div className="up">
              <div className="up-up" key={headData.id}>
                <img src={`${headData.coverImgUrl}`} alt="" />
                <div className="up-up-right">
                  <div className="title">{headData.name}</div>
                  <div className="user-info">
                    <img src={`${headData.creator.avatarUrl}`} alt="" className="head-pic" />
                    <p>{headData.creator.nickname}</p>
                  </div>
                </div>
              </div>
              <div className="go-back">
                <Link to={'/recommend'}><ArrowLeftOutlined className="go-back-go" /></Link> 歌单
              </div>
              <ul className="four-items">
                <li className="four-one">
                  <MessageOutlined />
                  <p>评论</p>
                </li>
                <li className="four-two">
                  <HeartOutlined />
                  <p>点赞</p>
                </li>
                <li className="four-three">
                  <PlusOutlined />
                  <p>收藏</p>
                </li>
                <li className="four-four">
                  <MoreOutlined />
                  <p>更多</p>
                </li>
              </ul>
              <div className="up-down"></div>
            </div>
          </div>
      }

      <div className="down">
        <div className="songs-content">
          <div className="first-li">
            <div className="first-li-left">
              <PlayCircleOutlined className="play-all" />
              <mark className="big-mark-one">播放全部</mark>
              <mark className="small-mark-one">(共10首)</mark>
            </div>
            <div className="first-li-right">
              <PlusOutlined />
              <span>收藏(<mark className="fir-ri-mark">xxx</mark>万)</span>
            </div>
          </div>
          <ul className="all-li">
            {
              SongsSheetDataLoading ?  <Spin/> : SongsSheetData.playlist.tracks.map((v, i) => <li key={v.id} className='all-li-box' onClick={() => toPlayMusic(v.id, i)}>
              <div className="all-li-box-left">{i + 1}</div>
              <div className="all-li-box-right">
                <p>{v.name}</p>
                <p>
                  {
                    v.ar.map(subV => <span key={subV.id}>{subV.name}</span>)
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
