import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './main';
import reportWebVitals from './reportWebVitals';
import {HashRouter, Route} from 'react-router-dom'
import Login from './login';
import Option from './option';

ReactDOM.render(
  <React.StrictMode>
      <HashRouter>
        <Route exact path="/" component={Login}/>
        <Route path="/main" component={App}/>
        <Route path="/option" component={Option}/>
      </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
