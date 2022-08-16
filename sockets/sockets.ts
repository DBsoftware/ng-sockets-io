import { Usuario } from './../classes/usuario';
import { Socket } from "socket.io";
import socketIO from 'socket.io';
import UsuariosLista from '../classes/usuarios-lista';


export const usuariosConectados =  new UsuariosLista();

export const conectarCLiente = (cliente : Socket) => {
    let usuario =  new Usuario(cliente.id)
    usuariosConectados.agregar(usuario)
}
export const desconectar = (cliente : Socket) => {
    cliente.on('disconnect', () => {
        usuariosConectados.borrarUsuario(cliente.id)
        console.log('cliente desconectado ')
    })
}
export const escucharMensajes = (cliente : Socket, io: socketIO.Server) => {
    cliente.on('mensaje', (payload, callback) => {
        console.log('escuchar mensajes '+ payload.cuerpo)
        io.emit('mensaje-nuevo', payload)
    })
}
export const configurarUsuario = (cliente : Socket, io: socketIO.Server) => {
    cliente.on('configurar-usuario', (payload, callback) => {
        usuariosConectados.actualizarNombre(cliente.id, payload.nombre)
        callback({ok: true, mensaje: "Usuario configurado"})
        // io.emit('mensaje-nuevo', payload)
    })
}
