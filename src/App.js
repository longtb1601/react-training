import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link, Redirect, useLocation } from "react-router-dom";
import axios from "axios";
import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import LoginFormPage from "./pages/LoginFormPage/LoginFormPage";
import PostPage from "./pages/PostPage/PostPage";
import PostsPage from "./pages/PostsPage/PostsPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import { Container, Nav, Navbar } from "react-bootstrap";
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
    <Container>
      <Router>
        <Navbar bg="dark" variant="dark" className="mb-5">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/posts">Posts</Nav.Link>
            <Nav.Link href="/profile">Profile</Nav.Link>
            {currentUser.userId === null && (
              <Nav.Link href="/login">Login</Nav.Link>
            )}
            {currentUser.userId === null && (
              <Nav.Link href="/register">Register</Nav.Link>
            )}
            {currentUser.userId !== null && (
              <Nav.Link href="/logout" onClick={() => {
                logout();
                axios.defaults.headers.common['Authorization'] = '';
              }}>Logout</Nav.Link>
            )}
          </Nav>
        </Navbar>
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
          <Route path="/register" exact>
            <RegisterPage />
          </Route>
        </Switch>
      </Router>

    </Container>
  );
}

export default App;
