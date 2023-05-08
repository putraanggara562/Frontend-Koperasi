import { boot } from "quasar/wrappers";
import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:5000/" });
// const api = axios.create({ baseURL: "http://192.168.18.41:5000/" });

export default boot(({ app }) => {
  app.config.globalProperties.$axios = api;

  app.config.globalProperties.$api = api;
});

export { api };
