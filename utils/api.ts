import axios from 'axios';
export const ipaddress = 'http://192.168.1.103:8000'

const api = axios.create({
  baseURL:`${ipaddress}/api/`,
  //timeout: 10000, // Tempo limite da requisição em milissegundos (opcional)
});

export default api;
