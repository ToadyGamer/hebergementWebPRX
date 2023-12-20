import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import  { FormGroup }  from "@angular/forms";
import  { FormBuilder }  from "@angular/forms";
import  { Validators }  from "@angular/forms";
@Component({
  selector: 'app-vente-v-ajouter',
  templateUrl: './vente-v-ajouter.page.html',
  styleUrls: ['./vente-v-ajouter.page.scss'],
})
export class VenteVAjouterPage implements OnInit {

  public ionicFormList: FormGroup;
  public ionicFormPanier: FormGroup;
  public ionicFormClient: FormGroup;

  constructor(private router: Router, public formBuilder: FormBuilder) {
    this.ionicFormList = this.formBuilder.group({
      libelle:['',Validators.compose([])],
      magasin:['',Validators.compose([])]
    });

    this.ionicFormPanier = this.formBuilder.group({
      client:['',Validators.compose([])]
    });

    this.ionicFormClient = this.formBuilder.group({
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
  magasinC? : string;

  allStocks ? : any;
  allMagasins ? : any;
  allQuantites ? : any;
  allClients ? : any;
  allVentesV ? : any;
  allPromotions ? : any;
  allModeles ? : any;

  magasin ? : any;

  ionViewWillEnter(){
    this.getInfoUser();
    this.getStocks();
    this.getClients();
    this.getVentesV();

    this.getMagasins();
    this.getQuantites();
    this.getPromotions();
    this.getModeles();
  }

  addValueFilterMagasin(data : any){
    const selectMagasin = document.getElementById("selectMagasin");
    this.magasin = data[0].idMagasin;
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
  getQuantites(){
    fetch(`http://127.0.0.1:3000/quantites?magasin=${this.ionicFormList.value.magasin}`) //récupération des comptes
    .then((resp) => resp.json())
    .then((data) => {this.allQuantites = data;
    })
    .catch(function(error) {
      console.log(error);
    });
  }
  getVentesV(){
    fetch(`http://127.0.0.1:3000/ventesv?magasin=&etat=&nomPrenom=&stock=`) //récupération des comptes
    .then((resp) => resp.json())
    .then((data) => {this.allVentesV = data;
    })
    .catch(function(error) {
      console.log(error);
    });
  }
  getPromotions(){
    fetch(`http://127.0.0.1:3000/promotions?libelle=${this.ionicFormList.value.libelle}`) //récupération des comptes
    .then((resp) => resp.json())
    .then((data) => { this.allPromotions = data;
    })
    .catch(function(error) {
      console.log(error);
    });
  }
  getModeles()
  {
    fetch(`http://127.0.0.1:3000/modeles?libelle=${this.ionicFormList.value.libelle}`) //récupération des comptes
    .then((resp) => resp.json())
    .then((data) => {this.allModeles = data;
    })
    .catch(function(error) {
      console.log(error);
    });
  }

  submitForm()
  {
    this.getStocks();
    this.getModeles();
    this.getPromotions();
  }
  submitAddClient(){
    if(this.ionicFormClient.value.nom == "" || this.ionicFormClient.value.prenom == "" || this.ionicFormClient.value.tel == "" || this.ionicFormClient.value.codepostal == "" || this.ionicFormClient.value.ville == "" || this.ionicFormClient.value.mail == "") this.presentAlert("Veuillez remplir les champs obligatoires.", 0)
    else if(this.ionicFormClient.value.tel.length != 10) this.presentAlert("Numéro de téléphone invalide", 0);
    else
    {
      let pageClient = document.getElementById("addClient") as HTMLElement;
      pageClient.hidden = true;
      fetch(`http://localhost:3000/clients/add?nom=${this.ionicFormClient.value.nom}&prenom=${this.ionicFormClient.value.prenom}&tel=${this.ionicFormClient.value.tel}&adresse=${this.ionicFormClient.value.adresse}&codePostal=${this.ionicFormClient.value.codepostal}&ville=${this.ionicFormClient.value.ville}&dateDeNaissance=${this.ionicFormClient.value.datedenaissance}&mail=${this.ionicFormClient.value.mail}`);
      this.presentAlert("Client ajouté avec succès !", 0);
      this.getClients();
    }
  }
  submitAddVente(){
    if(this.ionicFormList.value.magasin == "" || this.ionicFormPanier.value.client == "") this.presentAlert("Veuillez choisir le magasin et le client", 0)
    else if(this.itemsInCart.length == 0) this.presentAlert("Le panier ne peut pas être vide", 0);
    else
    {
      let i = 0;
      let trouver = false;
      while(i < this.allClients.length && !trouver){
        if(this.ionicFormPanier.value.client == this.allClients[i].nomClient + " " + this.allClients[i].prenomClient){
          trouver = true;
        }
        else i++;
      }

      if(trouver){
        let date = new Date();
        let creationDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  
        let id = this.allVentesV[0].idVente + 1;
  
        let reference = `V(${date.getFullYear()})-${id}`;
  
        fetch(`http://localhost:3000/ventev/add?id=${id}&reference=${reference}&date=${creationDate}&client=${this.allClients[i].idClient}&magasin=${this.ionicFormList.value.magasin}&prix=${this.prixTotal}`);
  
        this.itemsInCart.forEach(i => {
          if(i.idStock != null) fetch(`http://localhost:3000/articlesvventes/add?vvente=${id}&stock=${i.idStock}&modele=0&promotion=0`);
          else if(i.idModele != null) fetch(`http://localhost:3000/articlesvventes/add?vvente=${id}&stock=0&modele=${i.idModele}&promotion=0`);
          else fetch(`http://localhost:3000/articlesvventes/add?vvente=${id}&stock=0&modele=0&promotion=${i.idPromotion}`);
        });
  
        this.presentAlert("Vente ajouté !", 1);
      }
      else this.presentAlert("Aucun client trouvé", 0);
    }
  }

  presentAlert(text : string, choix : any) { //0 = error / 1 = Ajout panier / 2 = Ajout client
    const alert = document.createElement('ion-alert');
    alert.header = 'INFORMATIONS';
    alert.message = text;
    if(choix == 0){
      alert.buttons = [
        {
          text: 'OK'
        }];
    }
    else if(1){
      alert.buttons = [
        {
          text: 'Continuer',
          role: 'confirm',
          handler: () => { 
            this.router.navigate(['/vente-v'], { replaceUrl: true });
          }
        }];
    }
    else{
      alert.buttons = [
        {
          text: 'Continuer',
          role: 'confirm',
          handler: () => { 
            window.location.reload(); 
          }
        }];
    }

    document.body.appendChild(alert);
    alert.present();
  }

  itemsInCart: Array<{ idStock: any, libelleStock: string, prixTTCStock: any,idModele: any, libelleModele: any, prixModele: any, idPromotion: any, libellePromotion: any; prixPromotion: any}> = [];
  prixTotal: any = 0;

  addVente(id : any, type : number){
    let leave = false;
    this.itemsInCart.forEach((element : any) => {
      if(element.idPromotion != null) leave = true;
    });

    if(leave) return;
    //1 == Stock
    //2 == Modele
    //3 == Promotion
    if(type == 1){
      const selectedItem = this.allStocks.find((p: any) => p.idStock === id);
      this.itemsInCart.push(selectedItem);
      this.prixTotal += selectedItem.prixTTCStock; 
    }
    else if(type == 2){
      const selectedItem = this.allModeles.find((s: any) => s.idModele === id);
      this.itemsInCart.push(selectedItem);
      this.prixTotal += selectedItem.prixModele; 
    }
    else{
      const selectedItem = this.allPromotions.find((s: any) => s.idPromotion === id);
      this.itemsInCart.push(selectedItem);
      this.prixTotal += selectedItem.prixPromotion; 
    }
  }

  removeVente(index : any, type : number){
    if(type == 1) this.prixTotal -= this.itemsInCart[index].prixTTCStock;
    else if(type == 2)this.prixTotal -= this.itemsInCart[index].prixModele;
    else this.prixTotal -= this.itemsInCart[index].prixPromotion;
    this.itemsInCart.splice(index, 1);
  }

  addClientPage(){
    let pageClient = document.getElementById("addClient") as HTMLElement;
    pageClient.hidden = false;
  }
  backClientPage(){
    let pageClient = document.getElementById("addClient") as HTMLElement;
    pageClient.hidden = true;
  }
}
