import { lazy, Suspense, useRef, useEffect, useState } from 'react';
import './App.css';
import { Skeleton } from 'antd';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import store from './redux/store/store';
// import Header from './components/Header';
// import Recommend from './pages/Recommend';
// import Singer from './pages/Singers';
// import Rank from './pages/Rank';
// import Search from './pages/Search';
// import SongsSheet from './pages/SongsSheet';

const Header = lazy(() => import('./components/Header'));
const Recommend = lazy(() => import('./pages/Recommend'));
const Singer = lazy(() => import('./pages/Singers'));
const Rank = lazy(() => import('./pages/Rank'));
const Search = lazy(() => import('./pages/Search'));
const SongsSheet = lazy(() => import('./pages/SongsSheet'));
const SingerDetails = lazy(() => import('./pages/SingerDetails'));
const MusicPlay = lazy(() => import('./components/MusicPlay'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));





function App() {
  // const [update, setUpdate] = useState();
  // useEffect(() => {
  //   store.subscribe(() => {
  //     setUpdate(store.getState().isOpen)
  //   })
  // })


  return (
    <div className="App">
      <Header />
      <Suspense fallback={<Skeleton />}>
        <Routes>
          <Route path={"/"} element={<Navigate to={"/recommend"} />}></Route>
          <Route path={"/recommend"} element={<Recommend />}></Route>
          <Route path={"/singer"} element={<Singer />}></Route>
          <Route path={"/rank"} element={<Rank />}></Route>
          <Route path={"/search"} element={<Search />}></Route>
          {/* <Route path={"/recommend/:id"} element={<Search />}></Route> */}
          <Route path={"/recommend/:id"} element={<SongsSheet />}></Route>
          <Route path={"/singer/:id"} element={<SingerDetails />}></Route>
          <Route path={"/login"} element={<Login />}></Route>
          <Route path={"/register"} element={<Register />}></Route>
        </Routes>
        <MusicPlay />
      </Suspense>

    </div>
  );
}

export default App;
