const defaultState = {
    songsList: [],
    initSongsList: [],
    currentSongId: 0,
    currentSongIndex: 0,
    playStatus: 0,
    musicPause: 1,
    isOpen: true,
    // 此条demo, 没有任何作用, 只是为了保证点击相同信息会更新
    demo: 0,
    currentLyric: false,
    isSinglesPlay: false
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = defaultState, action) => {
    // console.log(state, action);

    // 添加
    if (action.type === 'CHANG_SONGS_LIST') {
        let newState = JSON.parse(JSON.stringify(state));
        newState.songsList = action.value.songsList;
        newState.initSongsList = action.value.songsList;
        newState.currentSongId = action.value.currentSongId;
        newState.currentSongIndex = action.value.currentSongIndex;
        newState.musicPause = action.value.musicPause;
        newState.isOpen = action.value.isOpen;
        newState.demo += 1;
        return newState;
    }


    // 删除单个
    if (action.type === 'DEL_ONE') {
        let newState = JSON.parse(JSON.stringify(state));
        newState.songsList.splice(action.index, 1);
        console.log(newState);
        return newState;
    }

    // 改变播放状态
    if (action.type === 'CHANGE_PALY_STATUS') {
        let newState = JSON.parse(JSON.stringify(state));
        newState.playStatus = action.value.playStatus;
        newState.songsList = action.value.songsList;
        newState.isSinglesPlay = action.value.isSinglesPlay;
        return newState;
    }

    // 暂停/继续 播放
    if (action.type === 'PAUSE_SONG') {
        let newState = JSON.parse(JSON.stringify(state));
        newState.musicPause = action.value.musicPause;
        return newState;
    }

    // 上一首
    if (action.type === 'PRE_SONG') {
        let newState = JSON.parse(JSON.stringify(state));
        newState.currentSongId = action.value.currentSongId;
        newState.currentSongIndex = action.value.currentSongIndex;
        // 更换歌曲, 直接播放
        newState.musicPause = 1;
        return newState;
    }

    // 下一首
    if (action.type === 'NEXT_SONG') {
        let newState = JSON.parse(JSON.stringify(state));
        newState.currentSongId = action.value.currentSongId;
        newState.currentSongIndex = action.value.currentSongIndex;
        // 更换歌曲, 直接播放
        newState.musicPause = 1;
        return newState;
    }

    // 当前歌词
    if (action.type === 'NEW_LYRIC') {
        let newState = JSON.parse(JSON.stringify(state));
        newState.currentLyric = action.value.currentLyric;
        return newState;
    }

    return state;
}