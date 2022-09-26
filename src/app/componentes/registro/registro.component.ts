import { Component, OnInit } from '@angular/core';
import { ReCaptchaEnterpriseProvider } from '@angular/fire/app-check';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/clases/usuario';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario = new Usuario();
  date = new Date();
  arrayUsuarios : Usuario[];
  mensaje : string;

  constructor(public service:UserService,private firestore : AngularFirestore, private router : Router) { 
    this.arrayUsuarios = new Array();
    this.cargarUsuarios(this.arrayUsuarios);
    this.mensaje = '';
  }

  ngOnInit(): void {
  }

  cargarUsuarios(usuarios : Array<any>){
    this.service.getUsers().forEach(element => {
      element.forEach(usuario => {
        var user : Usuario = new Usuario();
        user.email = usuario.email;
        user.nombre = usuario.nombre;
        usuarios.push(user);
      });
    });
}

  register(){

    var date = new Date();
    this.service.register(this.usuario.email,this.usuario.clave,this.usuario.nombre).then((userCredential) => {
      console.log("registrado exitosamente");

      this.firestore.collection('Usuarios').add({
        email:this.usuario.email,
        nombre:this.usuario.nombre,
      });
      console.log("usuario registrado y logueado correctamente");

      localStorage.setItem("email",this.usuario.email);
      localStorage.setItem("nombre",this.usuario.nombre);

      this.router.navigate(['home']);

    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      if(this.existeUsuario(this.arrayUsuarios)){
        this.mostrarMensaje();
      }
  });
  }

  existeUsuario(usuarios : Usuario[]){
    var existe : boolean = false;
    usuarios.forEach(element => {
      if(element.email == this.usuario.email){
        existe = true;
      }
    });
    return existe;
  }

  mostrarMensaje(){
      this.mensaje = "El usuario que ingreso ya existe, por favor vuelva a ingresar otros datos";
  }

}
