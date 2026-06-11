import axios from "axios";

const API = axios.create({
  baseURL: "https://physioconnect-main.onrender.com/api",
});

export default API;
