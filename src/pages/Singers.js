import React, { useState, useEffect } from 'react';
import './pageCss/Singers.css';
import { useGetFetch, usePostFetch } from '../hooks/useFetch';
import { categoryTypes, alphaTypes } from '../others/singerSort';
import { Spin } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function Singers() {
  // 推荐歌手api
  const [singersLoading, singersData] = useGetFetch('http://127.0.0.1:9115/top/artists', { offset: 0 });

  console.log(singersLoading, singersData);
  // console.log(categoryTypes);
  // console.log(alphaTypes);

  const [singerSortId, setSingerSortId] = useState('');
  const [alphaSortId, setAlphaSortId] = useState('');
  const [booleanSinger, setBooleanSinger] = useState(false);
  // 等到的newSingers数据
  const [newSingers, setNewSingers] = useState('');

  // Effect 更新 歌手页面
  useEffect(() => {
    // 点击后初始化即显示
    console.log(singerSortId, alphaSortId);
    // console.log(selectSingersData);
    fetch(`http://127.0.0.1:9115/artist/list?cat=${singerSortId}&initial=${alphaSortId}&offset=0`).then(response => {
      return response.json();
    }).then(data => {
      console.log(data);
      setNewSingers(data);
    }).catch()

    return () => {
      setBooleanSinger(true);
    }

  }, [singerSortId, alphaSortId])

  console.log('让我康康!!', booleanSinger);
  console.log('新的歌手列表', newSingers);

  // 进入歌手详情页
  const navigate = useNavigate();
  function toOneSinger(id) {
    console.log('这是点击id: ', id);
    navigate('/singer/' + id);
  }




  return (
    <div className='Singers'>
      <div className="singers-up">
        <div className="singers-up-one">
          <div className="default-sort">
            <span>分类(默认热门): </span>
            {
              categoryTypes.map(v =>
                <a href="###" key={v.key} onClick={() => { setSingerSortId(v.key) }}>{v.name}</a>
              )
            }
          </div>
        </div>
        <div className="singers-up-two">
          <div className="initial">
            <span>首字母: </span>
            {
              alphaTypes.map(v =>
                <a href="###" key={v.key} onClick={() => { setAlphaSortId(v.key) }}>{v.name}</a>
              )
            }
          </div>
        </div>
      </div>
      {/* content */}
      <div className="singers-content">
        {
          !booleanSinger ? (singersLoading ? <Spin /> : singersData.artists.map((v, i) =>
            <div key={v.id} className="singer-content-box" onClick={() => toOneSinger(v.id)}>
              <img src={`${v.img1v1Url}`} alt="" />
              <p>{v.name}</p>
            </div>
          )) : (singersLoading ? <Spin /> : newSingers.artists.map((v, i) =>
            <div key={v.id} className="singer-content-box" onClick={() => toOneSinger(v.id)}>
              <img src={`${v.img1v1Url}`} alt="" />
              <p>{v.name}</p>
            </div>
          ))

          /* singersLoading ? <Spin /> : singersData.artists.map((v, i) =>
              <div key={v.id} className="singer-content-box">
                <img src={`${v.img1v1Url}`} alt="" />
                <p>{v.name}</p>
              </div>
          ) */
        }
      </div>

    </div>
  )
}
