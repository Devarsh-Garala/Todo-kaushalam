import axios from "axios";
const instance = axios.create({
  baseURL: "https://todo-kaushalam-qgyw.onrender.com/api",
});
export default instance;
