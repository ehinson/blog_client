import React from 'react';

export const userReducer = (state, action) => {
  switch (action.type) {
    case 'update':
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'update':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
