import { useReducer, useEffect, useContext, useState, useCallback } from 'react';
import axios from 'axios';
import { AuthContext } from 'views/components/App';

const statuses = Object.freeze({
  initial: 0,
  pending: 1,
  success: 2,
  failure: 3,
});

const defaultState = {
  status: statuses.initial,
  error: null,
  response: null,
};

const stateReducer = (state, action) => {
  switch (action.type) {
    case 'initial':
      return {
        ...state,
        status: statuses.initial,
      };
    case 'pending':
      return {
        ...state,
        status: statuses.pending,
      };
    case 'success':
      return {
        ...state,
        status: statuses.success,
        response: action.payload.result,
      };
    case 'failure':
      return {
        ...state,
        status: statuses.failure,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export const useAxios = ({ method, url, withAuth = false, config }) => {
  const [response, dispatch] = useReducer(stateReducer, defaultState);
  const { auth } = useContext(AuthContext);
  const instance = axios.create({
    method,
    baseURL: '/api/',
    url,
    headers: withAuth
      ? {
          Authorization: `Bearer ${auth && auth.token}`,
        }
      : {},
  });
  let token;

  //   instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;

  const request = useCallback(
    async (payload, config) => {
      dispatch({ type: 'pending' });
      try {
        if(token){
          // Cancel the previous request before making a new request
          token.cancel()
        }
        // Create a new CancelToken
        token = axios.CancelToken.source()
        const result = await instance.request({ data: payload, ...config, cancelToken: token.token });
        dispatch({ type: 'success', payload: { result } });
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Request canceled', error.message);
        } 
        dispatch({ type: 'failure', payload: { error } });
      }
    },
    [instance, dispatch],
  );

 
  return { response, request };
};