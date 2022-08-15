import { Socket } from "socket.io";
import socketIO from 'socket.io';

export const desconectar = (cliente : Socket) => {
    cliente.on('disconnect', () => {
        console.log('cliente desconectado ')
    })
}
export const escucharMensajes = (cliente : Socket, io: socketIO.Server) => {
    cliente.on('mensaje', (payload, callback) => {
        console.log('escuchar mensajes '+ payload.cuerpo)
        io.emit('mensaje-nuevo', payload)
    })
}
