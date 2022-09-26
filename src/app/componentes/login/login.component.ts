import { getLocaleDateTimeFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { user } from '@angular/fire/auth';
import { Usuario } from 'src/app/clases/usuario';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario = new Usuario();
  date = new Date();
  arrayUsuarios : Usuario[];


  constructor(public service : UserService) { 
    this.arrayUsuarios = new Array();
    this.cargarUsuarios(this.arrayUsuarios);
  }

  ngOnInit(): void {

  }

  //cargar usuarios en array
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
  
  login(){

    this.service.login(this.usuario.email,this.usuario.clave);
    this.arrayUsuarios.forEach(element => {
      if(element.email == this.usuario.email){
        localStorage.setItem("nombre",element.nombre);
      }
    });
  }

  llenarDatosUsuario(){
    this.usuario.email = "prueba@hotmail.com"
    this.usuario.clave = "123456";
  }
}
