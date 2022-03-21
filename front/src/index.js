import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Theme from './Theme/Theme';
import Home from './Home/Home'

ReactDOM.render(
  <React.StrictMode>
    <Theme/><Home/>
  </React.StrictMode>,
  document.getElementById('theme')
);
