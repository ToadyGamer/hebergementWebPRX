import { Component, OnInit } from '@angular/core';

import  { FormGroup }  from "@angular/forms";
import  { FormBuilder }  from "@angular/forms";
import  { Validators }  from "@angular/forms";
@Component({
  selector: 'app-clients',
  templateUrl: './clients.page.html',
  styleUrls: ['./clients.page.scss'],
})
export class ClientsPage implements OnInit {

  public ionicForm: FormGroup;

  constructor(public formBuilder: FormBuilder) {
    this.ionicForm = this.formBuilder.group({
      nomprenom:['',Validators.compose([])],
      tel:['',Validators.compose([])],
      codepostal:['',Validators.compose([])]
    });
  }

  ngOnInit() {  }

  nomC? : string;
  prenomC? : string;

  allClients? : any;
  
  ionViewWillEnter(){
    this.getInfoUser();

    this.getClients();
  }

  submitForm(){
    this.getClients();
  }
  
  getInfoUser() {
    const idCompte = localStorage.getItem("idCompte");
    if (idCompte) {
      fetch(`http://127.0.0.1:3000/comptes?id=${idCompte}`)
        .then((resp) => {
          if (!resp.ok) {
            throw new Error("La requête a échoué");
          }
          return resp.json();
        })
        .then((data) => {
          if (data.length > 0) {
            const element = data[0]; // Si vous vous attendez à un seul élément, vous pouvez utiliser le premier élément du tableau.
            this.nomC = element.nomCompte;
            this.prenomC = element.prenomCompte;
          }
        })
        .catch((error) => {
          console.error("Une erreur s'est produite :", error);
        });
    }
  }
  getClients()
  {
    fetch(`http://127.0.0.1:3000/clients?nomPrenom=${this.ionicForm.value.nomprenom}&tel=${this.ionicForm.value.tel}&codePostal=${this.ionicForm.value.codepostal}`) //récupération des comptes
    .then((resp) => resp.json())
    .then((data) => {this.allClients = data;
    })
    .catch(function(error) {
      console.log(error);
    });
  }

  presentAlertDelete(id : any) {
    let trouver : boolean;
    trouver = false;
    let i : any;
    i = 0;
    let client : any;

    while(i < this.allClients.length && !trouver){
      if(this.allClients[i].idClient == id){
        trouver = true;

        client = i;
      }
      else i++;
    }
  
    const alert = document.createElement('ion-alert');
    alert.header = 'CONFIRMATION',
    alert.message = "Etes-vous sur de vouloir supprimer : " + this.allClients[client].nomClient + " - " + this.allClients[client].prenomClient + " des clients ?",
    alert.buttons = [{ text: 'Non',},
    {
      text: 'Oui',
      role: 'confirm',
      handler: () => { 
        fetch(`http://127.0.0.1:3000/clients/delete?id=${id}`);
        window.location.reload(); 
      }
    }];

    document.body.appendChild(alert);
    alert.present();
  }
  goClientModifier(id : any) {
    localStorage.setItem("idElement",id);
  }
}
