import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GitHubReducer from './githubReducer';
import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_REPOS,
  GET_USER,
} from '../types';

const GithubState = (props) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(GitHubReducer, initialState);

  const searchUsers = async (text) => {
    setLoading();

    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}`
    );

    dispatch({
      type: SEARCH_USERS,
      payload: res.data.items,
    });
  };

  const clearUsers = () => dispatch({ type: CLEAR_USERS });

  const setLoading = () => dispatch({ type: SET_LOADING });

  const getUser = async (username) => {
    setLoading();

    const res = await axios.get(`https://api.github.com/users/${username}`);

    dispatch({
      type: GET_USER,
      payload: res.data,
    });
  };

  const getRepos = async (username) => {
    setLoading();

    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`
    );

    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
  };

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getRepos,
      }}>
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
