import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import './App.css';
import Header from './comp/Header/Header';
import Plan from './comp/Plan/Plan';
import Router from './comp/Router/Router';
import Mapa from './comp/Plan/Karta/Map/Map';


const App = () => {
  return (
    <BrowserRouter>
    <head>
    <div> 
      <script src='https://code.jquery.com/jquery-3.3.1.min.js' integrity='sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=' crossorigin='anonymous'></script>
    <script src='https://api-maps.yandex.ru/2.1/?lang=ru_RU' type='text/javascript'></script></div>
    </head>
    <div className='app-wrapper'>
        <Header/>
        <div className='app-wrapper-content'>
            <Routes>
                <Route path="/plan" element={<Plan />}/>
                <Route path="/route" element={<Router />}/>
                <Route path="/archive" element={<Mapa/>}/>
            </Routes>
        </div>
    </div>
</BrowserRouter>
  );
}


export default App;
