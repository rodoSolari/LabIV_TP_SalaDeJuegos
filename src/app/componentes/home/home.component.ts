import { Component, Input, OnInit } from '@angular/core';
import { getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  usuarioIniciado : boolean = false;

  constructor(public service : UserService) { 
    
  }

  ngOnInit(): void {

  }

  public usuarioLogueado(){
    if(localStorage.getItem("nombre")!=null){
      this.usuarioIniciado = true;
    }else{
      this.usuarioIniciado = false;
    }
    return this.usuarioIniciado;
  }

  nombreUsuario(){
    return "Hola " + localStorage.getItem("nombre");
  }

  logout(){
    this.service.logout();
    localStorage.clear();
    this.usuarioIniciado = false;
  }
}
