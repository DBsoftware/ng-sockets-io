import express from 'express';
import { SERVER_PORT } from '../globals/enviroment';
import socketIO, { Server } from 'socket.io'
import http from 'http'
import * as socketes  from '../sockets/sockets';

export default class Servidor{
    private static _instance: Servidor;

    public app: express.Application;
    public port: number; 
    public io: socketIO.Server; 
    private httpServer: http.Server;
    private constructor(){
        this.app = express();
        this.port = SERVER_PORT
        this.httpServer = new http.Server( this.app )
        this.io = new Server(this.httpServer)
        this.escucharsockets()
    }

    public static get instance(){
        return this._instance || (this._instance = new this())
    }

    private escucharsockets(){
        console.log('------ escuchar eventos -----')
        this.io.on('connection', cliente => {
            console.log('Nuevo cliente conectado ')
            socketes.desconectar(cliente)
            socketes.escucharMensajes(cliente, this.io)
        })
    }

    start( callback :  (() => void)){
        this.httpServer.listen(this.port,callback);
    }
}