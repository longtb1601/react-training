import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link, Redirect, useLocation } from "react-router-dom";
import axios from "axios";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import LoginFormPage from "./pages/LoginFormPage/LoginFormPage";
import PostPage from "./pages/PostPage";
import PostsPage from "./pages/PostsPage";
import 'bootstrap/dist/css/bootstrap.min.css';


import "./App.css";

const App = () => {

  const initialCurrentUser = {
    userId: null,
    token: null
  }

  const [currentUser, setCurrentUser] = useState(initialCurrentUser);

  const logout = () => setCurrentUser(initialCurrentUser);

  return (
    <div className="app container">
      <Router>
        <ul className="top-nav">
          <li className="top-nav-item">
            <Link to="/">Home</Link>
          </li>
          <li className="top-nav-item">
            <Link to="/posts">Posts</Link>
          </li>
          <li className="top-nav-item">
            <Link to="/profile">Profile</Link>
          </li>
          <li className="top-nav-item">
          {currentUser.userId === null && (
            <Link className="btn btn-primary"
              to='/login'
            >
              Login
            </Link>
          )}
          {currentUser.userId !== null && (
            <button
              className="btn btn-danger"
              onClick={() => {
                logout();
                axios.defaults.headers.common['Authorization'] = '';
              }}
            >
              Logout
            </button>
          )}
          </li>
        </ul>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/posts" exact>
            <PostsPage />
          </Route>
          <Route path="/post/:id" exact>
            <PostPage />
          </Route>
          <Route path="/profile" exact
            render={() => {
              if (currentUser.userId === null) return (
                <LoginFormPage
                  setCurrentUser={setCurrentUser}
                  title="You need to login before using this page"
                />
              )
              else return <ProfilePage currentUser={currentUser} />
            }}
          />
          <Route path="/login" exact>
            <LoginFormPage setCurrentUser={setCurrentUser} />
          </Route>
        </Switch>
      </Router>

    </div>
  );
}

export default App;
