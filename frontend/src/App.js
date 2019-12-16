
import React from 'react';
import './App.css';

import logo from './assets/logo.svg'
import Routes from './routes';


function App() {

  return (
    <div className="container">

      <img src={logo} alt="AirCnc"/>

      {/* CONTEÚDO */}
      <div className="content">
        <Routes />        
      </div>

    </div> 
  );
}

export default App;



  //useState recebe um valor inicial, mas qual a informação que queremos armazenar? neste exemplo é o email e qual é
  //o valor que inicia no input? é vazio por isso userState recebe valor vazio
  //Porque usamos o []? porque o userState retorna um vetor com duas posições, por isso utilizamos o [] para aplicar a 
  //desestruturação ou seja eu quero pegar os dois valores que esta função me retorna, quais são esses valores?
  //ele vai me retornar o email,e uma função chamada setEmail.
  //O email nada mais é do que esse texto em branco, mas ele vai me retornar o valor desse estado de e-mail em tempo real 
  //toda vez que esse valor sofrer alteração essa variavel email ela vai estar atualizada sempre que eu buscar o valor
  //dela vai estar com o ultimo valor possivel.
  //A função setEmail serve para atualizar o valor desse estado


  
  //Coloco o tipo da rota o verbo HTTP, não preciso colocar o caminho inteiro da rota localhost pois esse caminho
  //foi configurado em api.js
  //Passo a informação solicitada na rota no segundo parametro, como a chave é o mesmo nome da info da rota, spo coloco o nome
  //Quando chegar nessa linha da constante, ele vai aguardar a finalização de chamada na api e vai armazenar em response

  
  /* 
    Usando o aero function dentro do HTML:
    onChange = toda vez que houver alteração nesse campo ele recebe um evento e dai o valor desse input
    esta dentro de event.target.value aqui dentro dessa variavel esta o valor que ele preencheu dentro
    do input, então eu chamo a função setEmail que é a função para alterar o valor de e-mail 
    e coloco dentro dela o novo valor

    Para ter esse campo sempre atualizado passamos um value email
            
  */