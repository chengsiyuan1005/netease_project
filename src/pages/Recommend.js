import React, { useState, useEffect } from 'react';
import './pageCss/Recommend.css';
import { useGetFetch, usePostFetch } from '../hooks/useFetch';
import { Spin, Carousel } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
// import { useRecommendSongsUrl } from '../hooks/useGetUrl';

export default function Recommend() {
  // const [banner, setBanner] = useState;
  // const [bannerApi, setBannerApi] = useEffect;
  /* useEffect(() => {
    let data = $fetch.getBanner();
    console.log(data);
  }) */

  // 轮播图api
  const [bannersLoading, bannersData] = useGetFetch('http://127.0.0.1:9115/banner', { type: 2 });
  console.log(bannersData, bannersLoading);
  // 推荐歌单api
  const [songsLoading, songsData] = useGetFetch('http://127.0.0.1:9115/personalized', { type: 2 });
  console.log(songsData);

  // // 点击获取推荐歌单UrlId
  // const [clickRecommendSongsUrl, setClickRecommendSongsUrl] = useState(0);
  // // useRecommendSongsUrl
  // const [recommendSongsUrl] = useRecommendSongsUrl(clickRecommendSongsUrl);

  const navigate = useNavigate();
  function jumpTo(id) {
    console.log('这是点击id: ', id);
    navigate( '/recommend/' + id);
  }



  return (
    <div className='Recommend'>
      <ul className="banner-base">
        <Carousel autoplay>
          {

            bannersLoading ? <Spin /> : bannersData.banners.map((v, i) =>
              <li key={i}><img src={`${v.pic}`} alt="" className='contentStyle' /></li>
            )
          }
        </Carousel>
      </ul>
      <h1 className='rec-menu'>推荐歌单</h1>
      <ul className="songs">

        {
          songsLoading ? <Spin /> : songsData.result.map((v, i) =>
              <li key={v.id} onClick={() => jumpTo(v.id)}>
                <img src={`${v.picUrl}`} alt="" />
                <p>{v.name}</p>
              </li>
          )
        }
      </ul>
    </div>
  )
}
