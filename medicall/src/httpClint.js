import axios from "axios";

export default axios.create({
  withCredentials: true,
  accessControlAllowCredentials: true,
  headers: {
    "Content-type": "application/json",
    "Authorization": "Bearer " + sessionStorage.getItem("token")
  },
  baseURL: "http://localhost:5000"
});

