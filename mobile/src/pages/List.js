import React, { useState, useEffect } from 'react';
import { Alert, SafeAreaView, ScrollView, StyleSheet, AsyncStorage, Image, Text } from 'react-native';
import socketio from 'socket.io-client';

import SpotList from '../components/SpotList'; 
import logo from '../assets/logo.png';

export default function List(){
    const [techs, setTechs] = useState([]);

    useEffect(() => {
        //Quando eu estiver com o user_id
        AsyncStorage.getItem('user').then(user_id => {
            const socket = socketio('http://10.0.0.102:3333', {
                query: { user_id }
            })

            socket.on('booking_response', booking => {
                Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'APROVADA' : 'REJEITADA'}`);
            });
        })
    }, []);


    //Executa uma ação assim que o componente é aberto
    //Vamos buscar as informações de tecnologias, usando o then para buscar essas informações e armazena em
    //storageTechs variavel qualquer, e na linha abaixo transforma essa string em array com base no caractere
    //divisor que é a virgula, e depois com o map retira os espaços antes e depois.
    useEffect(() => {
      AsyncStorage.getItem('techs').then(storageTechs => {
          const techsArray = storageTechs.split(',').map(tech => tech.trim());

          setTechs(techsArray);
      })  
    }, []);


//SafeAreaView -ele vai colocar o conteudo a partir de uma area que não fique por baixo dos elementos
//do dispositivo, exemplo: relógio, sinal de bateria e wifi ....
    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.logo} source={logo} />


        
        <ScrollView>
            {techs.map(tech =>  <SpotList key={tech} tech={tech} />)}
        </ScrollView>
        
        </SafeAreaView>
    );
}

//Vou percorrer no meu array de tecnologia  e para cada uma dessas tecnologias eu chamo meu componente
//SpotList e passo uma propriedade chamada tech passando a essa propriedade cada tecnologia
//key={tech}
//Cada filho dentro de uma iteração em uma estrutura de repetição precisa de uma propriedade key
//Preciso passar um key para identificar cada uma das interações 

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    logo: {
        height: 32,
        resizeMode: 'contain', //Quero que o tamanho dessa imagem fique contido no height 32
        alignSelf: 'center', // Alinhada ao centro
        marginTop: 10

    }
});