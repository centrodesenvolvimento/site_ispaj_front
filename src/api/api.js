
import axios from "axios";
// test 1

export const baseIP = '127.0.0.1:8000'
export const baseURL = `http://${baseIP}`
const api = axios.create({
    baseURL: baseURL,
})
export default api