import React, {useContext, createContext, useState} from "react";
import { BrowserRouter as Router, Switch, Route, Link, useHistory, Redirect, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PostsPage from "./pages/PostsPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import PostPage from "./pages/PostPage";


import "./App.css";

const App = () => {
  return (
    <div className="app">
      <Router>
        <ul className="top-nav">
          <li className="top-nav-item">
            <Link to="/home">Home</Link>
          </li>
          <li className="top-nav-item">
            <Link to="/posts">Posts</Link>
          </li>
          <li className="top-nav-item">
            <Link to="/profile">Profile</Link>
          </li>
          <li className="top-nav-item">
            <Link to="/login">Login</Link>
          </li>
        </ul>
        <Switch>
          <Route path="/home">
            <HomePage />
          </Route>
          <Route path="/posts">
            <PostsPage />
          </Route>
          <Route path="/post/:id">
            <PostPage />
          </Route>
          <Route path="/profile">
            <ProfilePage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
