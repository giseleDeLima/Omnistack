//Importamos o Express:
const express = require('express');

//Upload de arquivos e imagens:
const multer = require('multer');
const uploadConfig = require('./config/upload');

//Controllers:
const SessionController = require('./controllers/SessionController');
const SpotController = require('./controllers/SpotController');
const DashboardController = require('./controllers/DashboardController');
const BookingController = require('./controllers/BookingController');
const ApprovalController = require('./controllers/ApprovalController');
const RejectionController = require('./controllers/RejectionController');

//Estamos pegando o roteador do express o cara responsavel pelas rotas do express
const routes = express.Router();

//Faz o upload dos arquivos e imagens com as configurações já definidas
const upload = multer(uploadConfig);

//Rotas:
routes.post('/sessions', SessionController.store);
routes.get('/spots', SpotController.index);
routes.get('/dashboard', DashboardController.show);
routes.post('/spots/:spot_id/bookings', BookingController.store);

//Criando uma aprovação ou reprovação
routes.post('/bookings/:booking_id/approvals', ApprovalController.store);
routes.post('/bookings/:booking_id/rejections', RejectionController.store);

//Rota que irá receber o upload de arquivos e imagens
routes.post('/spots',upload.single('thumbnail'),SpotController.store);
//single porque será uma unica imagem se fosse várias seria array, e o nome do campo que terá minha imagem 

//Precisamos exportar as rotas desse arquivo para que a nossa aplicação conheça essas rotas
module.exports = routes;
//Estou exportando as rotas aqui de dentro
