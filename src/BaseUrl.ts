import axios from "axios";

export default axios.defaults.baseURL = "https://boisnewsmedia.onrender.com";

export const GetUrl = axios.create({
  baseURL: "https://boisnewsmedia.onrender.com/api/agenceur/",
  method: "GET",
  headers: {
    "Accept-Language": "en",
  },
});
export const PostUrl = axios.create({
  baseURL: "https://boisnewsmedia.onrender.com/api/agenceur/",
  method: "POST",
  headers: {
    "Accept-Language": "en",
  },
});

export const GetUrlEshop = axios.create({
  baseURL: "https://boisnewsmedia.onrender.com/api/user/",
  method: "GET",
  headers: {
    "Accept-Language": "en",
  },
});

export const PostUrlEshop = axios.create({
  baseURL: "https://boisnewsmedia.onrender.com/api/user/",
  method: "POST",
  headers: {
    "Accept-Language": "en",
  },
});
