import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {AngularFirestore, DocumentData} from '@angular/fire/compat/firestore'
import { Auth,getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { Router, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { Usuario } from '../clases/usuario';
import { QuerySnapshot } from '@angular/fire/firestore';
import { user } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore : AngularFirestore, private auth:AngularFireAuth, private router : Router ) { }

  public subirLog( email: string, date:string){
    this.firestore.collection('logs').add({
      nombre: email,
      date: date,
    });
  }


  /*public register(email : string, password: string, nombre : string){

    var date = new Date();

    this.auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log("registrado exitosamente");

        this.firestore.collection('Usuarios').add({
          email:email,
          nombre:nombre,
        });
        console.log("usuario registrado y logueado correctamente");

        localStorage.setItem("email",email);
        localStorage.setItem("nombre",nombre);

        this.router.navigate(['home']);

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });
  }*/

  public register(email : string, password: string, nombre : string){
    return this.auth.createUserWithEmailAndPassword(email, password)
  }


  public getUsers(){
    let usuarios : Observable<any[]>;
    usuarios = this.firestore.collection('Usuarios').valueChanges();
    
    return usuarios;
  }

 /* public login(email : string, password: string){
    this.auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const date : Date = new Date();
        console.log("Usuario logueado, sus datos:");
        this.firestore.collection('logs').add({
          //user:userCredential,
          email: email,
          date:date.toLocaleString()
        });
       // this.subirLog(userCredential.user,date.toLocaleString());
        /*console.log(userCredential);
        const user = userCredential.user;*/
     /* })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }*/


  public login(email : string, password: string){
    this.auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const date : Date = new Date();
        this.subirLog(email,date.toLocaleString());
        this.router.navigate(['home']);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  
  public getDataFromUser(){
    this.auth.onAuthStateChanged((user) => {
    if (user) {

    } else {

    }
    });
    
  }

  public logout(){
      this.auth.signOut();
    }

}
