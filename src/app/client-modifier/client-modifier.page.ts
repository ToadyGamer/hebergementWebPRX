import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import  { FormGroup }  from "@angular/forms";
import  { FormBuilder }  from "@angular/forms";
import  { Validators }  from "@angular/forms";
@Component({
  selector: 'app-client-modifier',
  templateUrl: './client-modifier.page.html',
  styleUrls: ['./client-modifier.page.scss'],
})
export class ClientModifierPage implements OnInit {
  public ionicForm: FormGroup;

  constructor(private router: Router, public formBuilder: FormBuilder) {
    this.ionicForm = this.formBuilder.group({
      nom:['',Validators.compose([Validators.required])],
      prenom:['',Validators.compose([Validators.required])],
      tel:['',Validators.compose([Validators.required])],
      adresse:['',Validators.compose([])],
      codepostal:['',Validators.compose([Validators.required])],
      ville:['',Validators.compose([Validators.required])],
      datedenaissance:['',Validators.compose([])],
      mail:['',Validators.compose([Validators.required])]
    });
  }

  ngOnInit() {  }

  nomC? : string;
  prenomC? : string;

  nomModify? : string;
  prenomModify? : string;
  telModify? : string;
  adresseModify? : string;
  codePostalModify? : string;
  villeModify? : string;
  dateDeNaissanceModify? : string;
  mailModify? : string;

  ionViewWillEnter(){
    this.getInfoUser();

    this.getClient();
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
  getClient = async () => {
    const idClient = localStorage.getItem("idElement");
    await new Promise(res => setTimeout(res, 100))
    if (idClient) {
      fetch(`http://127.0.0.1:3000/clients?id=${idClient}`)
        .then((resp) => {
          if (!resp.ok) {
            throw new Error("La requête a échoué");
          }
          return resp.json();
        })
        .then((data) => {
          if (data.length > 0) {
            const element = data[0];
            this.nomModify = element.nomClient;
            this.prenomModify = element.prenomClient;
            this.telModify = element.telClient;
            this.adresseModify = element.adresseClient;
            this.codePostalModify = element.codePostalClient;
            this.villeModify = element.villeClient;
            this.dateDeNaissanceModify = element.dateDeNaissanceClient;
            this.mailModify = element.mailClient;
          }
        })
        .catch((error) => {
          console.error("Une erreur s'est produite :", error);
        });
    }
  }
  submitForm()
  {
    if(this.ionicForm.value.nom == "" || this.ionicForm.value.prenom == "" || this.ionicForm.value.tel == "" || this.ionicForm.value.codepostal == "" || this.ionicForm.value.ville == "" || this.ionicForm.value.mail == "") this.presentAlert("Veuillez remplir les champs obligatoires.", false)
    else if(this.ionicForm.value.tel.length != 10) this.presentAlert("Numéro de téléphone invalide", false);
    else
    {
      fetch(`http://localhost:3000/clients/modify?id=${localStorage.getItem("idElement")}&nom=${this.ionicForm.value.nom}&prenom=${this.ionicForm.value.prenom}&tel=${this.ionicForm.value.tel}&adresse=${this.ionicForm.value.adresse}&codePostal=${this.ionicForm.value.codepostal}&ville=${this.ionicForm.value.ville}&dateDeNaissance=${this.ionicForm.value.datedenaissance}&mail=${this.ionicForm.value.mail}`);
      this.presentAlert("Client modifié avec succès !", true)
    }
  }

  presentAlert(text : string, choix : boolean) {
    const alert = document.createElement('ion-alert');
    alert.header = 'INFORMATIONS';
    alert.message = text;
    if(choix){
      alert.buttons = [
        {
          text: 'Retour aux clients',
          role: 'confirm',
          handler: () => { 
            this.router.navigate(['clients'], { replaceUrl: true });
          }
        },
        {
          text: 'Continuer',
          role: 'confirm',
          handler: () => { 
            window.location.reload(); 
          }
        }];
    }
    else{
      alert.buttons = [
        {
          text: 'OK'
        }];
    }

    document.body.appendChild(alert);
    alert.present();
  }
}
