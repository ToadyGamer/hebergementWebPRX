import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import  { FormGroup }  from "@angular/forms";
import  { FormBuilder }  from "@angular/forms";
import  { Validators }  from "@angular/forms";
@Component({
  selector: 'app-sav',
  templateUrl: './sav.page.html',
  styleUrls: ['./sav.page.scss'],
})
export class SavPage implements OnInit {

  public ionicForm: FormGroup;

  public ionicFormClient: FormGroup;

  constructor(private router: Router, public formBuilder: FormBuilder) {
    this.ionicForm = this.formBuilder.group({
      magasin:['',Validators.compose([])],
      etat:['',Validators.compose([])],
      client:['',Validators.compose([])],
      reference:['',Validators.compose([])]
    });

    this.ionicFormClient = this.formBuilder.group({
      nom:['',Validators.compose([Validators.required])],
      prenom:['',Validators.compose([])],
      telephone:['',Validators.compose([Validators.required])],
      mail:['',Validators.compose([Validators.required])],
      adresse:['',Validators.compose([])],
      codepostal:['',Validators.compose([Validators.required])],
      ville:['',Validators.compose([Validators.required])],
      datenaissance:['',Validators.compose([])],
    });
  }

  ngOnInit() 
  {

  }

  allSAV? : any;
  allMagasins ? : any;
  allEtats ? : any;
  allClients ? : any;
  allModeles ? : any;
  allStocks ? : any;
  allArticlesVentesPEC ? : any;
  allArticlesVentesV ? : any;
  allArticlesSAV ? : any;

  nomC? : string;
  prenomC? : string;

  reference ? : any;
  data ? : any;
  clientnomprenom ? : any;
  clienttel ? : any;
  magasin ? : any;
  modele ? : any;
  imei ? : any;
  etat ? : any;
  description ? : any;
  code ? : any;
  prix ? : any;

  ionViewWillEnter()
  {
    this.getInfoUser();
    this.getMagasins();
    this.getEtats();
    this.getClients();
    this.getModeles();
    this.getStocks();
    this.getArticlesSAV();
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

  addValueFilterEtat(data : any){
    const selectCategorie = document.getElementById("selectEtat");

    data.forEach((e : any) => {
      const opt = document.createElement("option");
      opt.value = e.idEtat;
      opt.text = e.libelleEtat;
      opt.style.color = 'black';
  
      selectCategorie?.appendChild(opt);
    });
  }

  submitForm()
  {
    this.getSAV();
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
  getClients()
  {
    fetch(`http://127.0.0.1:3000/clients?nomPrenom=`) //récupération des comptes
    .then((resp) => resp.json())
    .then((data) => {this.allClients = data; this.getSAV();
    })
    .catch(function(error) {
      console.log(error);
    });
  }
  getSAV()
  {
    let i = 0;
    let trouver = false;
    while(i < this.allClients.length && !trouver){
      if(this.ionicForm.value.client == this.allClients[i].nomClient + " " + this.allClients[i].prenomClient){
        trouver = true;
      }
      else i++;
    }

    let commande = `http://127.0.0.1:3000/sav?magasin=${this.ionicForm.value.magasin}&client=&etat=${this.ionicForm.value.etat}&reference=${this.ionicForm.value.reference}`;
    if(trouver) commande = `http://127.0.0.1:3000/sav?magasin=${this.ionicForm.value.magasin}&client=${this.allClients[i].idClient}&etat=${this.ionicForm.value.etat}&reference=${this.ionicForm.value.reference}`;

    fetch(commande) //récupération des comptes
    .then((resp) => resp.json())
    .then((data) => {this.allSAV = data;
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
  getEtats()
  {
    fetch(`http://127.0.0.1:3000/etats`) //récupération des comptes
    .then((resp) => resp.json())
    .then((data) => {this.allEtats = data; this.addValueFilterEtat(data);
    })
    .catch(function(error) {
      console.log(error);
    });
  }
  getModeles()
  {
    fetch(`http://127.0.0.1:3000/modeles`) //récupération des comptes
    .then((resp) => resp.json())
    .then((data) => {this.allModeles = data;
    })
    .catch(function(error) {
      console.log(error);
    });
  }
  getStocks()
  {
    fetch(`http://127.0.0.1:3000/stocks?libelle=`) //récupération des comptes
    .then((resp) => resp.json())
    .then((data) => {this.allStocks = data;
    })
    .catch(function(error) {
      console.log(error);
    });
  }
  getVentePEC(reference : any)
  {
    fetch(`http://127.0.0.1:3000/ventespec?reference=${reference}`) //récupération des comptes
    .then((resp) => resp.json())
    .then((data) => {
      this.getArticlesVentesPEC(data[0].idPECVente);

      this.reference = data[0].referencePECVente;
      this.data = data[0].datePECVente;
      this.clientnomprenom = data[0].nomClient + " " + data[0].prenomClient;
      this.clienttel = data[0].telClient;
      this.magasin = this.allMagasins[data[0].magasin - 1].villeMagasin;
      this.modele =  this.allModeles[data[0].modele - 1].libelleModele;
      this.imei = data[0].IMEIPECVente;
      this.etat = this.allEtats[data[0].etat - 1].libelleEtat;
      this.description = data[0].descriptionPECVente;
      this.code = data[0].codePECVente;
      this.prix = data[0].prixTTCPECVente + "€";
    })
    .catch(function(error) {
      console.log(error);
    });
  }
  getVenteV(reference : any)
  {
    fetch(`http://127.0.0.1:3000/ventesv?reference=${reference}`) //récupération des comptes
    .then((resp) => resp.json())
    .then((data) => {
      this.getArticlesVentesV(data[0].idVente);

      this.reference = data[0].referenceVVente;
      this.data = data[0].dateVVente;
      this.clientnomprenom = data[0].nomClient + " " + data[0].prenomClient;
      this.clienttel = data[0].telClient;
      this.magasin = this.allMagasins[data[0].magasin - 1].villeMagasin;
      this.imei = data[0].IMEIVVente;
      this.etat = this.allEtats[data[0].etat - 1].libelleEtat;
      this.description = data[0].descriptionVVente;
      this.prix = data[0].prixTTCVVente + "€";
    })
    .catch(function(error) {
      console.log(error);
    });
  }
  getArticlesVentesPEC(id : any)
  {
    fetch(`http://127.0.0.1:3000/articlespecventes?id=${id}`) //récupération des comptes
    .then((resp) => resp.json())
    .then((data) => {this.allArticlesVentesPEC = data;
    })
    .catch(function(error) {
      console.log(error);
    });
  }
  getArticlesVentesV(id : any)
  {
    fetch(`http://127.0.0.1:3000/articlesvventes?id=${id}`) //récupération des comptes
    .then((resp) => resp.json())
    .then((data) => {this.allArticlesVentesV = data; console.log(data);
    })
    .catch(function(error) {
      console.log(error);
    });
  }
  getArticlesSAV(){
    fetch(`http://127.0.0.1:3000/articlessav`) //récupération des comptes
    .then((resp) => resp.json())
    .then((data) => {this.allArticlesSAV = data;
    })
    .catch(function(error) {
      console.log(error);
    });
  }

  presentAlertDelete(id : any, reference : string) {
    const alert = document.createElement('ion-alert');
    alert.header = 'CONFIRMATION',
    alert.message = "Etes-vous sur de vouloir supprimer la référence " + reference + " des SAV ?",
    alert.buttons = [{ text: 'Non',},
    {
      text: 'Oui',
      role: 'confirm',
      handler: () => { 
        fetch(`http://127.0.0.1:3000/sav/delete?id=${id}`);
        fetch(`http://127.0.0.1:3000/articlessav/delete?idSAV=${id}`);
        window.location.reload(); 
      }
    }];

    document.body.appendChild(alert);
    alert.present();
  }
  
  goCreationSAV(id : any) {
    localStorage.setItem("idElement",id);
  }
  goSAVModifier(id : any) {
    localStorage.setItem("idElement",id);
  }

  goPEC(reference : string){
    this.Retour();

    const infoPEC = document.getElementById("infoPEC") as HTMLInputElement;
    infoPEC.style.visibility = "visible";

    this.getVentePEC(reference);
  }
  goV(reference : string){
    this.Retour();
    
    const infoV = document.getElementById("infoV") as HTMLInputElement;
    infoV.style.visibility = "visible";

    this.getVenteV(reference);
  }
  
  Retour(){
    const infoPEC = document.getElementById("infoPEC") as HTMLInputElement;
    infoPEC.style.visibility = "hidden";

    const infoV = document.getElementById("infoV") as HTMLInputElement;
    infoV.style.visibility = "hidden";
  }
}
