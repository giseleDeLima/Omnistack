import axios from 'axios';

//Pega o endereço na aba que abrou no navegador.
//Usar a mesma rede para conectar
const api = axios.create({
    baseURL: 'http://192.1.1.238:3333',
});

export default api;