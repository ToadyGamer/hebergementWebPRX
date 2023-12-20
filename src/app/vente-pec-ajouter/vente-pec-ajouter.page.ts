import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import  { FormGroup }  from "@angular/forms";
import  { FormBuilder }  from "@angular/forms";
import  { Validators }  from "@angular/forms";

import { jsPDF } from "jspdf";
@Component({
  selector: 'app-vente-pec-ajouter',
  templateUrl: './vente-pec-ajouter.page.html',
  styleUrls: ['./vente-pec-ajouter.page.scss'],
})
export class VentePecAjouterPage implements OnInit {

  public ionicFormList: FormGroup;
  public ionicFormPanier: FormGroup;
  public ionicFormClient: FormGroup;

  constructor(private router: Router, public formBuilder: FormBuilder) {
    this.ionicFormList = this.formBuilder.group({
      libelle:['',Validators.compose([])],
      magasin:['',Validators.compose([])]
    });

    this.ionicFormPanier = this.formBuilder.group({
      client:['',Validators.compose([])],
      modele:['',Validators.compose([Validators.required])],
      description:['',Validators.compose([Validators.required])],
      important:['',Validators.compose([])],
      code:['',Validators.compose([])],
      imei:['',Validators.compose([])]
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

  priseSecteur : boolean = false; 
  cable : boolean = false;
  chargeurComplet : boolean = false;
  coque : boolean = false;
  housse : boolean = false;
  ecouteur : boolean = false;
  boiteDeRangements : boolean = false;
  manetteTelecommande : boolean = false;
  oxyde : boolean = false;

  nomC? : string;
  prenomC? : string;
  magasinC? : string;

  allStocks ? : any;
  allMagasins ? : any;
  allQuantites ? : any;
  allClients ? : any;
  allVentesPEC ? : any;
  allPromotions ? : any;
  allModeles ? : any;

  magasin ? : any;

  ionViewWillEnter(){
    this.getInfoUser();
    this.getStocks();
    this.getClients();
    this.getVentesPEC();

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
  getVentesPEC(){
    fetch(`http://127.0.0.1:3000/ventespec?magasin=&etat=&nomPrenom=&modele=`) //récupération des comptes
    .then((resp) => resp.json())
    .then((data) => {this.allVentesPEC = data;
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
  submitAddReparation(){
    if(this.ionicFormList.value.magasin == "" || this.ionicFormPanier.value.client == "") this.presentAlert("Veuillez choisir le magasin et le client", 0);
    else if(this.ionicFormPanier.value.modele == "" || this.ionicFormPanier.value.description == "" || this.ionicFormPanier.value.code == "") this.presentAlert("Veuillez remplir les informations sur le téléphone", 0);
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

      if(trouver)
      {
        let y = 0;
        let trouverbis = false;
        while(y < this.allModeles.length && !trouverbis){
          if(this.ionicFormPanier.value.modele == this.allModeles[y].libelleModele){
            trouverbis = true;
          }
          else y++;
        }
  
        if(trouverbis)
        {
          let date = new Date();
          let creationDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    
          let id = this.allVentesPEC[0].idPECVente + 1;
    
          let reference = `PEC(${date.getFullYear()})-${id}`;
    
          let accessoires = "";
          if(this.priseSecteur) accessoires += " [Prise secteur] ";
          if(this.cable) accessoires += " [Cable] ";
          if(this.chargeurComplet) accessoires += " [Chargeur complet] ";
          if(this.coque) accessoires += " [Coque] ";
          if(this.housse) accessoires += " [Housse] ";
          if(this.ecouteur) accessoires += " [Ecouteur] ";
          if(this.boiteDeRangements) accessoires += " [Boite de rangement] ";
          if(this.manetteTelecommande) accessoires += " [Mannette / Telecommande] ";

          fetch(`http://localhost:3000/ventepec/add?id=${id}&reference=${reference}&date=${creationDate}&client=${this.allClients[i].idClient}&magasin=${this.ionicFormList.value.magasin}&prix=${this.prixTotal}&modele=${this.allModeles[y].idModele}&description=${this.ionicFormPanier.value.description}&code=${this.ionicFormPanier.value.code}&IMEI=${this.ionicFormPanier.value.imei}&accessoires=${accessoires}&oxyde=${this.oxyde}&important=${this.ionicFormPanier.value.important}`);
    
          this.itemsInCart.forEach(i => {
            if(i.idStock != null) fetch(`http://localhost:3000/articlespecventes/add?pecvente=${id}&stock=${i.idStock}&promotion=0&promotion=0`);
            else if(i.idModele != null) fetch(`http://localhost:3000/articlespecventes/add?pecvente=${id}&stock=0&modele=${i.idModele}&promotion=0`);
            else fetch(`http://localhost:3000/articlespecventes/add?pecvente=${id}&stock=0&modele=0&promotion=${i.idPromotion}`);
          });

          this.createPaper(this.ionicFormPanier.value.client, this.allClients[i].telClient, this.ionicFormPanier.value.code, this.ionicFormPanier.value.description, creationDate, this.ionicFormList.value.magasin, reference);
    
          this.addHistorique(id,"Création de la prise en charge.");

          this.presentAlert("Prise en charge ajouté !", 1);
        }
        else this.presentAlert("Aucun modèle trouvé", 0);
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
            this.router.navigate(['/vente-pec'], { replaceUrl: true });
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

  itemsInCart: Array<{ idStock: any, libelleStock: string, prixTTCStock: any,idModele: any, libelleModele: any, prixVenteModele: any, idPromotion: any, libellePromotion: any; prixPromotion: any}> = [];
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
      this.prixTotal += selectedItem.prixVenteModele; 
    }
    else{
      const selectedItem = this.allPromotions.find((s: any) => s.idPromotion === id);
      this.itemsInCart.push(selectedItem);
      this.prixTotal += selectedItem.prixPromotion; 
    }
  }
  removeVente(index : any, type : number){
    if(type == 1) this.prixTotal -= this.itemsInCart[index].prixTTCStock;
    else if(type == 2)this.prixTotal -= this.itemsInCart[index].prixVenteModele;
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
  addAccessoiresPage(){
    let pageAccessoires = document.getElementById("addAccessoires") as HTMLElement;
    pageAccessoires.hidden = false;
  }
  backAccessoiresPage(){
    let pageAccessoires = document.getElementById("addAccessoires") as HTMLElement;
    pageAccessoires.hidden = true;
  }

  addHistorique(id : any, text : string){
    let date = new Date();
    let creationDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} - ${date.getHours()}h${date.getMinutes()}`;
    fetch(`http://127.0.0.1:3000/historiquespec/add?pec=${id}&libelle=${text}&date=${creationDate}`); //Articles
  }
  createPaper(nomPrenom : string, telephone : string, code : string, description : string, date : string, magasin : number, reference : string){
    let doc = new jsPDF('l', 'mm', [62, 60]);
    doc.setFontSize(7);
    doc.setFont("times", "bold");
    doc.text(reference, 24, 8);
    doc.text("Client : " + nomPrenom, 3, 12);
    doc.text("Code : " + code, 40, 12);
    doc.setFont("times", "normal");
    doc.text("Date : " + date, 40, 16);
    doc.text("Téléphone : " + telephone, 3, 16);
    doc.text("Magasin : " + this.allMagasins[magasin - 1].villeMagasin, 3, 20);
    let oxyde = this.oxyde == true? "Téléphone oxydé. " : ""; 
    doc.text("Description : " + oxyde + description, 3, 24,{maxWidth: 56, align: "justify"});
    doc.output('pdfobjectnewwindow');
  }
}
