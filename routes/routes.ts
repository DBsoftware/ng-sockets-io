
import { Router, Request, Response } from "express";

 const router = Router()

router.get('/mensajes', (req: Request , res: Response) => {
     res.json({
        ok: true,
        mensaje: "it'saul goodman"
     });
});
router.post('/mensajes/:id', (req: Request , res: Response) => {
    const payload = req.body.payload
    const de = req.body.de
     res.json({
        ok: true,
        payload,
        de
     });
});

export default router;