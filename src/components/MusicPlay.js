import React, { useEffect, useRef, useState } from 'react';
// import { useGetFetch } from '../hooks/useFetch'
import './componentsCss/MusicPlay.css';
import {
    UnorderedListOutlined,
    LoadingOutlined,
    RetweetOutlined,
    DeleteOutlined,
    HeartOutlined,
    ShrinkOutlined,
    DownOutlined,
    CaretLeftOutlined,
    CaretRightOutlined,
    PlayCircleOutlined,
    MenuUnfoldOutlined,
    FieldBinaryOutlined,
    ThunderboltOutlined
} from '@ant-design/icons';
import store from '../redux/store/store';
import { Spin } from 'antd';


export default function MusicPlay() {

    // 点击出现/消失
    const musicListOver = useRef();
    const songsAppear = useRef();
    // 获取audio标签
    const playSongAudio = useRef();
    const oneBegin = useRef();
    const onePause = useRef();
    const twoBegin = useRef();
    const twoPause = useRef();
    // 获取MusicPlay标签
    const isOpen = useRef();
    // 两个图片
    const showImg = useRef();

    const changeUp = () => {
        musicListOver.current.style.display = "block"
    }
    const changeDown = () => {
        musicListOver.current.style.display = "none"
    }

    const songsUp = () => {
        songsAppear.current.style.display = "block"
    }
    const songsDown = () => {
        // window.event? window.event.cancelBubble = true : e.stopPropagation();
        songsAppear.current.style.display = "none"
        console.log(1);
    }


    // 大坑：redux中，当store数据更新后，界面数据并不会直接更新，需要手动更新
    // 初始化一个update数据使用useState()，主要是为了通过setUpdate()来更新组件
    // 模拟render()生命周期，实现组件重新加载，以更新界面的store数据
    const [update, setUpdate] = useState(false);

    // useEffect模拟componentDidMount()生命周期
    useEffect(() => {
        // store.subscribe()是redux提供的，监测store更新的函数
        store.subscribe(() => {
            // 当store数据更新后执行 setUpdate() ，组件重新加载，实现界面store数据更新
            setUpdate(store.getState());
            if (update.isOpen === true) {
                playSongAudio.current.play()
                onePause.current.style.display = "none";
                oneBegin.current.style.display = "block";
                twoPause.current.style.display = "none";
                twoBegin.current.style.display = "block";
                // isOpen.current.style.display = "block";

            }
        })
    })
    // 点击后直接渲染, 只是第一次渲染MusicPlay组件就够了!
    if (update.isOpen === true) {
        isOpen.current.style.display = "block";
    }

    // 点击---------------------------------------------
    // 获取本条数据( 从store中 )
    let thisPieceId = update.currentSongId;
    console.log(thisPieceId);
    // 获取本条下标
    let thisPieceIndex = update.currentSongIndex;
    // 有播放列表了才能获取到值
    let thisPiece = !update ? '' : update.songsList[update.currentSongIndex];
    console.log('当前歌曲信息: ', thisPiece);
    // 是否是单曲播放
    let thisISSinglesPlay = update.isSinglesPlay;

    // 获取歌词-----------------------------------------
    // let lyricArr = !CurrentLyricLoading ? '' : CurrentLyric.lrc.lyric;
    // console.log('歌词----------------------', lyricArr);
    const [lyric, setLyric] = useState(false);
    useEffect(() => {
        if (thisPieceId) {
            fetch(`http://127.0.0.1:9115/lyric?id=${store.getState().currentSongId}`).then(response => {
                return response.json();
            }).then(data => {
                // console.log('歌词---------------歌词--------------------', data);
                setLyric(data)

            }).catch()
        }

    }, [thisPieceId])

    let preLyricArr = lyric ? (lyric.lrc ? lyric.lrc.lyric.split('\n') : '') : '';
    let transLyricArr = lyric ? (lyric.tlyric ? lyric.tlyric.lyric.split('\n') : '') : '';

    // 原歌词
    let preLyricObj = {};
    let transLyricObj = {};
    // 时间数组
    let preLyricArrTime = [];

    for (let i = 0; i < preLyricArr.length; i++) {
        let preLyricTime = preLyricArr[i].substring(1, 6);
        let preLyricText = preLyricArr[i].substring(11);
        preLyricObj[preLyricTime] = preLyricText;
        // 对时间做操作
        // 分
        let theMinute = parseInt(preLyricTime.substring(0, 2));
        // 秒
        let theSecond = parseInt(preLyricTime.substring(3));
        console.log(theMinute, theSecond)
        preLyricArrTime.push((theMinute * 60 + theSecond));
        preLyricArrTime = Array.from(new Set(preLyricArrTime));
    }
    console.log(preLyricObj);

    // 翻译歌词 (如果有的话)
    if (transLyricArr.length > 1) {
        console.log('有翻译!!!-----这步走到了翻译-------');
        for (let i = 0; i < transLyricArr.length; i++) {
            let transLyricTime = transLyricArr[i].substring(1, 6);
            let transLyricText = transLyricArr[i].substring(10);
            transLyricObj[transLyricTime] = transLyricText;

        }
        console.log(transLyricObj);
    }

    Object.getOwnPropertyNames(preLyricObj).forEach((key) => {
        console.log(key, preLyricObj[key]);
    });

    // 歌词滚动------------------------------------
    const songsAppearRecycle = useRef();
    // 当前标签变色
    const [lyricStyle, setLyricStyle] = useState(0);
    console.log(lyricStyle);

    console.log('歌词数组------------------------', preLyricArrTime);

    console.log('获取不到吗？？？？？？')
    const [currentLyc, setCurrentLyc] = useState();
    const [lycStyle, setLycStyle] = useState();
    const timeUpdate = (e) => { // 播放位置发生时改变触发
        let currentTime = Math.floor(e.target.currentTime / 1);
        // console.log('这是eeeeee: ', currentTime, songsAppearRecycle.current);
        // 歌词自动滚
        for (let i = 0; i < preLyricArrTime.length; i++) {
            if (preLyricArrTime[i] === currentTime) {
                setLyricStyle(i);
                // console.log(preLyricArrTime[i]);
                songsAppearRecycle.current.style.transform = 'translateY(-' + (3 * i - 10)+ 'rem)';
            }
        }

        // console.log(liArrEl);
        // if (preLyricObj.key === currentTime) {
        //     console.log('ffffffffffffffff')
        // }
        // 获取audio当前播放时间
        // let currentTime = format(audioEl1['currentTime']); // 事件转换

        // for (let i; i < preLyricObj.length; i++) {
        //     if (preLyricObj[i + 1] && currentTime < preLyricObj[i + 1]['transLyricTime'] && currentTime > preLyricObj[i]['transLyricTime']) {
        //         setCurrentLyc(currentLyc);
        //         setLycStyle({ transform: `translateY(-${0.545 * i}rem)` })
        //     }
        // }
    }

    // function format(value){ // 时间转换
    //     if (!value){
    //         return '';
    //     } 
    //     let interval = Math.floor(value)
    //     let minute = (Math.floor(interval / 60)).toString().padStart(2, '0')
    //     let second = (interval % 60).toString().padStart(2, '0')
    //     return `${minute}:${second}`
    // }













    // 点击删除------------------------------------------
    const delTheOne = (index) => {
        console.log(index);
        let action = {
            type: 'DEL_ONE',
            index: index
        }
        console.log(action.index);
        store.dispatch(action);

    }
    console.log('这是更新: ', update);

    //点击改变播放状态----------------------
    // 外状态
    const playStatusOne = useRef();
    const playStatusTwo = useRef();
    const playStatusThree = useRef();
    // 内状态
    const musicStatusOne = useRef();
    const musicStatusTwo = useRef();
    const musicStatusThree = useRef();

    let isSinglesPlaying = false;
    const ChangePlayStatus = () => {
        // 原先播放状态
        let preStatus = store.getState().playStatus;
        // 初始化播放列表(顺序播放时)
        let ChangeSongsList = store.getState().songsList;
        let initSongsList = store.getState().initSongsList;

        // 每次点击后, 改变播放状态
        let newStatus = preStatus;
        // 点击1 3后, 改变播放列表顺序
        let newSongsList = ChangeSongsList;

        function ranSongsList(arr) {
            let newArr = JSON.parse(JSON.stringify(arr));
            newArr.sort((num1, num2) => {
                return Math.random() - 0.5;
            })
            return newArr;
        }

        switch (preStatus) {
            // 改为单曲播放
            case 0: {
                newStatus = 1;
                newSongsList = initSongsList;
                // 外状态
                playStatusOne.current.style.display = 'none';
                playStatusTwo.current.style.display = 'block';
                playStatusThree.current.style.display = 'none';
                // 内状态
                musicStatusOne.current.style.display = 'none';
                musicStatusTwo.current.style.display = 'block';
                musicStatusThree.current.style.display = 'none';

                console.log(playSongAudio.current);
                isSinglesPlaying = true;
                break;
            }
            // 改为随机播放
            case 1: {
                newStatus = 2;
                newSongsList = ranSongsList(ChangeSongsList);
                // 随机播放时, 改变播放下标与当前正在播放歌曲下标一致
                for (let i = 0; i < newSongsList.length; i++) {
                    if (thisPieceIndex === newSongsList[i].id) {
                        thisPieceIndex = i;
                    }
                }
                // 外状态
                playStatusOne.current.style.display = 'none';
                playStatusTwo.current.style.display = 'none';
                playStatusThree.current.style.display = 'block';
                // 内状态
                musicStatusOne.current.style.display = 'none';
                musicStatusTwo.current.style.display = 'none';
                musicStatusThree.current.style.display = 'block';

                isSinglesPlaying = false;
                break;
            }
            // 改为顺序播放
            case 2: {
                newStatus = 0;
                newSongsList = initSongsList;
                // 外状态
                playStatusOne.current.style.display = 'block';
                playStatusTwo.current.style.display = 'none';
                playStatusThree.current.style.display = 'none';
                // 内状态
                musicStatusOne.current.style.display = 'block';
                musicStatusTwo.current.style.display = 'none';
                musicStatusThree.current.style.display = 'none';

                isSinglesPlaying = false;
                break;
            }
            default: break;
        }
        let action = {
            type: 'CHANGE_PALY_STATUS',
            value: {
                playStatus: newStatus,
                songsList: newSongsList,
                currentSongIndex: thisPieceIndex,
                isSinglesPlay: isSinglesPlaying
            }
        }
        store.dispatch(action);
    }

    // 暂停/继续播放---------------------
    const pauseMusic = () => {
        // 获取当前播放musicPause
        let newPause = store.getState().musicPause;
        let nextPause = 100;
        switch (newPause) {
            // 改为播放
            case 0: {
                nextPause = 1;
                break;
            }
            // 改为暂停
            case 1: {
                nextPause = 0;
                break;
            }
            default: break;
        }
        let action = {
            type: 'PAUSE_SONG',
            value: {
                musicPause: nextPause
            }
        }
        store.dispatch(action);

        // 改变播放状态
        // 暂停
        if (update.musicPause === 1) {
            console.log('触发!!!!!!!', update.musicPause);
            playSongAudio.current.pause();
            onePause.current.style.display = "block";
            oneBegin.current.style.display = "none";
            twoPause.current.style.display = "block";
            twoBegin.current.style.display = "none";
            showImg.current.style.animation = "none";
        } else {
            // 播放
            playSongAudio.current.play()
            twoPause.current.style.display = "none";
            twoBegin.current.style.display = "block";
            onePause.current.style.display = "none";
            oneBegin.current.style.display = "block";
            showImg.current.style.animation = "musicPlay 10000ms linear backwards infinite";
        }
    }

    // 上一首, 下一首----------------------------------
    const preMusic = () => {
        console.log('点了');
        console.log(store.getState());
        if (update.currentSongIndex > 0) {
            thisPiece = !update ? '' : update.songsList[update.currentSongIndex + 1];
            thisPieceIndex--;
        } else {
            thisPiece = !update ? '' : update.songsList[0];
            console.log(thisPiece);
            thisPieceIndex = update.songsList.length - 1;
        }
        // id
        thisPieceId = thisPiece.id;
        const action = {
            type: 'PRE_SONG',
            value: {
                currentSongId: thisPieceId,
                currentSongIndex: thisPieceIndex,
            }
        };
        store.dispatch(action);
    }

    const nextMusic = () => {
        console.log('下一首了!!');
        if (update.currentSongIndex < update.songsList.length - 1) {
            thisPiece = !update ? '' : update.songsList[update.currentSongIndex + 1];
            thisPieceIndex++;
        } else {
            thisPiece = !update ? '' : update.songsList[0];
            console.log(thisPiece);

            thisPieceIndex = 0;
        }
        // id
        thisPieceId = thisPiece.id;
        const action = {
            type: 'NEXT_SONG',
            value: {
                currentSongId: thisPieceId,
                currentSongIndex: thisPieceIndex,
            }
        };
        store.dispatch(action);
    }

    // 自动播放下一首
    const autoNextMusic = () => {
        console.log('自动播放下一首!!');
        if (update.currentSongIndex < update.songsList.length - 1) {
            thisPiece = !update ? '' : update.songsList[update.currentSongIndex + 1];
            thisPieceIndex++;
        } else {
            thisPiece = !update ? '' : update.songsList[0];
            console.log(thisPiece);
            thisPieceIndex = 0;
        }
        // id
        thisPieceId = thisPiece.id;
        const action = {
            type: 'NEXT_SONG',
            value: {
                currentSongId: thisPieceId,
                currentSongIndex: thisPieceIndex,
            }
        };
        store.dispatch(action);
    }

    // 播放倍数----------------------------
    // .5
    const speed50 = () => {
        console.log('757575757575757575');
        playSongAudio.current.playbackRate = 0.5;
    }
    // 1.0
    const speed100 = () => {
        console.log('757575757575757575');
        playSongAudio.current.playbackRate = 1;
    }
    // 1.5
    const speed150 = () => {
        console.log('757575757575757575');
        playSongAudio.current.playbackRate = 1.5;
    }
    // 2.00
    const speed200 = () => {
        console.log('757575757575757575');
        playSongAudio.current.playbackRate = 2;
    }
    // 3.00
    const speed300 = () => {
        console.log('757575757575757575');
        playSongAudio.current.playbackRate = 3;
    }




























    return (
        <div className='MusicPlay' ref={isOpen}>
            {
                !thisPiece ? <Spin /> : <div className="left" onClick={songsUp}>
                    <img src={`${thisPiece.al.picUrl}`} alt="" ref={showImg} />
                    <div className="left-info">
                        <p>{thisPiece.name}</p>
                        {
                            thisPiece.ar.map((v, i) => <span key={v.id}>{v.name} </span>)
                        }
                    </div>
                </div>
            }

            <div className="right">
                <div className="play-music">
                    <LoadingOutlined onClick={pauseMusic} ref={oneBegin} />
                    <PlayCircleOutlined onClick={pauseMusic} ref={onePause} />
                </div>
                <div className="music-list" >
                    <UnorderedListOutlined onClick={changeUp} />
                    <div className="music-list-over" ref={musicListOver}>
                        <div className="music-list-over-title" >
                            <div className="play-style">
                                <div className="play-style-one" onClick={ChangePlayStatus} ref={playStatusOne}>
                                    <RetweetOutlined />
                                    <span>顺序播放</span>
                                </div>
                                <div className="play-style-two" onClick={ChangePlayStatus} ref={playStatusTwo}>
                                    <FieldBinaryOutlined />
                                    <span>单曲播放</span>
                                </div>
                                <div className="play-style-three" onClick={ChangePlayStatus} ref={playStatusThree}>
                                    <ThunderboltOutlined />
                                    <span>随机播放</span>
                                </div>
                            </div>
                            <div className="list-del">
                                <DeleteOutlined />
                                <ShrinkOutlined onClick={changeDown} />
                            </div>
                        </div>

                        <ul className='songs-list-content'>
                            {
                                !update ? <span>无</span> : store.getState().songsList.map((v, i) => <li key={v.id}>
                                    <div className="li-left">
                                        <span className='li-left-one'>{v.name}</span>
                                        <span className='li-left-two'> - </span>
                                        {
                                            v.ar.map((subV, i) => <span key={subV.id}>{subV.name}</span>)
                                        }
                                    </div>
                                    <div className="li-right">
                                        <HeartOutlined />
                                        <DeleteOutlined onClick={() => delTheOne(i)} />
                                    </div>
                                </li>)
                            }
                        </ul>
                    </div>
                </div>
            </div>

            <div className="songs-appear" ref={songsAppear}>
                <div className="songs-appear-title">
                    <DownOutlined onClick={songsDown} />
                    {
                        !update ? <Spin /> : <div className="songs-appear-title-right">

                            <p>{thisPiece.name}</p>
                            {
                                thisPiece.ar.map((v, i) => <span key={v.id}>{v.name} </span>)
                            }
                        </div>
                    }

                </div>
                <div className="songs-appear-content">
                    <ul className="songs-appear-recycle" style={lycStyle} ref={songsAppearRecycle}>
                        {
                            /* preLyricObj ? Object.getOwnPropertyNames(preLyricObj).forEach((key) => 
                                <li>{preLyricObj[key]}</li>
                            ) : '' */
                            Object.values(preLyricObj).map((v, i) =>
                                <li key={i} style={{color: i === (lyricStyle) ? '#fff' : '#bbb'}}>{v}</li>
                            )
                        }
                    </ul>
                </div>
                <div className="songs-appear-play">
                    <div className="songs-speed">
                        <span>倍数听歌</span>
                        <span onClick={speed50}>x0.5</span>
                        <span onClick={speed100}>x1</span>
                        <span onClick={speed150}>x1.5</span>
                        <span onClick={speed200}>x2.0</span>
                        <span onClick={speed300}>x3.0</span>
                    </div>

                    <div className="songs-appear-begin">
                        <RetweetOutlined ref={musicStatusOne} onClick={ChangePlayStatus} />
                        <FieldBinaryOutlined ref={musicStatusTwo} onClick={ChangePlayStatus} />
                        <ThunderboltOutlined ref={musicStatusThree} onClick={ChangePlayStatus} />
                        <CaretLeftOutlined onClick={preMusic} />
                        <LoadingOutlined onClick={pauseMusic} ref={twoBegin} />
                        <PlayCircleOutlined onClick={pauseMusic} ref={twoPause} />
                        <CaretRightOutlined onClick={nextMusic} />
                        <MenuUnfoldOutlined onClick={changeUp}/>
                    </div>
                </div>
                {
                    thisISSinglesPlay ? <audio src={"https://music.163.com/song/media/outer/url?id=" + thisPieceId + ".mp3"} loop autoPlay controls id="PlaySong-audio1" ref={playSongAudio} onEnded={autoNextMusic} onTimeUpdate={(e) => timeUpdate(e)} ></audio> :
                        <audio src={"https://music.163.com/song/media/outer/url?id=" + thisPieceId + ".mp3"} autoPlay controls id="PlaySong-audio2" ref={playSongAudio} onEnded={autoNextMusic} onTimeUpdate={(e) => timeUpdate(e)}></audio>
                }

            </div>
        </div>
    )
}


