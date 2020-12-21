import React, { useState, Fragment } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import axios from 'axios';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import About from './components/pages/About';
import User from './components/users/User';

import GithubState from './context/github/GithubState';

function App() {

  const [ users, setUsers ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const [ alert, setAlert ] = useState(null);
  const [ user, setUser ] = useState({});
  const [ repos, setRepos ] = useState([]);

  const searchUsers = async text => {

    setLoading(true);

    const res = await axios.get( `https://api.github.com/search/users?q=${text}&clinet_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    setUsers(res.data.items);
    setLoading(false);

  };

  const getUser = async username => {
    setLoading(true);

    const res = await axios.get( `https://api.github.com/users/${username}?clinet_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    setUser(res.data);
    setLoading(false);
  }

  const getUserRepos = async username => {

    const res = await axios.get( `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&clinet_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    setRepos(res.data);
  };

  const clearUsers = () => {
    setUsers([]);
  }

  const showAlert = (msg, type) => {
    setAlert({ msg, type });

    setTimeout(() => setAlert(null), 3000);
  }

  return (
    <GithubState>
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Alert alert={alert} />
            <Switch>
              <Route exact path='/' render={props => (
                <Fragment>
                  <Search searchUsers={searchUsers} clearUsers={clearUsers} showClear={ users.length>0 ? true : false } setAlert = {showAlert} />
                  <Users loading={loading} users={users} />
                </Fragment>
              )} />
              <Route exact path='/about' component={About} />
              <Route exact path='/user/:login' render={props => (
                <User {...props} getUser={getUser} user={user} loading={loading} getUserRepos={getUserRepos} repos={repos} />
              )} />
            </Switch>
          </div>
        </div>
      </Router>
    </GithubState> 
  );
}

export default App;
