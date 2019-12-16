import React, { useState, useEffect } from 'react';
import { View, AsyncStorage, KeyboardAvoidingView, Platform, Image, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

import api from '../services/api';

import logo from '../assets/logo.png';

//KeyboardAvoidingView - Quando abre o teclado no celular o teclado fica abaixo do formulario, 
//ou seja ele joga o conteudo da aplicação para cima
//enabled - Recebe um true ou false, no exemplo só queremos que isso tudo rode se for ios
//Platform - Recebe a plataforma utilizada android e ios
//behavior - Quando o teclado abrir, neste caso ele deu um paddin dando um espaçamento em baixo
//Antes:
//<KeyboardAvoidingView enabled={Platform.OS === "ios"} behavior="padding" style={styles.container}>
//Não precisou habilitar pois o android não dá espaçamento

export default function Login({ navigation }){
    const [email, setEmail] = useState('');
    const [techs, setTechs] = useState('');

    //Problema:
    //Quando estamos em um site e damos um f5 o endereço do site é atualizado, mas no dispositivo não temos 
    //endereço, não temos um endereço para cada tela, se atualizarmos nossa aplicação na página list que é 
    //depois dessa, ela recarregará nesta página ou seja na tela inicial

    //Solução: utilizando o useEffect
    //Realizar uma ação assim que o usuário chega na tela, ele recebe dois parametros o primeiro é uma função
    //que é o que a gente quer executar, a segunda é um array de dependecias que é quando queremos executar 
    //essa função, se deixarmos o array de dependencias vazio, ele vai executar esta função apenas uma vez
    //no começo quando nosso componente é montado 
    
    //then - se eu encontrar um usuário vou colocar dentro da variavel user que esta no parametro do then
    //Se o usuário estiver logado ele vai para a tela de listagem
    useEffect(() => {
        AsyncStorage.getItem('user').then(user => {
            if(user) {
                navigation.navigate('List');
            }
        });
    }, []);


    async function handleSubmit(){
        const response = await api.post('/sessions', {
            email
        });

        const { _id } = response.data;
        
        //AsyncStorage - para salvar no banco de dados do dispositivo como ele é async ele demora 
        //um pouco para salvar por isso utilizamos o await

        await AsyncStorage.setItem('user', _id);
        await AsyncStorage.setItem('techs', techs);

        //navigate - função para navegar o usuário e o nome da tela que queremos mandar o usuário
        navigation.navigate('List');
        //List tem que estar cadastrado em routes
    }


    return (
        <KeyboardAvoidingView  behavior="padding" style={styles.container}>
            <Image source={logo} />

            <View style={styles.form}>

                <Text style={styles.label}> SEU E-MAIL *</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Seu E-mail"
                    placeholderTextColor="#999"
                    keyboardType="email-address" //Coloca o @ no teclado pois reconhece que é campo e-mail
                    autoCapitalize="none" //Para não colocar nenhuma letra caixa alta
                    autoCorrect={false} //Para não corrigir o texto digitado
                    value={email}
                    onChangeText={text => setEmail(text)}
                />

                <Text style={styles.label}> TECNOLOGIAS *</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Tecnologias de Interesse"
                    placeholderTextColor="#999"
                    autoCapitalize="words" //Cada letra inicial é maiuscula
                    autoCorrect={false} //Para não corrigir o texto digitado
                    value={techs}
                    onChangeText={text => setTechs(text)}
                />

                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.buttonText}> Encontrar spots </Text>
                </TouchableOpacity>

            </View>
        </KeyboardAvoidingView>
    );
}


    //A Estilização não herda a estilização do pai, exemplo se aplicar cor de texto branco no 
    //Touchable ele não aplica no text que esta dentro dele
    const styles = StyleSheet.create({
        container: {
            flex: 1, //Para ele ocupar todo o tamanho da tela
            justifyContent: 'center', //para alinhar o conteudo da nossa tela verticalmente ao centro
            alignItems: 'center'
        },

        form: {
            alignSelf: 'stretch', //Ocupe a largura inteira possivel
            paddingHorizontal: 30,
            marginTop: 30,
        },

        label: {
            fontWeight: 'bold',
            color: '#444',
            marginBottom: 8
        },

        input:{
           borderWidth: 1, 
           borderColor: '#ddd',
           paddingHorizontal: 20,
           fontSize: 16,
           color: '#444',
           height: 44,
           marginBottom: 20,
           borderRadius: 2
        },

        button: {
            height: 42,
            backgroundColor: '#f05a5b',
            justifyContent: 'center',
            alignItems: 'center', 
            borderRadius: 2,
        },

        buttonText: {
            color: '#FFF',
            fontWeight: 'bold', 
            fontSize: 16,
        },
    });
    
