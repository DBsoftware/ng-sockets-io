import { SERVER_PORT } from './globals/enviroment';
import Servidor from "./classes/server";
import router from './routes/routes';
import bodyParser from "body-parser";
import cors from "cors";

const server = Servidor.instance

server.app.use(bodyParser.urlencoded({extended: true}));
server.app.use(bodyParser.json());

server.app.use( cors({origin: true, credentials:true}) )

server.app.use('/',router)

server.start(() => console.log(`listening on port ${ SERVER_PORT}`))

