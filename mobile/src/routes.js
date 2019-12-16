//createSwitchNavigator - não existe voltar a tela 
//createAppContainer - precisamos colocar esse em volta das rotas é uma instrução do react-native
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

//Importa nossa páginas
import Login from './pages/Login';
import List from './pages/List';
import Book from './pages/Book';

const Routes = createAppContainer(
    createSwitchNavigator({
        Login,
        List,
        Book
    })
);

export default Routes;