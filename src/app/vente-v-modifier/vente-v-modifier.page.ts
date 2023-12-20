import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import  { FormGroup }  from "@angular/forms";
import  { FormBuilder }  from "@angular/forms";
import  { Validators }  from "@angular/forms";
@Component({
  selector: 'app-vente-v-modifier',
  templateUrl: './vente-v-modifier.page.html',
  styleUrls: ['./vente-v-modifier.page.scss'],
})
export class VenteVModifierPage implements OnInit {

  public ionicFormList: FormGroup;
  public ionicFormPaiement: FormGroup;

  constructor(private router: Router, public formBuilder: FormBuilder) {

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

  allReglementsVVentes? : any;
  allStocks ? : any;
  allQuantites ? : any;
  allMagasins ? : any;
  allArticles ? : any;
  allAvoirs ? : any;
  allPromotions ? : any;
  allModeles ? : any;
  magasin ? : any;

  ionViewWillEnter(){
    this.getInfoUser();
    this.getReglementsVentesV();
    this.getStocks();
    this.getQuantites();
    this.getMagasins();
    this.getArticleVVentes();
    this.getVentesV();
    this.changeReglement();
    this.getAvoirs();
    this.getPromotions();
    this.getModeles();
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

  submitFormPaiement()
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

            fetch(`http://localhost:3000/reglementsventev/add?id=${localStorage.getItem("idElement")}&reglement=${this.ionicFormPaiement.value.reglement}&prix=${this.allAvoirs[i].prixAvoir}&date=${creationDate}`);

            let total : number = this.allAvoirs[i].prixAvoir;
            this.allReglementsVVentes.forEach((r:any) => {
              total += r.prixReglement;
            });

            this.prixRestant -= total;
            if(this.prixRestant < 0) this.prixRestant = 0;
            fetch(`http://127.0.0.1:3000/ventesv/modify?id=${localStorage.getItem("idElement")}&prix=${this.prixTotal}&restant=${this.prixRestant}`); //Articles

            if(this.prixTotal <= total){
              let surPrix : number = total - this.prixTotal;
              fetch(`http://localhost:3000/avoirs/add?prix=${surPrix}`);
            }
          else this.presentAlert(`Paiement rajouté avec succès !`, true);
            fetch(`http://localhost:3000/avoirs/delete?id=${this.ionicFormPaiement.value.code}`);

            this.presentAlert("Paiement rajouté avec succès !", false);
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

          fetch(`http://localhost:3000/reglementsventev/add?id=${localStorage.getItem("idElement")}&reglement=${this.ionicFormPaiement.value.reglement}&prix=${this.ionicFormPaiement.value.prix}&date=${creationDate}`);

          let total : number = this.ionicFormPaiement.value.prix;
          this.allReglementsVVentes.forEach((r:any) => {
            total += r.prixReglement;
          });

          this.prixRestant -= total;
          if(this.prixRestant < 0) this.prixRestant = 0;
          fetch(`http://127.0.0.1:3000/ventesv/modify?id=${localStorage.getItem("idElement")}&prix=${this.prixTotal}&restant=${this.prixRestant}`); //Articles

          if(this.prixTotal <= total){
            let surPrix : number = total - this.prixTotal;
            this.presentAlert(`Paiement rajouté avec succès ! Rendu du paiement : ${surPrix}€`, true);

            if(surPrix > 0){
              fetch(`http://localhost:3000/reglementsventev/add?id=${localStorage.getItem("idElement")}&reglement=Rendu&prix=${surPrix}&date=${creationDate}`);
            }
          }
          else this.presentAlert(`Paiement rajouté avec succès !`, true);
        }
      }
      else{
        if(this.ionicFormPaiement.value.prix == "") this.presentAlert("Un prix est demandé", false);
        else{
          let date = new Date();
          let creationDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} - ${date.getHours()}h${date.getMinutes()}`;

          this.prixRestant -= this.ionicFormPaiement.value.prix;
          fetch(`http://127.0.0.1:3000/ventesv/modify?id=${localStorage.getItem("idElement")}&prix=${this.prixTotal}&restant=${this.prixRestant}`); //Articles

          fetch(`http://localhost:3000/reglementsventev/add?id=${localStorage.getItem("idElement")}&reglement=${this.ionicFormPaiement.value.reglement}&prix=${this.ionicFormPaiement.value.prix}&date=${creationDate}`);
          this.presentAlert("Paiement rajouté avec succès !", true);
        }
      }
    }
  }
  submitForm()
  {
    this.getStocks();
    this.getModeles();
    this.getPromotions();
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
  getVentesV()
  {
    fetch(`http://127.0.0.1:3000/ventesv?id=${localStorage.getItem("idElement")}`) //récupération des comptes
    .then((resp) => resp.json())
    .then((data) => {
      this.prixTotal = data[0].prixTTCVVente;
      this.prixRestant = data[0].prixTTCRestantVVente;
      this.magasin = data[0].magasin;
    })
    .catch(function(error) {
      console.log(error);
    });
  }
  getReglementsVentesV()
  {
    fetch(`http://127.0.0.1:3000/reglementsvventes?VVente=${localStorage.getItem("idElement")}`) //récupération des comptes
    .then((resp) => resp.json())
    .then((data) => {
      this.allReglementsVVentes = data;
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
  getArticleVVentes()
  {
    fetch(`http://127.0.0.1:3000/articlesvventes`) //récupération des comptes
    .then((resp) => resp.json())
    .then((data) => {this.allArticles = data;
      data.forEach((e : any) => {
        if(localStorage.getItem("idElement") == e.VVente) this.itemsInCart.push(e);
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

  presentAlert(text : string, choix : boolean) {
    const alert = document.createElement('ion-alert');
    alert.header = 'INFORMATIONS';
    alert.message = text;
    if(choix){
      alert.buttons = [
        {
          text: 'Retour aux ventes V',
          role: 'confirm',
          handler: () => {
            this.router.navigate(['vente-v'], { replaceUrl: true });
          }
        },
        {
          text: 'Continuer',
          role: 'confirm',
          handler: () => {
            this.getReglementsVentesV();
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

  async deleteReglements(id : number){
    fetch(`http://127.0.0.1:3000/reglementsvventes?id=${id}`) //récupération des comptes
    .then((resp) => resp.json())
    .then((data) => {
      this.prixRestant += data[0].prixReglement;
      fetch(`http://127.0.0.1:3000/ventesv/modify?id=${localStorage.getItem("idElement")}&prix=${this.prixTotal}&restant=${this.prixRestant}`); //Articles
      fetch(`http://127.0.0.1:3000/reglementsventesv/delete?id=${id}`);
    })
    .catch(function(error) {
      console.log(error);
    });

    await this.delay();

    this.getReglementsVentesV();
  }

  itemsInCart: Array<{  idStock: any, libelleStock: string, prixTTCStock: any, IMEIArticleVVente: string,
                        idModele: any, libelleModele: any, prixVenteModele: any, IMEIModele: string,
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
    if(type == 1)
    {
      this.prixTotal -= this.itemsInCart[index].prixTTCStock;
      this.prixRestant -= this.itemsInCart[index].prixTTCStock;
    }
    else if(type == 2)
    {
      this.prixTotal -= this.itemsInCart[index].prixVenteModele;
      this.prixRestant -= this.itemsInCart[index].prixVenteModele;
    }
    else
    {
      this.prixTotal -= this.itemsInCart[index].prixPromotion;
      this.prixRestant -= this.itemsInCart[index].prixPromotion;
    }
    this.itemsInCart.splice(index, 1);
  }

  async modifyVente(){
    if(this.itemsInCart.length == 0) this.presentAlert("Le panier ne peut pas etre vide", false);
    else {
      let id = localStorage.getItem("idElement");

      fetch(`http://127.0.0.1:3000/articlesvventes/delete?id=${id}`); //Articles

      this.itemsInCart.forEach(i => {
        console.log(i);
        if(i.IMEIArticleVVente == undefined) i.IMEIArticleVVente = "";
        if(i.idStock != null) fetch(`http://localhost:3000/articlesvventes/add?vvente=${id}&stock=${i.idStock}&modele=&promotion=0&imei=${i.IMEIArticleVVente}`);
        else if(i.idModele != null) fetch(`http://localhost:3000/articlesvventes/add?vvente=${id}&stock=0&modele=${i.idModele}promotion=0&imei=${i.IMEIArticleVVente}`);
        else fetch(`http://localhost:3000/articlesvventes/add?vvente=${id}&stock=0&modele=&promotion=${i.idPromotion}&imei=`);
      });
      this.presentAlert("Vente modifié !", true);

      await this.delay();
    }
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
      if(i == item) item.IMEIArticleVVente = imeiValue;
    });
  }
}
