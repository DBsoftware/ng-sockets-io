import { Usuario } from "./usuario";
// seudopersistencia de lista de los usuarios

export default class UsuariosLista {
    private _lista: Usuario[] = []
    constructor() {
        
    }
    public agregar(usuario: Usuario){
        this._lista.push( usuario )
        console.log(this._lista)
        return usuario;
    }
    public actualizarNombre(id: string, nombre: string){
       this._lista = this._lista.map(e =>(e.id === id)? ({...e, nombre}): e)
        console.log(this._lista)
    }

    public get lista(){
        return this._lista
    }
    public set lista(lista){
        this._lista = lista
    }
    public getUsuario(id: string){
        return this.lista.find(e => e.id === id)
    }
    public getUsuariosSala(sala : string){
        return this.lista.filter(e => e.sala === sala)
    }
    public borrarUsuario(id : string){
        let tempUsuario = this.getUsuario(id)
        console.log(tempUsuario)
        this.lista = this.lista.filter(e => e.id !== id)
        console.log("borrado", this.lista)
        return tempUsuario
    }


}