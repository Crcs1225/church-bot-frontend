// api.ts (for internal server-to-server usage ONLY)

import axios from "axios";

const api = axios.create({
  baseURL: "/api", // this now routes through Next.js
});

export default api;
