import axios from 'axios';
//O propósito da biblioteca do axios é simplesmente fazer requisições ajax,

//Este caminho do baseURL é o caminho que definimos no insomnia
const api = axios.create({
    baseURL: 'http://localhost:3333',  
});

//Exportando a constante api
export default api;