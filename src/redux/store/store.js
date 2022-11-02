// store.js
import { createStore } from 'redux';
import songsReducer from '../reducers/songsReducer';
const store = createStore(songsReducer)

// 创建store并导出
export default store;

