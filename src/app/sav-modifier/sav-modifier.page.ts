import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import  { FormGroup }  from "@angular/forms";
import  { FormBuilder }  from "@angular/forms";
import  { Validators }  from "@angular/forms";
@Component({
  selector: 'app-sav-modifier',
  templateUrl: './sav-modifier.page.html',
  styleUrls: ['./sav-modifier.page.scss'],
})
export class SavModifierPage implements OnInit {

  public ionicFormList: FormGroup;
  public ionicFormPanier: FormGroup;
  public ionicFormClient: FormGroup;

  constructor(private router: Router, public formBuilder: FormBuilder) {
    this.ionicFormList = this.formBuilder.group({
      libelle:['',Validators.compose([])],
      magasin:['',Validators.compose([])]
    });

    this.ionicFormPanier = this.formBuilder.group({
      etat:['',Validators.compose([Validators.required])],
      description:['',Validators.compose([Validators.required])]
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

  ngOnInit() {  }

  nomC? : string;
  prenomC? : string;
  magasinC? : string;

  allStocks ? : any;
  allMagasins ? : any;
  allSAV ? : any;
  allQuantites ? : any;
  allEtats ? : any;
  allArticlesSAV ? : any;
  allHistoriques ? : any;

  magasin ? : any;
  etat ? : any;
  description ? : any;

  idClient ? : number;
  nomClient ? : any;
  prenomClient ? : any;
  telephoneClient ? : any;
  mailClient ? : any;
  adresseClient ? : any;
  codePostalClient ? : any;
  villeClient ? : any;
  dateNaissanceClient ? : any;
  
  ionViewWillEnter(){
    this.getInfoUser();
    this.getStocks();
    this.getSAV();
    this.getEtats();
    this.getMagasins();
    this.getHistoriques();
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
            this.magasinC = element.magasin;
          }
        })
        .catch((error) => {
          console.error("Une erreur s'est produite :", error);
        });
    }
  }
  getStocks()
  {
    fetch(`http://localhost:3000/stocks?libelle=${this.ionicFormList.value.libelle}`) //récupération des comptes
    .then((resp) => resp.json())
    .then((data) => {this.allStocks = data;
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
  getSAV(){
    let id = localStorage.getItem("idElement");

    fetch(`http://127.0.0.1:3000/sav?id=${id}`) //récupération des comptes
    .then((resp) => resp.json())
    .then((data) => {
      if(data[0].clientPEC) this.getClient(data[0].clientPEC);
      else this.getClient(data[0].clientV);
      this.allSAV = data;
      this.etat = data[0].etat;
      this.description = data[0].descriptionSAV;
      this.magasin = data[0].magasin;
      this.getQuantites(data[0].magasin);
      this.getArticlesSAV(data[0].idSAV);
    })
    .catch(function(error) {
      console.log(error);
    });
  }
  getQuantites(id : number){
    fetch(`http://127.0.0.1:3000/quantites?magasin=${id}`) //récupération des comptes
    .then((resp) => resp.json())
    .then((data) => {this.allQuantites = data;
    })
    .catch(function(error) {
      console.log(error);
    });
  }
  getEtats(){
    fetch(`http://127.0.0.1:3000/etats`) //récupération des comptes
    .then((resp) => resp.json())
    .then((data) => {this.allEtats = data;
    })
    .catch(function(error) {
      console.log(error);
    });
  }
  getArticlesSAV(id : number){
    fetch(`http://127.0.0.1:3000/articlessav?idSAV=${id}`) //récupération des comptes
    .then((resp) => resp.json())
    .then((data) => {this.allArticlesSAV = data;
      data.forEach((element : any) => {
        this.addVente(element.stock);
      });
    })
    .catch(function(error) {
      console.log(error);
    });
  }
  getHistoriques(){
    fetch(`http://127.0.0.1:3000/historiquessav?sav=${localStorage.getItem("idElement")}`) //récupération des comptes
    .then((resp) => resp.json())
    .then((data) => {this.allHistoriques = data;
    })
    .catch(function(error) {
      console.log(error);
    });
  }
  getClient(id : number){
    this.idClient = id;
    fetch(`http://127.0.0.1:3000/clients?id=${id}`) //récupération des comptes
    .then((resp) => resp.json())
    .then((data) => {
      this.nomClient = data[0].nomClient;
      this.prenomClient = data[0].prenomClient;
      this.telephoneClient = data[0].telClient;
      this.mailClient = data[0].mailClient;
      this.adresseClient = data[0].adresseClient;
      this.codePostalClient = data[0].codePostalClient;
      this.villeClient = data[0].villeClient;
      this.dateNaissanceClient = data[0].dateDeNaissanceClient;
    })
    .catch(function(error) {
      console.log(error);
    });
  }

  submitForm()
  {
    this.getStocks();
  }
  async submitFormModifier(){
    if(this.ionicFormPanier.value.description == "") this.presentAlert("Veuillez remplir les différents champs", false);
    {
      let id = localStorage.getItem("idElement");
      if(this.allSAV[0].descriptionSAV != this.ionicFormPanier.value.description) this.addHistorique(id,`L ancienne description "${this.allSAV[0].descriptionSAV}" est devenu "${this.ionicFormPanier.value.description}"`);
      if(this.allSAV[0].etat != this.ionicFormPanier.value.etat) this.addHistorique(id,`L ancienne etat "${this.allEtats[Number(this.allSAV[0].etat) - 1].libelleEtat}" est devenu "${this.allEtats[Number(this.ionicFormPanier.value.etat) - 1].libelleEtat}"`);

      fetch(`http://localhost:3000/sav/modify?id=${id}&description=${this.ionicFormPanier.value.description}&etat=${this.ionicFormPanier.value.etat}`);

      this.presentAlert("SAV modifié !", true);
      await this.delay();
      this.getHistoriques();
    }
  }
  async submitModifySAV(){

    if(this.itemsInCart.length == 0) this.presentAlert("Le panier ne peut pas être vide", false);
    else
    {
      let id = localStorage.getItem("idElement");
      fetch(`http://localhost:3000/articlessav/delete?idSAV=${id}`);

      this.itemsInCart.forEach(i => {
        fetch(`http://localhost:3000/articlessav/add?idSAV=${id}&stock=${i.idStock}`);
      });

      this.addHistorique(id,`La panier du SAV a été mis à jour.`);

      this.presentAlert("SAV modifié !", true);
      await this.delay();
      this.getHistoriques();
    }
  }
  submitFormClient(){
    if(this.ionicFormClient.value.nom == "" || this.ionicFormClient.value.prenom == "" || this.ionicFormClient.value.tel == "" || this.ionicFormClient.value.codepostal == "" || this.ionicFormClient.value.ville == "" || this.ionicFormClient.value.mail == "") this.presentAlert("Veuillez remplir les champs obligatoires.", false)
    else
    {
      fetch(`http://localhost:3000/clients/modify?id=${this.idClient}&nom=${this.ionicFormClient.value.nom}&prenom=${this.ionicFormClient.value.prenom}&tel=${this.ionicFormClient.value.telephone}&adresse=${this.ionicFormClient.value.adresse}&codePostal=${this.ionicFormClient.value.codepostal}&ville=${this.ionicFormClient.value.ville}&dateDeNaissance=${this.ionicFormClient.value.datenaissance}&mail=${this.ionicFormClient.value.mail}`);
      this.presentAlert("Client modifié avec succès !", false);
    }
  }

  presentAlert(text : string, choix : boolean) {
    const alert = document.createElement('ion-alert');
    alert.header = 'INFORMATIONS';
    alert.message = text;
    if(choix){
      alert.buttons = [
        {
          text: 'Retour aux SAV',
          role: 'confirm',
          handler: () => { 
            this.router.navigate(['sav'], { replaceUrl: true });
          }
        },
        {
          text: 'Continuer',
          role: 'confirm',
          handler: () => { 

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

  itemsInCart: Array<{ idStock: any, libelleStock: string, prixUnitaireHorsTaxeStock: any}> = [];
  prixTotal: any = 0;
  addVente(id : any){
    const selectedItem = this.allStocks.find((p: any) => p.idStock === id);
    this.itemsInCart.push(selectedItem);
    this.prixTotal += selectedItem.prixUnitaireHorsTaxeStock; 
  }
  removeVente(index : any){
    this.prixTotal -= this.itemsInCart[index].prixUnitaireHorsTaxeStock;
    this.itemsInCart.splice(index, 1);
  }

  addHistorique(id : any, text : string){
    let date = new Date();
    let creationDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} - ${date.getHours()}h${date.getMinutes()}`;
    let acteur = this.nomC + " " + this.prenomC + " => ";
    fetch(`http://127.0.0.1:3000/historiquessav/add?sav=${id}&libelle=${acteur + text}&date=${creationDate}`); //Articles
  }

  delay(){
    return new Promise<number>(resolve => {
      setTimeout(() => {
          resolve(1);
      }, 200);
  });
  }
}
