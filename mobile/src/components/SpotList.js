import React, { useState, useEffect } from 'react';
import { withNavigation } from 'react-navigation';
import {View, StyleSheet, Text, FlatList, Image, TouchableOpacity} from 'react-native';

import api from '../services/api';

function SpotList({ tech, navigation }){
    const [spots, setSpots] = useState([]);

    useEffect(() => {
        async function loadSpots(){
            const response = await api.get('/spots', {
                params: {tech}
            })
             
            console.log(response.data);
            setSpots(response.data);
        }

    //Eu chamo esta função para que ela seja exibida assim que carregar
    loadSpots();
    }, []);

    //Função quando clicar no botão solicitar reserva 
    //Porem o arquivo SpotList não é uma página como a de login, list, book ... este componente não tem acesso 
    //ao navigation por padrão, então vamos importar dentro do react-navigation withNavigation que é para a
    //gente adicionar esta propriedade em qualquer componente que não seja uma página, tiramos o export default
    //do começo do componente e colocamos lá em baixo junto com o nome deste componente e colocamos o 
    //withNavigation em volta e agora temos acesso ao navigation
    function handleNavigate(id){
        navigation.navigate('Book', {id});
    }

    return (
       <View style={styles.container}>
           <Text style={styles.title}>Empresas que usam 
                <Text style={styles.bold}> {tech} </Text>
            </Text>

            
            <FlatList //Componente para listas
                style={styles.list}
                data={spots} //Array onde terão nossas informações 
                keyExtractor={spot => spot._id} //é uma função que recebe uma função onde cada item que demos o nome de spot devolve uma informação que seja unica como o id
                horizontal //nossa lista será horizontal e não um abaixo do outro
                showsHorizontalScrollIndicator={false} //colocamos false para não colocar a barra de rolagem
                
                //como ele deve se comportar para mostrar cada item dessa lista, será uma função que recebe
                //varias informações, vamos desestruturar com {} colocando um objt la dentro e pegar o item
                //este item aqui é o item do spot do keyExtractor, neste caso queremos apenas o item
                //e agora para retornar um conteudo abrimos () e colocamos como cada um dos meus itens devem
                //renderizar
                renderItem={( {item} ) => (
                    <View style={styles.listItem}>
                        <Image style={styles.thumbnail} source={{ uri: item.thumbnail_url }} />
                        <Text style={styles.company}>{item.company}</Text>
                        <Text style={styles.price}>{item.price ? `R$ ${item.price}/dia` : 'GRATUITO'}</Text>

                        <TouchableOpacity onPress={() => handleNavigate(item._id)} style={styles.button}>
                            <Text style={styles.buttonText}>
                                Solicitar reserva
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
       </View>
    );    
}

//onPress= precisa ser uma função pois se fizermos:
//onPress={handleNavigate(item._id)} ele já executa quando o componente abrir.


const styles = StyleSheet.create({
    container:{
        marginTop: 30,
    },

    title: {
        fontSize: 20,
        color: '#444',
        paddingHorizontal: 20,
        marginBottom: 15,
    },
    
    bold:{
       fontWeight: 'bold', 
    },

    list:{
        paddingHorizontal: 20,
    },

    listItem:{
       marginRight: 15, 
    },

    thumbnail:{
        width: 200,
        height: 120,
        resizeMode: 'cover', //para cobrir apenas a largura e tamanho especificado
        borderRadius: 2,        
    }, 

    company:{
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10,
    },

    price:{
        fontSize: 15,
        color: '#999',
        marginTop: 5,
    },

    button: {
        height: 32,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center', 
        borderRadius: 2,
        marginTop: 15,
    },

    buttonText: {
        color: '#FFF',
        fontWeight: 'bold', 
        fontSize: 15,
    },
});

export default withNavigation(SpotList);