import { Component, OnInit, Query } from '@angular/core';

import { Router } from '@angular/router';
import  { FormGroup }  from "@angular/forms";
import  { FormBuilder }  from "@angular/forms";
import  { Validators }  from "@angular/forms";

import { jsPDF } from "jspdf";
@Component({
  selector: 'app-vente-v',
  templateUrl: './vente-v.page.html',
  styleUrls: ['./vente-v.page.scss'],
})
export class VenteVPage implements OnInit {

  public ionicForm: FormGroup;
  public ionicFormSAV: FormGroup;

  constructor(private router: Router, public formBuilder: FormBuilder) {
    this.ionicForm = this.formBuilder.group({
      nomPrenom:['',Validators.compose([])],
      magasin:['',Validators.compose([])],
      etat:['',Validators.compose([])],
      libelleStock:['',Validators.compose([])]
    });

    this.ionicFormSAV = this.formBuilder.group({
      description:['',Validators.compose([Validators.required])],
      dossierChaud:['',Validators.compose([Validators.required])],
      magasin:['',Validators.compose([Validators.required])],
      code:['',Validators.compose([Validators.required])],
    });
  }

  async ngOnInit() 
  {

  }

  allStocks ? : any;
  allPromotions ? : any;
  allVentesV? : any;
  allMagasins ? : any;
  allEtats ? : any;
  allModeles ? : any;
  allClients ? : any;
  allReglementsVentesV ? : any;
  allArticlesVentesV ? : any;
  allArticlesVentesVBis ? : any;
  allGaranties ? : any;
  allSAV ? : any;

  nomC? : string;
  prenomC? : string;

  ionViewWillEnter()
  {
    this.getStocks();
    this.getPromotions();
    this.getGaranties();
    this.getModeles();
    this.getInfoUser();
    this.getMagasins();
    this.getEtats();
    this.getClients();
    this.getReglementsVentesV();
    this.getArticlesVentesV(0);

    this.getVentesV();
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
    this.getVentesV();
  }

  getStocks()
  {
    fetch(`http://127.0.0.1:3000/stocks?libelle`) //récupération des comptes
    .then((resp) => resp.json())
    .then((data) => {this.allStocks = data;
    })
    .catch(function(error) {
      console.log(error);
    });
  }
  getPromotions(){
    fetch(`http://127.0.0.1:3000/promotions?libelle=`) //récupération des comptes
    .then((resp) => resp.json())
    .then((data) => { this.allPromotions = data;
    })
    .catch(function(error) {
      console.log(error);
    });
  }
  getModeles()
  {
    fetch(`http://127.0.0.1:3000/modeles?libelle=`) //récupération des comptes
    .then((resp) => resp.json())
    .then((data) => {this.allModeles = data;
    })
    .catch(function(error) {
      console.log(error);
    });
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
  getVentesV()
  {
    fetch(`http://127.0.0.1:3000/ventesv?magasin=${this.ionicForm.value.magasin}&etat=${this.ionicForm.value.etat}&nomPrenom=${this.ionicForm.value.nomPrenom}&stock=${this.ionicForm.value.libelleStock}`) //récupération des comptes
    .then((resp) => resp.json())
    .then((data) => {this.allVentesV = data;
    })
    .catch(function(error) {
      console.log(error);
    });
  }
  getReglementsVentesV()
  {
    fetch(`http://127.0.0.1:3000/reglementsvventes`) //récupération des comptes
    .then((resp) => resp.json())
    .then((data) => {this.allReglementsVentesV = data;
    })
    .catch(function(error) {
      console.log(error);
    });
  }
  getArticlesVentesV(id : any)
  {
    let text = `http://127.0.0.1:3000/articlesvventes`;
    if(id != 0) text = `http://127.0.0.1:3000/articlesvventes?id=${id}`;
    fetch(text) //récupération des comptes
    .then((resp) => resp.json())
    .then((data) => {
      if(id != 0 ) this.allArticlesVentesVBis = data;
      else this.allArticlesVentesV = data;
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
  getClients()
  {
    fetch(`http://127.0.0.1:3000/clients?nomPrenom=`) //récupération des comptes
    .then((resp) => resp.json())
    .then((data) => {this.allClients = data;
    })
    .catch(function(error) {
      console.log(error);
    });
  }
  getGaranties()
  {
    fetch(`http://127.0.0.1:3000/garanties`) //récupération des comptes
    .then((resp) => resp.json())
    .then((data) => {this.allGaranties = data;
    })
    .catch(function(error) {
      console.log(error);
    });
  }
  getSAV()
  {
    fetch(`http://127.0.0.1:3000/sav`) //récupération des comptes
    .then((resp) => resp.json())
    .then((data) => {this.allSAV = data;
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
    let vente : any;

    while(i < this.allVentesV.length && !trouver){
      if(this.allVentesV[i].idVente == id){
        trouver = true;

        vente = i;
      }
      else i++;
    }

    const alert = document.createElement('ion-alert');
    alert.header = 'CONFIRMATION',
    alert.message = "Etes-vous sur de vouloir supprimer la référence " + this.allVentesV[vente].referenceVVente + " des ventes V ?",
    alert.buttons = [{ text: 'Non',},
    {
      text: 'Oui',
      role: 'confirm',
      handler: () => { 
        fetch(`http://127.0.0.1:3000/ventev/delete?id=${id}`); //Ventes
        fetch(`http://127.0.0.1:3000/articlesvventes/delete?id=${id}`); //Articles
        fetch(`http://127.0.0.1:3000/reglementsventesv/delete?vente=${id}`); //Réglements
        window.location.reload(); 
      }
    }];

    document.body.appendChild(alert);
    alert.present();
  }
  
  goVenteVModifier(id : any) {
    localStorage.setItem("idElement",id);
  }

  idV = 0;
  goCreationSAV1(id : any) {
    this.idV=id;
    localStorage.setItem("idElement",id);

    this.getArticlesVentesV(this.idV);

    const list = document.getElementById("list") as HTMLInputElement;

    list.style.visibility = "visible";
  }
  creationDate = "";
  stockID = 0;
  modeleID = 0;

  idArticle = 0;
  goCreationSAV2(id : any, V : any, stock : number, modele : number) {
    this.idArticle = id;

    this.getSAV();

    const input = document.getElementById("input") as HTMLInputElement;
    input.style.visibility = "hidden";

    this.stockID = stock;
    this.modeleID = modele;

    fetch(`http://127.0.0.1:3000/articlesvventes?idSAV=${this.idArticle}`) //récupération des comptes
    .then((resp) => resp.json())
    .then((data) => {
      this.allGaranties.forEach((g : any) => {
        if(data[0].garantieStock == g.idGarantie || data[0].garantieModele == g.idGarantie){
          
          fetch(`http://127.0.0.1:3000/ventesv?id=${V}`) //récupération des comptes
          .then((resp) => resp.json())
          .then((data) => {
            let j : number = data[0].dateVVente.substring(0,2);
            let m : number = data[0].dateVVente.substring(5,3);
            let a : number = data[0].dateVVente.substring(10,6);
            let gar : number = g.jourGarantie;
            j = Number(j)+Number(gar);
            while(j > 30 || m > 12){
              j -= 30;
              m++;
              if(m > 12)
              {
                m = 1;
                a++;
              }
            }

            let ajoutable = false;
            let date = new Date();

            if(a > date.getFullYear())ajoutable = true;
            else if(a == date.getFullYear() ){
              if(m >= date.getMonth() + 1 ){
                if(j >= date.getDate() )ajoutable = true;
              } 
            }

            this.creationDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

            if(ajoutable){
              this.getArticlesVentesV(this.idV);

              const input = document.getElementById("input") as HTMLInputElement;
          
              input.style.visibility = "visible";
            }
            else this.presentAlert("Garantie impossible", false);
          })
          .catch(function(error) {
            console.log(error);
          });

        }
      });
    })
    .catch(function(error) {
      console.log(error);
    });
  }
  annulerSAV(){
    const list = document.getElementById("list") as HTMLInputElement;
    list.style.visibility = "hidden";

    const input = document.getElementById("input") as HTMLInputElement;
    input.style.visibility = "hidden";
  }
  ajoutSAV(){
    if(this.ionicFormSAV.value.description != "" && this.ionicFormSAV.value.magasin != "" && this.ionicFormSAV.value.dossierChaud != "" && this.ionicFormSAV.value.code != ""){
      let id = this.allSAV[0].idSAV + 1;
 
      let date = new Date();
      let reference = `SAV(${date.getFullYear()})-${id}`;
      fetch(`http://127.0.0.1:3000/sav/add?id=${id}&reference=${reference}&dateSAV=${this.creationDate}&stock=${this.stockID}&magasin=${this.ionicFormSAV.value.magasin}&modele=${this.modeleID}&description=${this.ionicFormSAV.value.description}&dossierChaud=${this.ionicFormSAV.value.dossierChaud}&pec=${0}&v=${this.idV}&code=${this.ionicFormSAV.value.code}`);
      fetch(`http://127.0.0.1:3000/articlessav/add?sav=${id}&stock=${this.stockID}`);
      fetch(`http://127.0.0.1:3000/articlesvventes/modify?id=${this.idArticle}&savCreer=1`);

      fetch(`http://127.0.0.1:3000/ventesv?id=${localStorage.getItem("idElement")}`) //récupération des comptes
      .then((resp) => resp.json())
      .then((data) => {
        this.createPaper(data[0].client, this.ionicFormSAV.value.code, this.ionicFormSAV.value.description, this.creationDate, this.ionicFormSAV.value.magasin, reference, this.ionicFormSAV.value.dossierChaud);
      })
      .catch(function(error) {
        console.log(error);
      });
      this.presentAlert("SAV créer avec succès !", true);
    }
    else this.presentAlert("Veuillez remplir tous les champs obligatoires", false);
  }

  presentAlert(text : string, navigate : boolean) {
    const alert = document.createElement('ion-alert');
    alert.header = 'INFORMATIONS';
    alert.message = text;
    if(!navigate){
      alert.buttons = [
        {
          text: 'OK'
        }];
    }
    else{
      alert.buttons = [
        {
          text: 'Continuer',
          role: 'confirm',
          handler: () => { 
            this.router.navigate(['/sav'], { replaceUrl: true });
          }
        }];
    }
    document.body.appendChild(alert);
    alert.present();
  }

  createPaper(client : number, code : string, description : string, date : string, magasin : number, reference : string, chaud : string){
    let doc = new jsPDF('l', 'mm', [62, 60]);
    let i = 0;
    let trouver = false;
    while(i < this.allClients.length && !trouver){
      if(client == this.allClients[i].idClient){
        trouver = true;
      }
      else i++;
    }

    doc.setFontSize(7);
    doc.setFont("times", "bold");
    doc.text(reference, 24, 8);
    doc.text("Client : " + this.allClients[i].nomClient + " " + this.allClients[i].prenomClient, 3, 12);
    doc.text("Code : " + code, 40, 12);
    doc.setFont("times", "normal");
    doc.text("Date : " + date, 40, 16);
    doc.text("Téléphone : " + this.allClients[i].telClient, 3, 16);
    doc.text("Magasin : " + this.allMagasins[magasin - 1].villeMagasin, 3, 20);
    doc.text("Dossier chaud : " + (chaud = 1 ? "oui " : " non") , 40, 20);
    doc.text("Description : " + description, 3, 24,{maxWidth: 56, align: "justify"});
    doc.output('pdfobjectnewwindow');
  }

}
