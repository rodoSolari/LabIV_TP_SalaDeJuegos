import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

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
