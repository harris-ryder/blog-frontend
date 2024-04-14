

const API = import.meta.env.VITE_API_URL;

function createUrl(input) {
  return `${API}/${input}`
}

function createReadUrl(input) {
  return `${API}/posts/category/${input}`
}

function postsUrl(input){
  return `${API}/posts/${input}`
}

export const ENDPOINTS = {
  HOME: `${API}/`,
  LOGIN: createUrl('account/login'),
  SIGNUP: createUrl('account/signup'),
  ACCOUNT: createUrl('account'),
  CREATE: createUrl('create'),
  GRAB: createUrl('grab'),
  NAV: createUrl('nav'),
  READ: createReadUrl,
  DELETE_POST: createUrl,
  TOGGLE_POST: createUrl,
  ARTICLE: postsUrl,
  // Add other endpoints here
};


