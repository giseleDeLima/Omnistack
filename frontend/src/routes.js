import React from 'react';

//São componentes do react
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import New from './pages/New';

//Exporta um componente

export default function Routes(){
    return (   
         
        //Este precisa ficar para fora de todos
        <BrowserRouter>
            <Switch>                
                <Route path="/" exact component={Login} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/new" component={New} />
            </Switch>
        </ BrowserRouter>
    );
}

            /*
            Por padrão o Route do react deixa mais de uma rota ser chamada ao mesmo tempo, este Switch
            Vai garantir que apenas uma rota seja executada por vez  
            */