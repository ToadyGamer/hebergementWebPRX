import { Component } from '@angular/core';

import { Router } from '@angular/router';
import  { FormGroup }  from "@angular/forms";
import  { FormBuilder }  from "@angular/forms";
import  { Validators }  from "@angular/forms";
// import CryptoJS from 'crypto-js';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public ionicForm: FormGroup;

  constructor(private router: Router, public formBuilder: FormBuilder) {
    this.ionicForm = this.formBuilder.group({
      identifiant:['',Validators.compose([Validators.required])],
      password:['',Validators.compose([Validators.required])]
    });
  }

  userFound = false;
  
  ngOnInit() { localStorage.setItem("niveauHabilitationCompte", "-1"); }


  submitForm()
  { 

    this.userFound = false;

    fetch('http://127.0.0.1:3000/comptes') //récupération des comptes
    .then((resp) => resp.json())
    .then((data) => {
       data.forEach((element : any) => { //parcour des comptes
         if(element.identifiantCompte == this.ionicForm.value.identifiant && element.motDePasseCompte == this.ionicForm.value.password){ //comparaison d'un compte avec les données mises
           localStorage.setItem("niveauHabilitationCompte", element.niveauHabilitationCompte);
           localStorage.setItem("idCompte",element.idCompte);
           this.router.navigate(['tableau-de-bord'], { replaceUrl: true });
           this.userFound = true;
         }
      });

      if(!this.userFound) this.presentAlert();

    })
    .catch(function(error) {
      console.log(error);
    });
  }

  presentAlert() {
    const alert = document.createElement('ion-alert');
    alert.header = 'ERREUR';
    alert.message = "L'identifiant ou le mot de passe est incorrect.";
    alert.buttons = ['OK'];

    document.body.appendChild(alert);
    alert.present();
  }

}
