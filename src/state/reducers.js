import React from 'react';

export const userReducer = (state, action) => {
  switch (action.type) {
    case 'createUser':
      return {
        ...state,
        ...action.payload,
      };
    case 'updateUser':
      return {
        ...state,
        ...action.payload,
      };
    case 'updateUserPosts':
      return {
        ...state,
        posts: action.payload,
      };
    case 'createUsers':
      return {
        ...state,
        ...action.payload,
      };
    case 'updateUsers':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'login':
      return {
        ...state,
        ...action.payload,
      };
    case 'logout':
      return {
        ...state,
        ...action.payload,
      };
    case 'current_user':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export const postsReducer = (state, action) => {
  switch (action.type) {
    case 'createPost':
      return { ...action.payload };
    case 'updatePost':
      return { ...state, ...action.payload };
    case 'createPosts':
      return [...state, ...action.payload];
    case 'updatePosts':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
