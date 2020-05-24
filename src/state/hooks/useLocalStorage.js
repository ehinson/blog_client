import { useReducer } from 'react';

export const useLocalStorage = (key, reducer, defaultState) => {
  const [state, dispatch] = useReducer(reducer, defaultState, initialState => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialState;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialState;
    }
  });

  return [state, dispatch];
};
