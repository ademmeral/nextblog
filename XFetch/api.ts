import XFetch from "./xfetch";

export default XFetch.create({
  credentials : 'include',
  baseUrl: 'http://localhost:3001',
  headers : {
    'Content-Type' : 'application/json',
    accept : 'application/json'
  }
});