import axios from 'axios'
import { authHeader } from "./_helpers/auth-header";

axios.defaults.baseURL = 'http://localhost:3000/';
axios.defaults.headers = authHeader();


export default axios;