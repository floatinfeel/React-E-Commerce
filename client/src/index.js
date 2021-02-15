import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './assets/main.css'
//redux
import {Provider} from 'react-redux'
import store from './store/store'
//router
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
//components
import Navbar from './components/navbar/navbar'

ReactDOM.render(
  <Provider store={store}>
   <Router>
    <Navbar />
    <Switch>
      <Route  exact path="/" component={App} />
    </Switch>
   </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
