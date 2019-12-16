//Criação de um componente react
//useEffect = carrega uma informação assim que o componente é exibido em tela
//useMemo = para memorizar o valor de uma variavel até que alguma coisa mude, ou seja []
import React, { useEffect, useState, useMemo } from 'react';

//Serve para criar links que quando o usuário clica ele vai para outra rota
import { Link } from 'react-router-dom';

import socketio from 'socket.io-client';

import api from '../../services/api';

import './styles.css';



export default function Dashboard(){
    const [spots, setSpots] = useState([]); //Os spots vem da api em formato de array
    const [requests, setRequests] = useState([]);

    const user_id = localStorage.getItem('user');
    const socket = useMemo(() => socketio('http://localhost:3333', {//Endereço do backend
        query: { user_id },
    }), [user_id]); //neste [] é quando vou querer refazer a conexão com meu usuário, só vamos refazer a conexão
    //caso o user_id tenha mudado

    useEffect(() => {
        //eu vou ouvir o booking_request (que vem do backend configurado no arquivo bookingController)
        //eu vou pegar todos esse dados de booking-request atribuir a variavel data
        socket.on('booking_request', data => {
            //Eu vou copiar todos os dados que eu ja tenho dentro das requests, por exemplo se o usuário
            //ja recebeu duas requisições de reservas e ele recebe mais, é adicionada no final sem sobresecrever
            setRequests([...requests, data]);

        })  
    }, [requests, socket]); //Quando utilizamos um variavel dentro do useEffect ele pede para colocar essa varivel
    //dentro de [] como uma dependencia do nosso useEffect

    useEffect(() => {
        async function loadSpots(){
            const user_id = localStorage.getItem('user');
            const response = await api.get('/dashboard', {
                headers: { user_id }
            });

            setSpots(response.data);
        }
        
        loadSpots();
    }, []);

    async function handleAccept(id){
        await api.post(`/bookings/${id}/approvals`);

        //Pego todas minha requisições filtro elas removendo aquela requisição que eu acabei de aprovar
        //vou verificar se o id da requisição que estou percorrendo aqui foi diferente do id da requisição
        //que eu aprovei
        setRequests(requests.filter(request => request._id !== id));

        //Estou substituindo a informação de requestes que eu tenho aqui no meu estado e estou 
        //colocando apenas as request que não tem o id igual este que acbei de passar em parametro 
    }

    async function handleReject(id){

        await api.post(`/bookings/${id}/rejections`);        
        
        setRequests(requests.filter(request => request._id !== id));
    }
    
    return (
        <>
            <ul className="notifications">
                {requests.map(request => (
                    <li key={request._id}>
                        <p>
                            <strong> {request.user.email} </strong> 
                            está solicitando uma reserva em 
                            <strong> {request.spot.company} </strong> 
                            para a data: 
                            <strong> {request.date} </strong>
                        </p>
                            <button className="accept" 
                                onClick={() => handleAccept(request._id)}>ACEITAR
                            </button>

                            <button className="reject" 
                                onClick={() => handleReject(request._id)}>REJEITAR
                            </button>
                    </li>
                ))}
            </ul>

            <ul className="spot-list">
                {spots.map(spot =>(
                    <li key={spot._id}>
                        <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }} />
                        <strong> {spot.company}  </strong>  
                        <span> {spot.price ? `R$${spot.price}/dia` : 'GRATUITO'} </span>                        
                    </li>
                ))}
            </ul>

            <Link to="/new">
                <button className="btn">
                    Cadastrar novo spot
                </button>
            </Link>
        </>
    );
        
}
//spots.map - vou percorrer minha lista de spots utilizando o map, e para cada um desses spots eu 
//retorno um HTML


//response.data - informação que vai precisar ser manipulada pelo componente vamos armazenar essa listagem
//dos spots dentro de um estado

//useEffect ele é basicamente uma função que recebe dois parametros:
//1 - é uma função, podemos escreve no formato aero function
//2 - array de dependencia, ou seja quando queremos que essa função execute... esse array podem ter várias
//variaveis que quando sofrem alguma alteração a função de dentro será executada 
//neste exemplo não temos nenhuma dependencia quero que a função seja executada apenas uma vez


//Intercpitando as msg vindas do backend arquivo server.js com o sockeio
//As mensagens vindas do back com o nome message atribui a variavel data e imprima no console
// socket.on('message', data => {
//     console.log(data);
// })