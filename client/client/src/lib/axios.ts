
import axios from "axios";

// Em um projeto real, a baseURL viria de uma variável de ambiente
const API_URL = "http://localhost:8044";

export const api = axios.create({
  baseURL: API_URL,
});
