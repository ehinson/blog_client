export const initialState = {
  posts: [],
  post: null,
  notifications: [],
  user: null,
  users: null,
  messages: null,
  auth: {
    authenticated: null,
    token: null,
    current_user: null,
    expires: Date.now(),
  },
};
// add to localstorage
