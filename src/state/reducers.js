import React from 'react';

export const userReducer = (state, action) => {
  switch (action.type) {
    case 'update':
      return {
        ...state,
        value: action.payload,
      };
    default:
      return state;
  }
};
