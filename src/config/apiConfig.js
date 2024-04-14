

const API = import.meta.env.VITE_API_URL;

const BASE_URL = "https://"


function createUrl(input) {
  return `${BASE_URL}${API}/${input}`
}

function createReadUrl(input) {
  return `${BASE_URL}${API}/posts/category/${input}`
}

function postsUrl(input){
  return `${BASE_URL}${API}/posts/${input}`
}

export const ENDPOINTS = {
  HOME: `${BASE_URL}${API}/`,
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


