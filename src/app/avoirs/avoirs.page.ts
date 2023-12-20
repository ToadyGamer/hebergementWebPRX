import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import  { FormGroup }  from "@angular/forms";
import  { FormBuilder }  from "@angular/forms";
import  { Validators }  from "@angular/forms";

import { jsPDF } from "jspdf";
@Component({
  selector: 'app-avoirs',
  templateUrl: './avoirs.page.html',
  styleUrls: ['./avoirs.page.scss'],
})
export class AvoirsPage implements OnInit {
  public ionicForm: FormGroup;

  constructor(private router: Router, public formBuilder: FormBuilder) {
    this.ionicForm = this.formBuilder.group({
      code:['',Validators.compose([])]
    });
  }

  async ngOnInit() 
  {

  }

  allAvoirs ? : any;

  nomC? : string;
  prenomC? : string;

  ionViewWillEnter()
  {
    this.getInfoUser();
    this.getAvoirs();
  }

  submitForm()
  {
    this.getAvoirs();
  }

  getInfoUser()
  {
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
  getAvoirs()
  {
    fetch(`http://127.0.0.1:3000/avoirs?code=${this.ionicForm.value.code}`) //récupération des comptes
    .then((resp) => resp.json())
    .then((data) => {this.allAvoirs = data;
    })
    .catch(function(error) {
      console.log(error);
    });
  }

  presentAlertDelete(id : any) {
    const alert = document.createElement('ion-alert');
    alert.header = 'CONFIRMATION',
    alert.message = "Etes-vous sur de vouloir supprimer l'avoir n°" + id + " des avoirs ?",
    alert.buttons = [{ text: 'Non',},
    {
      text: 'Oui',
      role: 'confirm',
      handler: () => { 
        fetch(`http://127.0.0.1:3000/avoirs/delete?id=${id}`);
        window.location.reload(); 
      }
    }];

    document.body.appendChild(alert);
    alert.present();
  }
  presentAlert() {
    const alert = document.createElement('ion-alert');
    alert.header = 'INFORMATIONS';
    alert.message = "Création d'un Avoir";
    alert.inputs = [
      {
        name: 'prix',
        placeholder: 'Prix : ',
      }
    ];
    alert.buttons = [
      {
      text: 'Créer',
      role: 'confirm',
      handler: (alertData) => {
        fetch(`http://127.0.0.1:3000/avoirs/add?prix=${alertData.prix}`);

        this.getAvoirs();
      }
    },
    {
      text: 'Annuler'
    }];
      document.body.appendChild(alert);
      alert.present();
  }

  createPaper(id : string, prix : string){
    let doc = new jsPDF('l', 'mm', [62, 60]);

    doc.setFontSize(7);
    doc.setFont("times", "bold");
    doc.text("Code : " + id, 3, 24,{maxWidth: 56, align: "center"});
    doc.text("Montant : " + prix, 3, 24,{maxWidth: 56, align: "center"});
    doc.output('pdfobjectnewwindow');
  }
}
