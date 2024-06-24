import axios from 'axios';
const api = axios.create({
  baseURL:'http://192.168.1.103:8000/api/',
  //timeout: 10000, // Tempo limite da requisição em milissegundos (opcional)
});

export default api;
