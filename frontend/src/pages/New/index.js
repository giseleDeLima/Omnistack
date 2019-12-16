//Criação de um componente react
//useMemo - ele observa o valor de uma outra variavel e toda vez que ela alterar ele gera um novo valor
//para a variavel
import React, { useState, useMemo } from 'react';
import api from '../../services/api';

//Importar um icone de camera
import camera from '../../assets/photo-camera.svg';

import './styles.css';

export default function New({ history }){
    //Precisamos criar um preview a partir dessa imagem
    //Toda vez que essa variavel atualizar eu quero gerar uma preview dela
    const [thumbnail, setThumbnail] = useState(null);

    const [company, setCompany] = useState('');
    const [techs, setTechs] = useState('');
    const [price, setPrice] = useState('');

    //Toda vez que alteramos um estado do react ele executa a nossa função de novo o componente é 
    //totalmente remontado de novo, toda vez que os preços são atualizado as tecnologias atualizadas
    //o componente é gerado do zero 

    //1 parametro uma função
    //2 é um array de quando ele deve executar, quais variaveis quando alteradas faram ele executar
    const preview = useMemo(
        //Se existir alguma coisa na thumbnail 
        //URL variavel global do HTML 
        //createObjectURL - Cria uma url para uma variavel temporaria  que ainda não foi feita upload e 
        //passo thumbnail como parametro     
        () => { return thumbnail ? URL.createObjectURL(thumbnail) : null },
        [thumbnail]
    );

    //Cria um spot, mas aqui não mandamos as informações em formato de json e sim multipart pois existem arquivos
    async function handleSubmit(event){
        event.preventDefault();
        
        //Envia o conteúdo de requisição em formato multipartForm
        const data = new FormData();
        const user_id = localStorage.getItem('user');

        //append - adiciona uma informação dentro desse meu objeto
        data.append('thumbnail', thumbnail);
        data.append('company', company);
        data.append('techs', techs);
        data.append('price', price);

        //Cria o spot
        await api.post('/spots', data, {
            headers: { user_id }
        });

        //Envia para a rota dashboard
        history.push('/dashboard');
    }

    return (
        <form onSubmit={handleSubmit}>
            <label id="thumbnail" 
                style={{ backgroundImage: `url(${preview})` }}
                className={thumbnail ? 'has-thumbnail' : ''}    
            >

                <input type="file" onChange={event => setThumbnail(event.target.files[0])}/>
                <img src={camera} id="icone" alt="Select img" />

            </label>

            <label htmlFor="company"> EMPRESA * </label>
            <input 
                id="company" 
                placeholder="Sua empresa incrível"
                value={company}
                onChange={event => setCompany(event.target.value)}
            />

            <label htmlFor="techs"> TECNOLOGIAS * <span>(separadas por vírgulas)</span></label>
            <input 
                id="techs" 
                placeholder="Quais tecnologias usam?"
                value={techs}
                onChange={event => setTechs(event.target.value)}
            />

            <label htmlFor="techs"> VALOR DA DIÁRIA * <span>(em branco para gratuito)</span></label>
            <input 
                id="price" 
                placeholder="Valor cobrado por dia?"
                value={price}
                onChange={event => setPrice(event.target.value)}
            />

            <button type="submit" className="btn"> Cadastrar </button>

        </form>
    );
}