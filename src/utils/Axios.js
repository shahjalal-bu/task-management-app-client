import axios from "axios";

const Axios = axios.create({
  baseURL: "https://task-management-application-server.vercel.app",
});

export default Axios;
