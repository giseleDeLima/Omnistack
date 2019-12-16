//Importamos o multer
const multer = require('multer');

const path = require('path');


//storage: Como o multer vai armazenar os arquivos que recebemos da nossa aplicação
//O multer tem vários locais e um dele é multer.diskStorage que é no disco nos arquivos fisicos
//Preciso passar duas informações:
//destination que é qual pastas esses arquivos serão salvos:

//path.resolve - para informar qual a pasta serão gravados esses arquivos, vamos gravar 
//em uploads na raiz do projeto seria ../../uploads mas no windons essa barra não é entendida
//com o resolve não precisa informar a barra que ele coloca de acordo com o sistema operacional
//__dirname variavel global que informa o diretório atual


module.exports = {
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        filename: (req, file, cb) => {

            const ext = path.extname(file.originalname);//Pega a extensão do arquivo
            const name = path.basename(file.originalname, ext);//Pega o nome do arquivo retirando a extensão

            cb(null, `${name}-${Date.now()}${ext}`);
        },
    }),
};

//Template string que é incluir variaveis dentro de strings que estão com aspas
//const ext = retorna a extensão do arquivo
//const name = basename retorna o nome de uma imagem sem a sua extensão, então passamos o arquivo para retornar o 
//nome do arquivo ou imagem, e passamos a extensão para ser removida

//module - Objeto com várias configuraçṍes



