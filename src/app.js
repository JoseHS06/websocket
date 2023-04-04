import { ticketController } from '../controllers/ticketController.js';
import { auth } from './auth.js';
import { Server } from 'socket.io';
import path from 'path';
import express from 'express';
import http from 'http';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*'
    }
});


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public') + '/index.html');
});

const ticketConnection = (socket) => {

    const { id, user } = socket;
    console.log('Nuevo usuario conectado: ' + id);

    ticketController(io.of('/tickets'), socket);

    socket.on('disconnect', (reason) => {
        console.log('Usuario desconectado del socket' + reason);
    });
}



const ticketSocket = io.of("/tickets");
ticketSocket.use((socket, next) => auth(socket, next));
ticketSocket.on('connection', ticketConnection);


export default server;

