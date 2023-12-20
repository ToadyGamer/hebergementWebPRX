import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import  { FormGroup }  from "@angular/forms";
import  { FormBuilder }  from "@angular/forms";
import  { Validators }  from "@angular/forms";

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.page.html',
  styleUrls: ['./stocks.page.scss'],
})
export class StocksPage implements OnInit {
  public ionicForm: FormGroup;

  constructor(private router: Router, public formBuilder: FormBuilder) {
    this.ionicForm = this.formBuilder.group({
      libelle_refinterne_ean:['',Validators.compose([])],
      rachat:['',Validators.compose([])],
      categorie:['',Validators.compose([])],
      souscategorie:['',Validators.compose([])],
      magasin:['',Validators.compose([])]
    });
  }

  async ngOnInit() 
  {
    this.getMagasins(true);
    this.getCategories();
    this.getSousCategories();
  }

  allStocks? : any;
  allCategories? : any;
  allSousCategories? : any;
  allMagasins ? : any;
  allQuantites ? : any;
  idMagasin ? : any;
  nomC? : string;
  prenomC? : string;

  ionViewWillEnter()
  {
    this.getInfoUser();
    this.getStocks();
    this.getQuantites();
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
  addValueFilterSousCategorie(data : any){
    const selectMagasin = document.getElementById("selectSousCategorie");

    data.forEach((sc : any) => {
      const opt = document.createElement("option");
      opt.value = sc.idSousCategorie;
      opt.text = sc.libelleSousCategorie;
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

  submitForm()
  {
    this.getStocks();
    this.getMagasins(false);

    this.idMagasin = this.ionicForm.value.magasin;
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
  getStocks()
  {
    fetch(`http://127.0.0.1:3000/stocks?libelle_refinterne_ean=${this.ionicForm.value.libelle_refinterne_ean}&rachat=${this.ionicForm.value.rachat}&categorie=${this.ionicForm.value.categorie}&souscategorie=${this.ionicForm.value.souscategorie}&magasin=${this.ionicForm.value.magasin}`) //récupération des comptes
    .then((resp) => resp.json())
    .then((data) => {this.allStocks = data;
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
  getSousCategories()
  {
    fetch(`http://127.0.0.1:3000/souscategories`) //récupération des comptes
    .then((resp) => resp.json())
    .then((data) => {this.allSousCategories = data; this.addValueFilterSousCategorie(data);
    })
    .catch(function(error) {
      console.log(error);
    });
  }
  getMagasins(add : boolean)
  {
    this.allMagasins = null;
    let request = ``;
    if(this.ionicForm.value.magasin == "") request = `http://127.0.0.1:3000/magasins`;
    else  request = `http://127.0.0.1:3000/magasins?id=${this.ionicForm.value.magasin}`;
    fetch(request) //récupération des comptes
    .then((resp) => resp.json())
    .then((data) => {this.allMagasins = data;
      if(add) this.addValueFilterMagasin(data);
    })
    .catch(function(error) {
      console.log(error);
    });
  }
  getQuantites(){
    fetch(`http://127.0.0.1:3000/quantites`) //récupération des comptes
    .then((resp) => resp.json())
    .then((data) => {this.allQuantites = data;
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
    let stock : any;

    while(i < this.allStocks.length && !trouver){
      if(this.allStocks[i].idStock == id){
        trouver = true;

        stock = i;
      }
      else i++;
    }

    const alert = document.createElement('ion-alert');
    alert.header = 'CONFIRMATION',
    alert.message = "Etes-vous sur de vouloir supprimer : " + this.allStocks[stock].libelleStock + " des stocks ?",
    alert.buttons = [{ text: 'Non',},
    {
      text: 'Oui',
      role: 'confirm',
      handler: () => { 
        fetch(`http://127.0.0.1:3000/stocks/delete?id=${id}`);
        fetch(`http://127.0.0.1:3000/quantites/delete?id=${id}`);
        window.location.reload(); 
      }
    }];

    document.body.appendChild(alert);
    alert.present();
  }
  goStockModifier(id : any) {
    localStorage.setItem("idElement",id);
  }
}
