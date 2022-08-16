import { Server } from 'socket.io';

import { Router, Request, Response } from "express";
import Servidor from '../classes/server';

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

export default router;