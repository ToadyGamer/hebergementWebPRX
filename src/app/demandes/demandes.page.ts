import { Component, OnInit } from '@angular/core';

import  { FormGroup }  from "@angular/forms";
import  { FormBuilder }  from "@angular/forms";
import  { Validators }  from "@angular/forms";
@Component({
  selector: 'app-demandes',
  templateUrl: './demandes.page.html',
  styleUrls: ['./demandes.page.scss'],
})
export class DemandesPage implements OnInit {

  public ionicForm: FormGroup;

  constructor(public formBuilder: FormBuilder) {
    this.ionicForm = this.formBuilder.group({
      statut:['',Validators.compose([])],
      categorie:['',Validators.compose([])],
      magasin:['',Validators.compose([])],
      cout:['',Validators.compose([])]
    });
  }

  ngOnInit() {  }

  nomC? : string;
  prenomC? : string;

  allDemandes? : any;
  allMagasins ? : any;
  allCategories ? : any;
  allStatuts ? : any;
  allComptes ? : any;
  
  ionViewWillEnter(){
    this.getInfoUser();
    this.getStatuts();
    this.getCategories();
    this.getMagasins();
    this.getComptes();

    this.getDemandes();
  }

  addValueFilterStatut(data : any){
    const selectMagasin = document.getElementById("selectStatut");

    data.forEach((s : any) => {
      const opt = document.createElement("option");
      opt.value = s.idStatut;
      opt.text = s.libelleStatut;
      opt.style.color = 'black';
  
      selectMagasin?.appendChild(opt);
    });
  }
  addValueFilterCategorie(data : any){
    const selectMagasin = document.getElementById("selectCategorie");

    data.forEach((c : any) => {
      const opt = document.createElement("option");
      opt.value = c.idCategorie;
      opt.text = c.libelleCategorie;
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
    this.getDemandes();
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
  getDemandes()
  {
    fetch(`http://127.0.0.1:3000/demandes?statut=${this.ionicForm.value.statut}&categorie=${this.ionicForm.value.categorie}&magasin=${this.ionicForm.value.magasin}&cout=${this.ionicForm.value.cout}`) //récupération des comptes
    .then((resp) => resp.json())
    .then((data) => {this.allDemandes = data;
    })
    .catch(function(error) {
      console.log(error);
    });
  }
  getStatuts()
  {
    fetch(`http://127.0.0.1:3000/statuts`) //récupération des comptes
    .then((resp) => resp.json())
    .then((data) => {this.allStatuts = data; this.addValueFilterStatut(data);
    })
    .catch(function(error) {
      console.log(error);
    });
  }
  getCategories()
  {
    fetch(`http://127.0.0.1:3000/categories`) //récupération des comptes
    .then((resp) => resp.json())
    .then((data) => {this.allCategories = data; this.addValueFilterCategorie(data);
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
  getComptes()
  {
    fetch(`http://127.0.0.1:3000/comptes`) //récupération des comptes
    .then((resp) => resp.json())
    .then((data) => {this.allComptes = data; console.log(data);
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
    let demande : any;

    while(i < this.allDemandes.length && !trouver){
      if(this.allDemandes[i].idDemande == id){
        trouver = true;

        demande = i;
      }
      else i++;
    }
  
    const alert = document.createElement('ion-alert');
    alert.header = 'CONFIRMATION',
    alert.message = "Etes-vous sur de vouloir supprimer la demande N°" + this.allDemandes[demande].idDemande + " des demandes ?",
    alert.buttons = [{ text: 'Non',},
    {
      text: 'Oui',
      role: 'confirm',
      handler: () => { 
        fetch(`http://127.0.0.1:3000/demandes/delete?id=${id}`);
        window.location.reload(); 
      }
    }];

    document.body.appendChild(alert);
    alert.present();
  }
  goDemandeModifier(id : any) {
    localStorage.setItem("idElement",id);
  }
}
