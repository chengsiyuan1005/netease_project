import React from 'react';
import './pageCss/Rank.css';
import { useGetFetch, usePostFetch } from '../hooks/useFetch';
import { Spin, Carousel } from 'antd';

export default function Rank() {
  // 官方榜
  const [officialRankLoading, officialRankData] = useGetFetch('http://127.0.0.1:9115/toplist/detail', { type: 2 });
  console.log(officialRankData);


  return (
    <div className='Rank'>
      <h1 className='official-rank-h1'>官方榜单</h1>
      <ul className="official-rank">
        {

          officialRankLoading ? <Spin /> : officialRankData.list.slice(0, 4).map((v, i) =>
            <li key={i} className='official-rank-box'>
              <div className="official-rank-box-left">
                <img src={`${v.coverImgUrl}`} alt="" className='contentStyle' />
              </div>
              <span>{v.updateFrequency}</span>
              <div className="official-rank-box-right">
                {
                  v.tracks.map((subV, subI) =>
                    <p key={subI}>{subV.first} - {subV.second}</p>
                  )
                }

              </div>
            </li>
          )
        }
      </ul>
      <ul className='global-rank'>
        {
          officialRankLoading ? <Spin /> : officialRankData.list.slice(4, officialRankData.list.length - 1).map((v, i) => 
              <li className='global-rank-box' key={i}><img src={`${v.coverImgUrl}`} alt="" /></li>
            )
        }
      </ul>
    </div>
  )
}
