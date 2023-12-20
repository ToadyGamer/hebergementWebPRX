import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import  { FormGroup }  from "@angular/forms";
import  { FormBuilder }  from "@angular/forms";
import  { Validators }  from "@angular/forms";

@Component({
  selector: 'app-vente-pec-modifier',
  templateUrl: './vente-pec-modifier.page.html',
  styleUrls: ['./vente-pec-modifier.page.scss'],
})
export class VentePecModifierPage implements OnInit {

  public ionicForm: FormGroup;
  public ionicFormClient: FormGroup;
  public ionicFormList: FormGroup;
  public ionicFormPaiement: FormGroup;

  constructor(private router: Router, public formBuilder: FormBuilder) {

    this.ionicForm = this.formBuilder.group({
      etat:['',Validators.compose([])],
      description:['',Validators.compose([])],
      imei:['',Validators.compose([])]
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

    this.ionicFormPaiement = this.formBuilder.group({
      reglement:['',Validators.compose([])],
      prix:['',Validators.compose([])],
      code:['',Validators.compose([])]
    });

    this.ionicFormList = this.formBuilder.group({
      libelle:['',Validators.compose([])],
      magasin:['',Validators.compose([])]
    });

  }

  ngOnInit() {

  }

  nomC? : string;
  prenomC? : string;

  allReglementsPECVentes? : any;
  allStocks ? : any;
  allQuantites ? : any;
  allMagasins ? : any;
  allArticles ? : any;
  allAvoirs ? : any;
  allPromotions ? : any;
  allModeles ? : any;
  allEtats ? : any;
  allHistoriques ? : any;
  aPECVente ? : any;

  magasin ? : any;
  etatModify ? : any;
  descriptionModify ? : any;
  imeiModify ? : any;

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
    this.getReglementsVentesPEC();
    this.getStocks();
    this.getQuantites();
    this.getMagasins();
    this.getArticlePECVentes();
    this.getVentesPEC();
    this.changeReglement();
    this.getAvoirs();
    this.getPromotions();
    this.getModeles();
    this.getEtats();
    this.getHistoriques();
  }

  addValueFilterMagasin(data : any) {

    const selectMagasin = document.getElementById("selectMagasin");

    data.forEach((m : any) => {
      const opt = document.createElement("option");
      opt.value = m.idMagasin;
      opt.text = m.villeMagasin;
      opt.style.color = 'black';

      selectMagasin?.appendChild(opt);
    });
  }

  async submitFormPaiement()
  {
    if(this.ionicFormPaiement.value.reglement == "") this.presentAlert("Type de paiement demandé", false);
    else{
      if(this.ionicFormPaiement.value.reglement == "Avoir")
      {
        if(this.ionicFormPaiement.value.code == "") this.presentAlert("Un code d'avoir est demandé", false);
        else{

          let trouver : boolean = false;
          let i : number = 0;

          while(i < this.allAvoirs.length && !trouver){
            if(this.allAvoirs[i].idAvoir == this.ionicFormPaiement.value.code){
              trouver = true;
            }
            else i++;
          }

          if(trouver){
            let date = new Date();
            let creationDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} - ${date.getHours()}h${date.getMinutes()}`;

            fetch(`http://localhost:3000/reglementsventepec/add?id=${localStorage.getItem("idElement")}&reglement=${this.ionicFormPaiement.value.reglement}&prix=${this.allAvoirs[i].prixAvoir}&date=${creationDate}`);

            let total : number = this.allAvoirs[i].prixAvoir;
            this.allReglementsPECVentes.forEach((r:any) => {
              total += r.prixReglement;
            });

            this.prixRestant -= total;
            if(this.prixRestant < 0) this.prixRestant = 0;
            fetch(`http://127.0.0.1:3000/ventespec/modify?id=${localStorage.getItem("idElement")}&etat=${this.ionicForm.value.etat}&prix=${this.prixTotal}&description=${this.ionicForm.value.description}&imei=${this.ionicForm.value.imei}&restant=${this.prixRestant}`); //Modification

            if(this.prixTotal <= total){
              let surPrix : number = total - this.prixTotal;
              fetch(`http://localhost:3000/avoirs/add?prix=${surPrix}`);

              fetch(`http://localhost:3000/reglementsventepec/add?id=${localStorage.getItem("idElement")}&reglement=Nouvelle avoir&prix=${surPrix}&date=${creationDate}`);

              this.addHistorique(localStorage.getItem("idElement"), `Un paiement de ${this.allAvoirs[i].prixAvoir}€ en avoir à été ajouté. Un avoir de ${surPrix}€ à été créé.`);
            }
            else this.addHistorique(localStorage.getItem("idElement"), `Un paiement de ${this.allAvoirs[i].prixAvoir}€ en avoir à été ajouté.`);

            fetch(`http://localhost:3000/avoirs/delete?id=${this.ionicFormPaiement.value.code}`);
            this.presentAlert("Paiement rajouté avec succès !", true);
          }
          else{
            this.presentAlert("Le code inséré n'existe pas.", false);
          }
        }
      }
      else if(this.ionicFormPaiement.value.reglement == "Espèce")
      {
        if(this.ionicFormPaiement.value.prix == "") this.presentAlert("Un prix est demandé", false);
        else{
          let date = new Date();
          let creationDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} - ${date.getHours()}h${date.getMinutes()}`;

          fetch(`http://localhost:3000/reglementsventepec/add?id=${localStorage.getItem("idElement")}&reglement=${this.ionicFormPaiement.value.reglement}&prix=${this.ionicFormPaiement.value.prix}&date=${creationDate}`);

          let total : number = Number(this.ionicFormPaiement.value.prix);
          this.allReglementsPECVentes.forEach((r:any) => {
            total += r.prixReglement;
          });

          this.prixRestant -= total;
          if(this.prixRestant < 0) this.prixRestant = 0;
          fetch(`http://127.0.0.1:3000/ventespec/modify?id=${localStorage.getItem("idElement")}&etat=${this.ionicForm.value.etat}&prix=${this.prixTotal}&description=${this.ionicForm.value.description}&imei=${this.ionicForm.value.imei}&restant=${this.prixRestant}`); //Modification

          if(this.prixTotal <= total){
            let surPrix : number = total - this.prixTotal;
            this.presentAlert(`Paiement rajouté avec succès ! Rendu du paiement : ${surPrix}€`, true);

            if(surPrix > 0){
              fetch(`http://localhost:3000/reglementsventepec/add?id=${localStorage.getItem("idElement")}&reglement=Rendu&prix=${surPrix}&date=${creationDate}`);
              this.addHistorique(localStorage.getItem("idElement"), `Un paiement de ${this.ionicFormPaiement.value.prix}€ en espèce à été ajouté. Un rendu de ${surPrix}€ à été effectué.`);
            }
            else this.addHistorique(localStorage.getItem("idElement"), `Un paiement de ${this.ionicFormPaiement.value.prix}€ en espèce à été ajouté.`);
          }
          else this.presentAlert(`Paiement rajouté avec succès !`, true);
        }
      }
      else{
        if(this.ionicFormPaiement.value.prix == "") this.presentAlert("Un prix est demandé", false);
        else{

          this.prixRestant -= this.ionicFormPaiement.value.prix;
          fetch(`http://127.0.0.1:3000/ventespec/modify?id=${localStorage.getItem("idElement")}&etat=${this.ionicForm.value.etat}&prix=${this.prixTotal}&description=${this.ionicForm.value.description}&imei=${this.ionicForm.value.imei}&restant=${this.prixRestant}`); //Modification

          let date = new Date();
          let creationDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} - ${date.getHours()}h${date.getMinutes()}`;

          fetch(`http://localhost:3000/reglementsventepec/add?id=${localStorage.getItem("idElement")}&reglement=${this.ionicFormPaiement.value.reglement}&prix=${this.ionicFormPaiement.value.prix}&date=${creationDate}`);

          this.addHistorique(localStorage.getItem("idElement"), `Un paiement de ${this.ionicFormPaiement.value.prix}€ en ${this.ionicFormPaiement.value.reglement} à été ajouté.`);
          this.presentAlert("Paiement rajouté avec succès !", true);
        }
      }

      await this.delay();

      this.getReglementsVentesPEC();
      this.getHistoriques();
    }
  }
  submitForm()
  {
    this.getStocks();
    this.getModeles();
    this.getPromotions();
  }
  submitFormModify(){
    if(this.ionicForm.value.description == "" ) this.presentAlert(`La description ne peut pas être vide`, false);
    else{
      if(this.aPECVente[0].descriptionPECVente != this.ionicForm.value.description) this.addHistorique(localStorage.getItem("idElement"),`L ancienne description "${this.aPECVente[0].descriptionPECVente}" est devenu "${this.ionicForm.value.description}"`);
      if(this.aPECVente[0].etat != this.ionicForm.value.etat) this.addHistorique(localStorage.getItem("idElement"),`L ancienne etat "${this.allEtats[Number(this.aPECVente[0].etat) - 1].libelleEtat}" est devenu "${this.allEtats[Number(this.ionicForm.value.etat) - 1].libelleEtat}"`);
      if(this.aPECVente[0].IMEIPECVente != this.ionicForm.value.imei) this.addHistorique(localStorage.getItem("idElement"),`L ancien IMEI "${this.aPECVente[0].IMEIPECVente}" est devenu "${this.ionicForm.value.imei}"`);

      fetch(`http://127.0.0.1:3000/ventespec/modify?id=${localStorage.getItem("idElement")}&etat=${this.ionicForm.value.etat}&prix=${this.prixTotal}&description=${this.ionicForm.value.description}&imei=${this.ionicForm.value.imei}&restant=${this.prixRestant}`); //Modification
    }
  }
  submitFormClient(){
    if(this.ionicForm.value.nom == "" || this.ionicForm.value.prenom == "" || this.ionicForm.value.tel == "" || this.ionicForm.value.codepostal == "" || this.ionicForm.value.ville == "" || this.ionicForm.value.mail == "") this.presentAlert("Veuillez remplir les champs obligatoires.", false)
    else
    {
      fetch(`http://localhost:3000/clients/modify?id=${this.idClient}&nom=${this.ionicFormClient.value.nom}&prenom=${this.ionicFormClient.value.prenom}&tel=${this.ionicFormClient.value.telephone}&adresse=${this.ionicFormClient.value.adresse}&codePostal=${this.ionicFormClient.value.codepostal}&ville=${this.ionicFormClient.value.ville}&dateDeNaissance=${this.ionicFormClient.value.datenaissance}&mail=${this.ionicFormClient.value.mail}`);
      this.presentAlert("Client modifié avec succès !", false);
    }
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
  getQuantites(){
    fetch(`http://127.0.0.1:3000/quantites?magasin=${this.ionicFormList.value.magasin}`) //récupération des comptes
    .then((resp) => resp.json())
    .then((data) => {this.allQuantites = data;
    })
    .catch(function(error) {
      console.log(error);
    });
  }
  getVentesPEC()
  {
    fetch(`http://127.0.0.1:3000/ventespec?id=${localStorage.getItem("idElement")}`) //récupération des comptes
    .then((resp) => resp.json())
    .then((data) => {
      this.aPECVente = data;
      this.getClient(data[0].client);
      this.prixTotal = data[0].prixTTCPECVente;
      this.prixRestant = data[0].prixTTCRestantPECVente;
      this.magasin = data[0].magasin;
      this.etatModify = data[0].etat;
      this.descriptionModify = data[0].descriptionPECVente;
      this.imeiModify = data[0].IMEIPECVente;
    })
    .catch(function(error) {
      console.log(error);
    });
  }
  getReglementsVentesPEC()
  {
    fetch(`http://127.0.0.1:3000/reglementspecventes?PECVente=${localStorage.getItem("idElement")}`) //récupération des comptes
    .then((resp) => resp.json())
    .then((data) => {
      this.allReglementsPECVentes = data;
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
  getArticlePECVentes()
  {
    fetch(`http://127.0.0.1:3000/articlespecventes`) //récupération des comptes
    .then((resp) => resp.json())
    .then((data) => {this.allArticles = data;
      data.forEach((e : any) => {
        if(localStorage.getItem("idElement") == e.PECVente) this.itemsInCart.push(e);
      });
    })
    .catch(function(error) {
      console.log(error);
    });
  }
  getAvoirs()
  {
    fetch(`http://127.0.0.1:3000/avoirs`) //récupération des comptes
    .then((resp) => resp.json())
    .then((data) => {this.allAvoirs = data;
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
  getEtats(){
    fetch(`http://127.0.0.1:3000/etats`) //récupération des comptes
    .then((resp) => resp.json())
    .then((data) => {this.allEtats = data;
    })
    .catch(function(error) {
      console.log(error);
    });
  }
  getHistoriques(){
    fetch(`http://127.0.0.1:3000/historiquespec?pec=${localStorage.getItem("idElement")}`) //récupération des comptes
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

  presentAlertDelete(id : any) {
    const alert = document.createElement('ion-alert');
    alert.header = 'CONFIRMATION',
    alert.message = "Etes-vous sur de vouloir supprimer ce paiement ?",
    alert.buttons = [{ text: 'Non',},
    {
      text: 'Oui',
      role: 'confirm',
      handler: () => {
        this.deleteReglements(id);
      }
    }];
    document.body.appendChild(alert);
    alert.present();
  }
  presentAlert(text : string, choix : boolean) { //0 = error / 1 = Ajout panier / 2 = Ajout client
    const alert = document.createElement('ion-alert');
    alert.header = 'INFORMATIONS';
    alert.message = text;
    if(!choix){
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
            this.router.navigate(['/vente-pec'], { replaceUrl: true });
          }
        }];
    }

    document.body.appendChild(alert);
    alert.present();
  }

  async deleteReglements(id : number){
    fetch(`http://127.0.0.1:3000/reglementspecventes?id=${id}`) //récupération des comptes
    .then((resp) => resp.json())
    .then((data) => {
      this.prixRestant += data[0].prixReglement;
      fetch(`http://127.0.0.1:3000/ventespec/modify?id=${localStorage.getItem("idElement")}&etat=${this.ionicForm.value.etat}&prix=${this.prixTotal}&description=${this.ionicForm.value.description}&imei=${this.ionicForm.value.imei}&restant=${this.prixRestant}`); //Modification
      this.addHistorique(localStorage.getItem("idElement"), `Un paiement de ${data[0].prixReglement}€ en ${data[0].libelleReglement} à été supprimer.`);
      fetch(`http://127.0.0.1:3000/reglementsventespec/delete?id=${id}`);
    })
    .catch(function(error) {
      console.log(error);
    });

    await this.delay();

    this.getReglementsVentesPEC();
    this.getHistoriques();
  }

  itemsInCart: Array<{  idStock: any, libelleStock: string, prixTTCStock: any, IMEIArticlePECVente: any,
                        idModele: any, libelleModele: any, prixVenteModele: any,
                        idPromotion: any, libellePromotion: any; prixPromotion: any}> = [];
  prixTotal: any = 0;
  prixRestant: any = 0;

  addVente(id : any, type : number){
    let leave = false;

    if(type == 3){
      this.itemsInCart.forEach((element : any) => {
        if(element.idPromotion != null) leave = true;
      });
    }

    if(leave) return;

    //1 == Stock
    //2 == Modele
    //3 == Promotion
    if(type == 1){
      const selectedItem = this.allStocks.find((p: any) => p.idStock === id);
      this.itemsInCart.push(selectedItem);
      this.prixTotal += selectedItem.prixTTCStock;
      this.prixRestant += selectedItem.prixTTCStock;
    }
    else if(type == 2){
      const selectedItem = this.allModeles.find((s: any) => s.idModele === id);
      this.itemsInCart.push(selectedItem);
      this.prixTotal += selectedItem.prixVenteModele;
      this.prixRestant += selectedItem.prixVenteModele;
    }
    else{
      const selectedItem = this.allPromotions.find((s: any) => s.idPromotion === id);
      this.itemsInCart.push(selectedItem);
      this.prixTotal += selectedItem.prixPromotion;
      this.prixRestant += selectedItem.prixPromotion;
    }
  }
  removeVente(index : any, type : number){
    if(type == 1){
      this.prixTotal -= this.itemsInCart[index].prixTTCStock;
      this.prixRestant -= this.itemsInCart[index].prixTTCStock;
    }
    else if(type == 2){
      this.prixTotal -= this.itemsInCart[index].prixVenteModele;
      this.prixRestant -= this.itemsInCart[index].prixVenteModele;
    }
    else{
      this.prixTotal -= this.itemsInCart[index].prixPromotion;
      this.prixRestant -= this.itemsInCart[index].prixPromotion;
    }
    this.itemsInCart.splice(index, 1);
  }
  async modifyVente(){
    if(this.itemsInCart.length == 0) this.presentAlert("Le panier ne peut pas etre vide", false);
    else {
      let id = localStorage.getItem("idElement");

      fetch(`http://127.0.0.1:3000/articlespecventes/delete?id=${id}`); //Articles

      this.itemsInCart.forEach(i => {
        console.log(i);
        if(i.IMEIArticlePECVente == undefined) i.IMEIArticlePECVente = "";
        if(i.idStock != null) fetch(`http://localhost:3000/articlespecventes/add?pecvente=${id}&stock=${i.idStock}&modele=&promotion=0&imei=${i.IMEIArticlePECVente}`);
        else if(i.idModele != null) fetch(`http://localhost:3000/articlespecventes/add?pecvente=${id}&stock=0&modele=${i.idModele}promotion=0&imei=${i.IMEIArticlePECVente}`);
        else fetch(`http://localhost:3000/articlespecventes/add?pecvente=${id}&stock=0&modele=&promotion=${i.idPromotion}&imei=`);
      });
      this.presentAlert("Réparation modifié !", true);

      await this.delay();

      this.getReglementsVentesPEC();
      this.getHistoriques();
    }
  }
  addHistorique(id : any, text : string){
    let date = new Date();
    let creationDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} - ${date.getHours()}h${date.getMinutes()}`;
    let acteur = this.nomC + " " + this.prenomC + " => ";
    fetch(`http://127.0.0.1:3000/historiquespec/add?pec=${id}&libelle=${acteur + text}&date=${creationDate}`); //Articles
  }
  changeReglement(){
    const prix = document.getElementById("prixInput") as HTMLInputElement;
    const code = document.getElementById("codeInput") as HTMLInputElement;

    if(this.ionicFormPaiement.value.reglement == "")
    {
      prix.style.visibility = "hidden";
      code.style.visibility = "hidden";
    }
    else if(this.ionicFormPaiement.value.reglement == "Avoir")
    {
      prix.style.visibility = "hidden";
      code.style.visibility = "visible";
    }
    else{
      prix.style.visibility = "visible";
      code.style.visibility = "hidden";
    }
  }
  delay(){
    return new Promise<number>(resolve => {
      setTimeout(() => {
          resolve(1);
      }, 200);
  });
  }
  saveIMEIArticle(item: any, imeiValue: string){
    this.itemsInCart.forEach(i => {
      if(i == item) item.IMEIArticlePECVente = imeiValue;
    });
  }
}
