import { Server } from 'socket.io';

import { Router, Request, Response } from "express";
import Servidor from '../classes/server';
import { usuariosConectados } from '../sockets/sockets';

 const router = Router()

router.get('/mensajes', (req: Request , res: Response) => {
   const {cuerpo, de} = req.body
   const server = Servidor.instance
   server.io.emit('mensaje-nuevo', {de,cuerpo})
     res.json({
        ok: true,
        mensaje: "it'saul goodman"
     });
});
router.post('/mensajes/:id', (req: Request , res: Response) => {
   const {cuerpo, de, id} = req.body
   const payload = {de,cuerpo}
   const server = Servidor.instance
    server.io.in(id).emit('mensaje-privado',payload)
     res.json({
        ok: true,
        payload,
        de
     });
});
// Servicio para obtener todos los id de los usuarios
router.get('/usuarios', (req: Request , res: Response) => {

   const server = Servidor.instance
    server.io.allSockets().then((clientes)=>{
      res.json({
          ok:true,
         // clientes
          clientes: Array.from(clientes)
      });
  }).catch((err)=>{
      res.json({
          ok:false,
          err
      })
  });

});
router.get('/usuarios/detalles', (req: Request , res: Response) => {

      res.json({
          ok:true,
         // clientes
          clientes: usuariosConectados.lista
      });
  

});

export default router;