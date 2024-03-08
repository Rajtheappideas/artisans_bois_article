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
  // baseURL: "https://boisnewsmedia.onrender.com/api/artisans_and_bois",
  method: "POST",
  headers: {
    "Accept-Language": "en",
  },
});

