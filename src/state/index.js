export const initialState = {
  posts: [],
  notifications: null,
  user: null,
  messages: null,
  auth: {
    user: null, // maybe delete .auth
    token: null, // for API requests
  },
};
