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
import Register from './pages/register'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
  <Provider store={store}>
   <Router>
    <Navbar />
    <ToastContainer/>
    <Switch>
      <Route  exact path="/" component={App} />
      <Route  exact path="/register" component={Register} />
    </Switch>
   </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
