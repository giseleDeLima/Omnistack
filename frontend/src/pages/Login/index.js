
//useState criação de estados dentro da nossa aplicação
import React, {useState} from 'react';
import api from '../../services/api';


//Criação de um componente react
export default function Login({ history }){

    const [email, setEmail] = useState('');

    async function handleSubmit(event){
        event.preventDefault(); 
        
        const response = await api.post('/sessions', { email });
        
        const {_id} = response.data;    

        //Armazenar o id para fazer a autenticação do usuário 
        //Armazenar o id onde esteja disponivel em toda a minha aplicação vamos armazenar dentro do localStorage
        //localStorage - Banco de dados do nosso navegador
        localStorage.setItem('user', _id);

        history.push('/dashboard');

    }

    return (
        <>
            <p>
            Ofereça <strong>spots</strong> para programadores e encontre <strong>talentos</strong> para sua empresa
            </p> 

            <form onSubmit={handleSubmit}>
            <label htmlFor="email"> E-MAIL * </label>

            <input type="email" id="email" placeholder="Seu E-mail" value={email} 
                onChange={event => setEmail(event.target.value)}/>

            <button type="submit" className="btn">Entrar</button>
            </form>
        </>
    )
}