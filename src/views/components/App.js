import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';
import { bool } from 'prop-types';

import Registration from 'views/containers/Registration';
import Login from 'views/containers/Login';
import Home from 'views/containers/Home';
import NotFound from 'views/containers/NotFound';
import PrivateRoute from './PrivateRoute';
import PostForm from './Form/PostForm';
import UserForm from './Form/UserForm';
import Posts from './Posts/Posts';
import Post from './Posts/Post';
import Users from './Users/Users';
import User from './Users/User';
import Navigation from 'views/components/Navigation/Navigation';
import Notification from './Notifications/Notification';

const propTypes = {};

const GlobalStyle = createGlobalStyle`
  ${normalize}

  body, html, #root {
    padding: 0;
    margin: 0;
    font-family: 'Montserrat', sans-serif;
    display: flex;
    height: 100%;
    min-height: 100vh;
    flex-direction: column;
    position: relative;
  }
`;

const App = () => {
  return (
    <div>
      <GlobalStyle />
      <Router>
        <Notification />
        <Navigation />

        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <Route path="/register">
            <Registration />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute path="/users/:id/posts/:post_id/edit" component={PostForm} />
          <PrivateRoute path="/users/:id/posts/add" component={PostForm} />
          <PrivateRoute path="/users/:id/posts/:post_id" component={Post} />
          <PrivateRoute path="/users/:id/posts/" component={Posts} />
          <PrivateRoute path="/users/:id/edit" component={UserForm} />
          <PrivateRoute path="/users/:id/" component={User} />
          <PrivateRoute exact path="/users/" component={Users} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
};

App.propTypes = propTypes;

export default App;
