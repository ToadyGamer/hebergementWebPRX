import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import  { FormGroup }  from "@angular/forms";
import  { FormBuilder }  from "@angular/forms";
import  { Validators }  from "@angular/forms";

import { jsPDF } from "jspdf";
@Component({
  selector: 'app-factures',
  templateUrl: './factures.page.html',
  styleUrls: ['./factures.page.scss'],
})
export class FacturesPage implements OnInit {

  public ionicForm: FormGroup;

  constructor(private router: Router, public formBuilder: FormBuilder) {
    this.ionicForm = this.formBuilder.group({
      reference:['',Validators.compose([])],
      client:['',Validators.compose([])],
      date:['',Validators.compose([])]
    });
  }

  async ngOnInit()
  {

  }

  allFactures? : any;
  allEtats? : any;
  allReglementsVentesPEC? : any;
  allReglementsVentesPECBis? : any;
  allReglementsVentesV? : any;
  allReglementsVentesVBis? : any;
  allArticlesVentesPEC? : any;
  allArticlesVentesPECBis? : any;
  allArticlesVentesV? : any;
  allArticlesVentesVBis? : any;
  allMagasins? : any;
  allClients ? : any;

  nomC? : string;
  prenomC? : string;

  ionViewWillEnter()
  {
    this.getInfoUser();
    this.getEtats();
    this.getReglementsVentesPEC(0);
    this.getReglementsVentesV(0);
    this.getArticlesVentesPEC(0);
    this.getArticlesVentesV(0);
    this.getMagasins();
    this.getClients();

    this.getFactures();
  }

  submitForm()
  {
    this.getFactures();
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

  getFactures()
  {
    fetch(`http://127.0.0.1:3000/factures?reference=${this.ionicForm.value.reference}&client=${this.ionicForm.value.client}&date=${this.ionicForm.value.date}`) //récupération des comptes
    .then((resp) => resp.json())
    .then((data) => {this.allFactures = data; console.log(data);
    })
    .catch(function(error) {
      console.log(error);
    });
  }
  getEtats()
  {
    fetch(`http://127.0.0.1:3000/etats`) //récupération des comptes
    .then((resp) => resp.json())
    .then((data) => {this.allEtats = data;
    })
    .catch(function(error) {
      console.log(error);
    });
  }
  getReglementsVentesPEC(id : any)
  {
    let text = `http://127.0.0.1:3000/reglementspecventes`;
    if(id != 0) text = `http://127.0.0.1:3000/reglementspecventes?PECVente=${id}`;
    fetch(text) //récupération des comptes
    .then((resp) => resp.json())
    .then((data) => {
      if(id != 0 ) this.allReglementsVentesPECBis = data;
      else this.allReglementsVentesPEC = data;
    })
    .catch(function(error) {
      console.log(error);
    });
  }
  getReglementsVentesV(id : any)
  {
    let text = `http://127.0.0.1:3000/reglementsvventes`;
    if(id != 0) text = `http://127.0.0.1:3000/reglementsvventes?VVente=${id}`;
    fetch(text) //récupération des comptes
    .then((resp) => resp.json())
    .then((data) => {
      if(id != 0 ) this.allReglementsVentesVBis = data;
      else this.allReglementsVentesV = data;
    })
    .catch(function(error) {
      console.log(error);
    });
  }
  getArticlesVentesPEC(id : any)
  {
    let text = `http://127.0.0.1:3000/articlespecventes`;
    if(id != 0) text = `http://127.0.0.1:3000/articlespecventes?id=${id}`;
    fetch(text) //récupération des comptes
    .then((resp) => resp.json())
    .then((data) => {
      if(id != 0 ) this.allArticlesVentesPECBis = data;
      else this.allArticlesVentesPEC = data;
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
    .then((data) => {this.allMagasins = data;
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

  presentAlertDelete(id : any) {
    let trouver : boolean;
    trouver = false;
    let i : any;
    i = 0;
    let stock : any;

    while(i < this.allFactures.length && !trouver){
      if(this.allFactures[i].idFacture == id){
        trouver = true;

        stock = i;
      }
      else i++;
    }

    const alert = document.createElement('ion-alert');
    alert.header = 'CONFIRMATION',
    alert.message = "Etes-vous sur de vouloir supprimer la facture n° " + this.allFactures[stock].referenceFacture + " des factures ?",
    alert.buttons = [{ text: 'Non',},
    {
      text: 'Oui',
      role: 'confirm',
      handler: () => {
        fetch(`http://127.0.0.1:3000/factures/delete?id=${id}`);
        window.location.reload();
      }
    }];

    document.body.appendChild(alert);
    alert.present();
  }

  async createFacture(idMagasin : number, facture : string, date : string, client : number, id : number, restant : number, pec : boolean){
    if(pec){
      this.getArticlesVentesPEC(id);
      this.getReglementsVentesPEC(id);
    }
    else{
      this.getArticlesVentesV(id);
      this.getReglementsVentesV(id);
    }

    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(1);
      }, 300);
    });

    let doc = new jsPDF('p', 'mm', [297, 210]);

    let theClient = this.allClients[0];
    this.allClients.forEach((c:any) => {
      if(c.idClient == client) theClient=c;
    });

    //#region Entête
    doc.addImage('../assets/icon/logo.png', 14, 14, 30, 30);
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text("Phone Relax", 196, 16, { align: 'right'});
    doc.text(this.allMagasins[idMagasin - 1].adresseMagasin, 196, 20, { align: 'right'});
    doc.text(this.allMagasins[idMagasin - 1].codePostalMagasin + " " + this.allMagasins[idMagasin - 1].villeMagasin, 196, 24, { align: 'right'});
    doc.text("Téléphone : " + this.allMagasins[idMagasin - 1].telephoneMagasin, 196, 28, { align: 'right'});
    doc.text("Siret : 90831058400010", 196, 32, { align: 'right'});
    doc.text("Numéro TVA INTRA Intracom : FR04908310584", 196, 36, { align: 'right'});
    //#endregion

    //#region Début
    doc.setFontSize(20);
    doc.setFont("","bold");
    doc.setTextColor(255, 100, 100);
    doc.text("FACTURE", 105, 60, { align: 'center'});
    doc.setTextColor(0, 0, 0);
    //#endregion

    //#region Info client
    doc.setFontSize(10);
    doc.text("Destinataire",13,70);
    doc.text("Facture : ",70,74);
    doc.text("Date : ",70,78);
    doc.setFont("","normal");
    doc.text(theClient.nomClient + " " + theClient.prenomClient,13,74);
    doc.text(theClient.telClient,13,78);
    doc.text(theClient.codePostalClient + " " + theClient.villeClient,13,82);
    doc.text(facture,85,74);
    doc.text(date,80,78);
    //#endregion

    //#region Articles
    doc.setFont("","bold");
    doc.setLineWidth(0.5);
    doc.line(13, 90, 197, 90);
    doc.text("Description",13,95);
    doc.text("Quantité",138,95);
    doc.text("Prix Unit. HT",155,95);
    doc.text("Prix TTC",180,95);
    doc.line(13, 98, 197, 98);
    doc.setFont("","normal");

    let totalHT = 0;
    let totalTVA = 0;
    let total = 0;

    //Liste des articles
    doc.setFontSize(8);
    doc.setLineWidth(0.2);
    let position = 103;
    if(pec){
      this.allArticlesVentesPECBis.forEach((a:any) => {
        if(a.libelleStock != null)
        {
          doc.text(a.libelleStock + " " + a.EANStock,13,position);
          doc.text(a.prixUnitaireHorsTaxeStock.toString().substring(0,6) + "€",155,position);
          doc.text(a.prixTTCStock + "€",180,position);
          totalHT += parseFloat(a.prixUnitaireHorsTaxeStock.toString().substring(0,6));
          total += a.prixTTCStock;
        }
        else if(a.libelleModele != null) {
          let prixHT = a.prixVenteModele / 1.2;
          prixHT = parseFloat(prixHT.toString().substring(0,6));
          doc.text(a.libelleModele + " " + a.IMEIArticlePECVente,13,position);
          doc.text(prixHT.toString().substring(0,6) + "€",155,position);
          doc.text(a.prixVenteModele + "€",180,position);
          totalTVA += prixHT;
          total += a.prixVenteModele;
        }
        else{
          doc.text(a.libellePromotion,13,position);
          doc.text("N/A",155,position);
          doc.text(a.prixPromotion + "€",180,position);
          total += a.prixPromotion;
        }
        doc.text("1",138,position);
        doc.line(13, position + 3, 197, position + 3);
        position += 8;
      });
    }
    else{
    this.allArticlesVentesVBis.forEach((a:any) => {
      if(a.libelleStock != null)
      {
        doc.text(a.libelleStock + " " + a.EANStock,13,position);
        doc.text(a.prixTTCStock + "€",180,position);
        if(a.rachat){
          //TODO
          let prixHT = (a.prixTTCStock - a.prixUnitaireStock) / 1.2;
          doc.text(prixHT.toString().substring(0,6) + "€",155,position);
          totalHT += parseFloat(prixHT.toString().substring(0,6));
        }
        else{
          doc.text(a.prixUnitaireHorsTaxeStock.toString().substring(0,6) + "€",155,position);
          totalHT += parseFloat(a.prixUnitaireHorsTaxeStock.toString().substring(0,6));
        }
        total += a.prixTTCStock;
      }
      else if(a.libelleModele != null) {
        let prixHT = a.prixVenteModele / 1.2;
        prixHT = parseFloat(prixHT.toString().substring(0,6));
        doc.text(a.libelleModele + " " + a.IMEIArticlePECVente,13,position);
        doc.text(prixHT.toString().substring(0,6) + "€",155,position);
        doc.text(a.prixVenteModele + "€",180,position);
        totalTVA += prixHT;
        total += a.prixVenteModele;
      }
      else{
        doc.text(a.libellePromotion,13,position);
        doc.text("N/A",155,position);
        doc.text(a.prixPromotion + "€",180,position);
        total += a.prixPromotion;
      }
      doc.text("1",138,position);
      doc.line(13, position + 3, 197, position + 3);
      position += 8;
    });
    }

    doc.text("Total HT", 176, position, { align: 'right'});
    doc.text(totalHT + "€",180,position);
    doc.line(13, position + 3, 197, position + 3);
    position += 8;
    doc.text("Total TVA sur marge", 176, position, { align: 'right'});
    doc.text(totalTVA + "€",180,position);
    doc.line(13, position + 3, 197, position + 3);
    position += 8;
    doc.text("Total", 176, position, { align: 'right'});
    doc.text(total + "€",180,position);
    doc.line(13, position + 3, 197, position + 3);
    position += 8;

    //Liste des paiements
    if(pec){
      this.allReglementsVentesPECBis.forEach((r:any) => {
        doc.text("Paiement le " + r.dateReglement + ` (${r.libelleReglement})`, 176, position, { align: 'right'});
        doc.text(r.prixReglement + "€",179,position);
        doc.line(13, position + 3, 197, position + 3);
        position+= 8;
      });
    }
    else{
      this.allReglementsVentesVBis.forEach((r:any) => {
        doc.text("Paiement le " + r.dateReglement + ` (${r.libelleReglement})`, 176, position, { align: 'right'});
        doc.text(r.prixReglement + "€",179,position);
        doc.line(13, position + 3, 197, position + 3);
        position+= 8;
      });
    }

    doc.text("Total à régler", 176, position, { align: 'right'});
    doc.text(restant + "€",179,position);
    doc.line(13, position + 3, 197, position + 3);
    //#endregion

    //#region Conditions
    doc.setDrawColor(0);
    doc.setFillColor(245, 245, 245);
    doc.rect(10, 262, 190, 25, "F");
    doc.setFontSize(7);
    doc.text("Nos réparations sont garanties ?????. Cette garantie ne couvrira en aucun cas les dégâts causés par le client (Casse, choc, pressions, oxydation).",13,266);
    doc.text("Les retours concernant les accessoires seront acceptés sous une semaine.", 13, 269);
    doc.text("Nos batteries sont garanties ???, un appareil ouvert perd sa garantie et son étanchéité. Phone relax se réserve le droit de priviliégier les avoirs.", 13, 272);
    doc.text("Nos devis sont valable 1 mois. Nous nous réservons le doit de recycler au delà de 6 mois.", 13, 275);
    doc.text("Merci pour votre confiance.",13,282);
    doc.text("Phone Relax",13,285);
    //#endregion

    doc.output('pdfobjectnewwindow');
  }
}
