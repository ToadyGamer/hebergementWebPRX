import { Component, OnInit } from '@angular/core';

import  { FormGroup }  from "@angular/forms";
import  { FormBuilder }  from "@angular/forms";
import  { Validators }  from "@angular/forms";
@Component({
  selector: 'app-comptes',
  templateUrl: './comptes.page.html',
  styleUrls: ['./comptes.page.scss'],
})
export class ComptesPage implements OnInit {

  public ionicForm: FormGroup;

  constructor(public formBuilder: FormBuilder) {
    this.ionicForm = this.formBuilder.group({
      nomprenom:['',Validators.compose([])],
      magasin:['',Validators.compose([])],
      habilitation:['',Validators.compose([])]
    });
  }

  ngOnInit() {  }

  nomC? : string;
  prenomC? : string;

  allComptes? : any;
  allMagasins ? : any;
  allHabilitations ? : any;
  
  ionViewWillEnter(){
    this.getInfoUser();
    this.getHabilitations();
    this.getMagasins();

    this.getComptes();
  }

  addValueFilterHabilitation(data : any){
    const selectMagasin = document.getElementById("selectHabilitation");

    data.forEach((h : any) => {
      const opt = document.createElement("option");
      opt.value = h.idHabilitation;
      opt.text = h.libelleHabilitation;
      opt.style.color = 'black';
  
      selectMagasin?.appendChild(opt);
    });
  }
  addValueFilterMagasin(data : any){
    const selectMagasin = document.getElementById("selectMagasin");

    data.forEach((m : any) => {
      const opt = document.createElement("option");
      opt.value = m.idMagasin;
      opt.text = m.villeMagasin;
      opt.style.color = 'black';
  
      selectMagasin?.appendChild(opt);
    });
  }

  submitForm(){
    this.getComptes();
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
  getComptes()
  {
    fetch(`http://127.0.0.1:3000/comptes?nomPrenom=${this.ionicForm.value.nomprenom}&magasin=${this.ionicForm.value.magasin}&habilitation=${this.ionicForm.value.habilitation}`) //récupération des comptes
    .then((resp) => resp.json())
    .then((data) => {this.allComptes = data;
    })
    .catch(function(error) {
      console.log(error);
    });
  }
  getHabilitations()
  {
    fetch(`http://127.0.0.1:3000/habilitations`) //récupération des comptes
    .then((resp) => resp.json())
    .then((data) => {this.allHabilitations = data; this.addValueFilterHabilitation(data);
    })
    .catch(function(error) {
      console.log(error);
    });
  }
  getMagasins()
  {
    fetch(`http://127.0.0.1:3000/magasins`) //récupération des comptes
    .then((resp) => resp.json())
    .then((data) => {this.allMagasins = data; this.addValueFilterMagasin(data);
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

    while(i < this.allComptes.length && !trouver){
      if(this.allComptes[i].idCompte == id){
        trouver = true;

        client = i;
      }
      else i++;
    }
  
    const alert = document.createElement('ion-alert');
    alert.header = 'CONFIRMATION',
    alert.message = "Etes-vous sur de vouloir supprimer : " + this.allComptes[client].nomCompte + " - " + this.allComptes[client].prenomCompte + " des comptes ?",
    alert.buttons = [{ text: 'Non',},
    {
      text: 'Oui',
      role: 'confirm',
      handler: () => { 
        fetch(`http://127.0.0.1:3000/comptes/delete?id=${id}`);
        window.location.reload(); 
      }
    }];

    document.body.appendChild(alert);
    alert.present();
  }
  goCompteModifier(id : any) {
    localStorage.setItem("idElement",id);
  }
}
