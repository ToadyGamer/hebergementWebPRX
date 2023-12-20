import { Component, ViewChildren, OnInit, QueryList } from '@angular/core';
import { ChartConfiguration, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';
import { SavPage } from '../sav/sav.page';

@Component({
  selector: 'app-chiffre-affaire',
  templateUrl: './chiffre-affaire.page.html',
  styleUrls: ['./chiffre-affaire.page.scss'],
})

export class ChiffreAffairePage implements OnInit {
  // @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  @ViewChildren(BaseChartDirective) charts: QueryList<BaseChartDirective> | undefined;

  public barChartLegend = true;
  public barChartPlugins = [];


  constructor() {
    this.chiffreV = [0]
    this.chiffrePEC = [0]
    this.chiffreTotal = [0];

    this.bodyAvoir = [];
    this.bodyPaiements = [];
    this.bodySortie = [];
  }


  // public chartSemaine: ChartData<'bar'> = {
  //   labels: [ 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche' ],
  //   datasets: [
  //     { data: [0], label: '1', stack:'1', backgroundColor: "rgba(215, 0, 0, 1)"},
  //     { data: [0], label: '2', stack:'2', backgroundColor: "rgba(0, 215, 0, 1)" },
  //     { data: [0], label: '3', stack:'1', backgroundColor: "rgba(155, 0, 0, 1)" },
  //     { data: [0], label: '4', stack:'2', backgroundColor: "rgba(0, 155, 0, 1)" }
  //   ],
  // };
  public chartMois: ChartData<'bar'> = {
    labels: [ '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31' ],
    datasets: [
      { data: [0], label: '1', stack:'1', backgroundColor: "rgba(215, 0, 0, 1)"},
      { data: [0], label: '2', stack:'2', backgroundColor: "rgba(0, 215, 0, 1)" },
      { data: [0], label: '3', stack:'1', backgroundColor: "rgba(155, 0, 0, 1)" },
      { data: [0], label: '4', stack:'2', backgroundColor: "rgba(0, 155, 0, 1)" }
    ],
  };
  public chartAnnee: ChartData<'bar'> = {
    labels: [ 'Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre'],
    datasets: [
      { data: [0], label: '1', stack:'1', backgroundColor: "rgba(215, 0, 0, 1)"},
      { data: [0], label: '2', stack:'2', backgroundColor: "rgba(0, 215, 0, 1)" },
      { data: [0], label: '3', stack:'1', backgroundColor: "rgba(155, 0, 0, 1)" },
      { data: [0], label: '4', stack:'2', backgroundColor: "rgba(0, 155, 0, 1)" }
    ],
  };

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: false,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 0,
      },
    },
    plugins: {
      legend: {
        display: true,
      }
    },
  };

  ngOnInit() {  }

  allMagasins ? : any;
  allReglementsVentesPEC ? : any;
  allReglementsVentesV ? : any;
  allVentesPEC ? : any;
  allVentesV ? : any;

  chiffreV : number[];
  chiffrePEC : number[];
  chiffreTotal : number[];

  bodyAvoir : any[];
  bodyPaiements : any[];
  bodySortie : any[];

  nomC ? : string;
  prenomC ? : string;

  joursInput = "";
  moisInput = "";
  anneeInput = "";
  magasin = "";

  ionViewWillEnter(){

    this.getInfoUser();
    this.getMagasins();

    this.chiffreJour();

    this.getVentesPEC();
    this.getVentesV();
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
  getVentesPEC(){
    fetch(`http://127.0.0.1:3000/ventespec?magasin=&etat=&nomPrenom=&modele=`) //récupération des comptes
    .then((resp) => resp.json())
    .then((data) => {this.allVentesPEC = data;
    })
    .catch(function(error) {
      console.log(error);
    });
  }
  getVentesV()
  {
    fetch(`http://127.0.0.1:3000/ventesv?magasin=&etat=&nomPrenom=&stock=`) //récupération des comptes
    .then((resp) => resp.json())
    .then((data) => {this.allVentesV = data;
    })
    .catch(function(error) {
      console.log(error);
    });
  }
  getReglementsVentesPEC(date : string)
  {
    fetch(`http://127.0.0.1:3000/reglementspecventes?date=${date}`) //récupération des comptes
    .then((resp) => resp.json())
    .then((data) => {this.allReglementsVentesPEC = data;
    })
    .catch(function(error) {
      console.log(error);
    });
  }
  getReglementsVentesV(date : string)
  {
    fetch(`http://127.0.0.1:3000/reglementsvventes?date=${date}`) //récupération des comptes
    .then((resp) => resp.json())
    .then((data) => {this.allReglementsVentesV = data;
    })
    .catch(function(error) {
      console.log(error);
    });
  }

  ChiffreJourCalcule() {
    this.chiffreV = [0];
    this.chiffrePEC = [0];
    this.chiffreTotal = [0];

    for (let index = 0; index < this.allMagasins.length; index++) {
        this.chiffreV.push(0);
        this.chiffrePEC.push(0);
        this.chiffreTotal.push(0);
    }

    this.chiffreV.pop();
    this.chiffrePEC.pop();

    this.allReglementsVentesV.forEach((r:any) => {
      if(r.libelleReglement == "Rendu" || r.libelleReglement == "Nouvelle avoir") this.chiffreV[r.magasin - 1] -= r.prixReglement;
      else this.chiffreV[r.magasin - 1] += r.prixReglement;
    });

    this.allReglementsVentesPEC.forEach((r:any) => {
      if(r.libelleReglement == "Rendu" || r.libelleReglement == "Nouvelle avoir") this.chiffrePEC[r.magasin - 1] -= r.prixReglement;
      else this.chiffrePEC[r.magasin - 1] += r.prixReglement;
    });

    this.allMagasins.forEach((m:any) => {
        let id = m.idMagasin - 1;
        this.chiffreTotal[id] = this.chiffreV[id] + this.chiffrePEC[id];
    });
  }
  // ChiffreSemaineCalcule() {
  //   var now = new Date();
  //   let date1 = `${now.getDate() - now.getDay() + 1}/${now.getMonth() + 1}/${now.getFullYear()}`;
  //   let date2 =`${(7 - now.getDay()) + now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
  //   console.log(date1 + " - " + date2);
  // }
  ChiffreMoisCalcule() {
    for (let index = 0; index < this.allMagasins.length; index++) {
      this.chartMois.datasets[index].label = this.allMagasins[index].villeMagasin + " | Vente ";

      this.chiffreV = [];
      for (let i = 0; i < 31; i++) {
        this.chiffreV.push(0);
      }

      this.allReglementsVentesV.forEach((element:any) => {
        if(this.allMagasins[index].idMagasin == element.magasin){
          if(element.libelleReglement == "Rendu" || element.libelleReglement == "Nouvelle avoir") this.chiffreV[element.dateReglement.substring(0, 2) - 1] -= element.prixReglement;
          else this.chiffreV[element.dateReglement.substring(0, 2) - 1] += element.prixReglement;
        }
      });
      this.chartMois.datasets[index].data = this.chiffreV;
      this.charts?.forEach((child) => {
        child.chart?.update()
      });
    }

    for (let index = 0; index < this.allMagasins.length; index++) {
      let newIndex = index + this.allMagasins.length;
      this.chartMois.datasets[newIndex].label = this.allMagasins[index].villeMagasin + " | Prise en charge ";

      this.chiffrePEC = [];
      for (let i = 0; i < 31; i++) {
        this.chiffrePEC.push(0);
      }

      this.allReglementsVentesPEC.forEach((element:any) => {
        if(this.allMagasins[index].idMagasin == element.magasin){

          if(element.libelleReglement == "Rendu" || element.libelleReglement == "Nouvelle avoir") this.chiffrePEC[element.dateReglement.substring(0, 2) - 1] -= element.prixReglement;
          else this.chiffrePEC[element.dateReglement.substring(0, 2) - 1] += element.prixReglement;
        }
      });
      this.chartMois.datasets[newIndex].data = this.chiffrePEC;
      this.charts?.forEach((child) => {
        child.chart?.update()
      });
    }
  }
  ChiffreAnneeCalcule() {
    for (let index = 0; index < this.allMagasins.length; index++) {
      this.chartAnnee.datasets[index].label = this.allMagasins[index].villeMagasin + " | Vente ";

      this.chiffreV = [];
      for (let i = 0; i < 12; i++) {
        this.chiffreV.push(0);
      }

      this.allReglementsVentesV.forEach((element:any) => {
        if(this.allMagasins[index].idMagasin == element.magasin){
          if(element.libelleReglement == "Rendu" || element.libelleReglement == "Nouvelle avoir") this.chiffreV[element.dateReglement.substring(3, 5) - 1] -= element.prixReglement;
          else this.chiffreV[element.dateReglement.substring(3, 5) - 1] += element.prixReglement;
        }
      });
      this.chartAnnee.datasets[index].data = this.chiffreV;
      this.charts?.forEach((child) => {
        child.chart?.update()
      });
    }

    for (let index = 0; index < this.allMagasins.length; index++) {
      let newIndex = index + this.allMagasins.length;
      this.chartAnnee.datasets[newIndex].label = this.allMagasins[index].villeMagasin + " | Prise en charge ";

      this.chiffrePEC = [];
      for (let i = 0; i < 12; i++) {
        this.chiffrePEC.push(0);
      }

      console.log(this.allMagasins[index].villeMagasin);
      this.allReglementsVentesPEC.forEach((element:any) => {
        if(this.allMagasins[index].idMagasin == element.magasin){
          if(element.libelleReglement == "Rendu" || element.libelleReglement == "Nouvelle avoir") this.chiffrePEC[element.dateReglement.substring(3, 5) - 1] -= element.prixReglement;
          else this.chiffrePEC[element.dateReglement.substring(3, 5) - 1] += element.prixReglement;
        }
      });
      this.chartAnnee.datasets[newIndex].data = this.chiffrePEC;
      this.charts?.forEach((child) => {
        child.chart?.update()
      });
    }
  }

  delay(){
    return new Promise<number>(resolve => {
      setTimeout(() => {
          resolve(1);
      }, 200);
  });
  }

  async chiffreJour(){
    this.hide();
    let pageChiffreJour = document.getElementById("chiffreJour") as HTMLElement;
    pageChiffreJour.hidden = false;

    let date = new Date();
    this.getReglementsVentesV(`${date.getDate()}/${date.getUTCMonth() + 1}/${date.getFullYear()}`);
    this.getReglementsVentesPEC(`${date.getDate()}/${date.getUTCMonth() + 1}/${date.getFullYear()}`);

    await this.delay();

    this.ChiffreJourCalcule();
  }
  // async chiffreSemaine(){
  //   this.hide();
  //   let pageChiffreSemaine = document.getElementById("chiffreSemaine") as HTMLElement;
  //   pageChiffreSemaine.hidden = false;

  //   // this.getReglementsVentesV("31/10/2023");
  //   // this.getReglementsVentesPEC("31/10/2023");

  //   await this.delay();

  //   this.ChiffreSemaineCalcule();
  // }
  async chiffreMois(){
    this.hide();
    let pageChiffreMois = document.getElementById("chiffreMois") as HTMLElement;
    pageChiffreMois.hidden = false;

    let date = new Date();
    this.getReglementsVentesV(`__/${date.getUTCMonth() + 1}/${date.getFullYear()}`);
    this.getReglementsVentesPEC(`__/${date.getUTCMonth() + 1}/${date.getFullYear()}`);

    await this.delay();

    this.ChiffreMoisCalcule();
  }
  async chiffreAnnee(){
    this.hide();
    let pageChiffreAnnee = document.getElementById("chiffreAnnee") as HTMLElement;
    pageChiffreAnnee.hidden = false;

    let date = new Date();
    this.getReglementsVentesV(`__/__/${date.getFullYear()}`);
    this.getReglementsVentesPEC(`__/__/${date.getFullYear()}`);

    await this.delay();

    this.ChiffreAnneeCalcule();
  }
  hide(){
    let pageChiffreJour = document.getElementById("chiffreJour") as HTMLElement;
    pageChiffreJour.hidden = true;

    // let pageChiffreSemaine = document.getElementById("chiffreSemaine") as HTMLElement;
    // pageChiffreSemaine.hidden = true;

    let pageChiffreMois = document.getElementById("chiffreMois") as HTMLElement;
    pageChiffreMois.hidden = true;

    let pageChiffreAnnee = document.getElementById("chiffreAnnee") as HTMLElement;
    pageChiffreAnnee.hidden = true;
  }

  ReturnReference(id : number, pec : boolean){
    if(pec){
      for (let index = 0; index < this.allVentesPEC.length; index++) {
        if(this.allVentesPEC[index].idPECVente == id) return this.allVentesPEC[index].referencePECVente;
      }
    }
    else{
      for (let index = 0; index < this.allVentesV.length; index++) {
        if(this.allVentesV[index].idVente == id) return this.allVentesV[index].referenceVVente;
      }
    }
    return;
  }

  async ZCaisse(idMagasin : number){
    this.bodyAvoir = [];
    this.bodyPaiements = [];

    let date = new Date();
    this.getReglementsVentesV(`${date.getDate()}/${date.getUTCMonth() + 1}/${date.getFullYear()}`);
    this.getReglementsVentesPEC(`${date.getDate()}/${date.getUTCMonth() + 1}/${date.getFullYear()}`);

    await this.delay();

    let doc = new jsPDF('p', 'mm', [297, 210]);
    doc.addImage('../assets/icon/logo.png', 14, 14, 30, 30);
    doc.setFontSize(10);
    doc.text("Phone Relax", 14, 50);
    doc.text(this.allMagasins[idMagasin - 1].adresseMagasin, 14, 54);
    doc.text(this.allMagasins[idMagasin - 1].codePostalMagasin + " " + this.allMagasins[idMagasin - 1].villeMagasin, 14, 58);
    doc.text("Téléphone : " + this.allMagasins[idMagasin - 1].telephoneMagasin, 14, 62);
    doc.text("Siret : 90831058400010", 14, 66);
    doc.text("Numéro TVA INTRA Intracom : FR04908310584", 14, 70);

    let prixCarte = 0;
    let prixEspece = 0;
    let prixPlusieursTrois = 0;
    let prixPlusieursQuatre = 0;
    let prixCheque = 0;
    let prixAvoir = 0;

    let prixNouvelleAvoir = 0;
    let prixRendu = 0;

    this.allReglementsVentesPEC.forEach((r:any) => {
      if(r.magasin == idMagasin){
        if(r.libelleReglement == "Avoir"){
          this.bodyAvoir.push([this.ReturnReference(r.PECVente, true), "", r.libelleReglement, r.prixReglement + "€", r.dateReglement]);
          prixAvoir += r.prixReglement;
        }
        else if (r.libelleReglement != "Avoir" && r.libelleReglement != "Nouvelle avoir" && r.libelleReglement != "Rendu"){
          this.bodyPaiements.push([this.ReturnReference(r.PECVente, true), "", r.libelleReglement, r.prixReglement + "€", r.dateReglement]);
          if(r.libelleReglement == "Carte") prixCarte += r.prixReglement;
          else if(r.libelleReglement == "Espèce") prixEspece += r.prixReglement;
          else if(r.libelleReglement == "Paiement en 3 fois") prixPlusieursTrois += r.prixReglement;
          else if(r.libelleReglement == "Paiement en 3 fois") prixPlusieursQuatre += r.prixReglement;
          else if(r.libelleReglement == "Chèque") prixCheque += r.prixReglement;
        }
        else{
          this.bodySortie.push([this.ReturnReference(r.PECVente, true), "", r.libelleReglement, r.prixReglement + "€", r.dateReglement]);
          if(r.libelleReglement == "Nouvelle avoir") prixNouvelleAvoir += r.prixReglement;
          if(r.libelleReglement == "Rendu") prixRendu += r.prixReglement;
        }
      }
    });
    this.allReglementsVentesV.forEach((r:any) => {
      if(r.magasin == idMagasin){
        if(r.libelleReglement == "Avoir"){
          this.bodyAvoir.push([this.ReturnReference(r.VVente, false), "", r.libelleReglement, r.prixReglement + "€", r.dateReglement]);
          prixAvoir += r.prixReglement;
        }
        else if (r.libelleReglement != "Avoir" && r.libelleReglement != "Nouvelle avoir" && r.libelleReglement != "Rendu"){
          this.bodyPaiements.push([this.ReturnReference(r.VVente, false), "", r.libelleReglement, r.prixReglement + "€", r.dateReglement]);
          if(r.libelleReglement == "Carte") prixCarte += r.prixReglement;
          else if(r.libelleReglement == "Espèce") prixEspece += r.prixReglement;
          else if(r.libelleReglement == "Paiement en 3 fois") prixPlusieursTrois += r.prixReglement;
          else if(r.libelleReglement == "Paiement en 3 fois") prixPlusieursQuatre += r.prixReglement;
          else if(r.libelleReglement == "Chèque") prixCheque += r.prixReglement;
        }
        else{
          this.bodySortie.push([this.ReturnReference(r.VVente, true), "", r.libelleReglement, r.prixReglement + "€", r.dateReglement]);
          if(r.libelleReglement == "Nouvelle avoir") prixNouvelleAvoir += r.prixReglement;
          if(r.libelleReglement == "Rendu") prixRendu += r.prixReglement;
        }
      }
    });

    if(this.bodyAvoir.length != 0){
      this.bodyAvoir.push(["","","Total Avoir",prixAvoir + "€",""]);

      autoTable(doc, {
        margin:{top:75},
        headStyles: { fillColor: [100, 100, 100] },
        styles: { fillColor: [200, 200, 200] },
        alternateRowStyles: { fillColor: [250, 250, 250] },
        body: this.bodyAvoir,
        columns: [
          { header: 'Référence', dataKey: 'reference' },
          { header: 'Référence Facture', dataKey: 'referencefacture' },
          { header: 'Type de paiement', dataKey: 'typepaiement' },
          { header: 'Paiement', dataKey: 'paiement' },
          { header: 'Date', dataKey: 'date' },
        ],
      })
    }

    if(this.bodyPaiements.length != 0){
      if(prixCarte != 0) this.bodyPaiements.push(["","","Total Carte",prixCarte + "€",""]);
      if(prixEspece != 0) this.bodyPaiements.push(["","","Total Espece",prixEspece + "€",""]);
      if(prixPlusieursTrois != 0) this.bodyPaiements.push(["","","Total Paiement 3 fois",prixPlusieursTrois + "€",""]);
      if(prixPlusieursQuatre != 0) this.bodyPaiements.push(["","","Total Paiement 4 fois",prixPlusieursQuatre + "€",""]);
      if(prixCheque != 0) this.bodyPaiements.push(["","","Total Chèque",prixCheque + "€",""]);

      autoTable(doc, {
        margin:{top:80},
        headStyles: { fillColor: [100, 100, 100] },
        styles: { fillColor: [200, 200, 200] },
        alternateRowStyles: { fillColor: [250, 250, 250] },
        body: this.bodyPaiements,
        columns: [
          { header: 'Référence', dataKey: 'reference' },
          { header: 'Référence Facture', dataKey: 'referencefacture' },
          { header: 'Type de paiement', dataKey: 'typepaiement' },
          { header: 'Paiement', dataKey: 'paiement' },
          { header: 'Date', dataKey: 'date' },
        ],
      })
    }

    if(this.bodySortie.length != 0){
      if(prixNouvelleAvoir != 0) this.bodySortie.push(["","","Total Nouvelle avoir",prixNouvelleAvoir + "€",""]);
      if(prixRendu != 0) this.bodySortie.push(["","","Total Rendu en espèce",prixRendu + "€",""]);

      autoTable(doc, {
        margin:{top:80},
        headStyles: { fillColor: [100, 100, 100] },
        styles: { fillColor: [200, 200, 200] },
        alternateRowStyles: { fillColor: [250, 250, 250] },
        body: this.bodySortie,
        columns: [
          { header: 'Référence', dataKey: 'reference' },
          { header: 'Référence Facture', dataKey: 'referencefacture' },
          { header: 'Type de paiement', dataKey: 'typepaiement' },
          { header: 'Paiement', dataKey: 'paiement' },
          { header: 'Date', dataKey: 'date' },
        ],
      })
    }

    doc.output('pdfobjectnewwindow');
  }

  export(){
    let exportdata = document.getElementById("export") as HTMLElement;
    exportdata.hidden = exportdata.checkVisibility();
  }
  async exportData(){
    if(this.magasin == ""){
      alert("Veuillez selectionner un magasin.");
      return;
    }
    if(this.joursInput == "") this.joursInput = "__";
    if(this.moisInput == "") this.moisInput = "__";
    if(this.anneeInput == "") this.anneeInput = "____";

    this.bodyAvoir = [];
    this.bodyPaiements = [];
    this.bodySortie = [];

    this.getReglementsVentesV(`${this.joursInput}/${this.moisInput}/${this.anneeInput}`);
    this.getReglementsVentesPEC(`${this.joursInput}/${this.moisInput}/${this.anneeInput}`);

    await this.delay();

    let doc = new jsPDF('p', 'mm', [297, 210]);
    doc.addImage('../assets/icon/logo.png', 14, 14, 30, 30);
    doc.setFontSize(10);
    doc.text("Phone Relax", 14, 50);
    doc.text(this.allMagasins[parseInt(this.magasin) - 1].adresseMagasin, 14, 54);
    doc.text(this.allMagasins[parseInt(this.magasin) - 1].codePostalMagasin + " " + this.allMagasins[parseInt(this.magasin) - 1].villeMagasin, 14, 58);
    doc.text("Téléphone : " + this.allMagasins[parseInt(this.magasin) - 1].telephoneMagasin, 14, 62);
    doc.text("Siret : 90831058400010", 14, 66);
    doc.text("Numéro TVA INTRA Intracom : FR04908310584", 14, 70);

    let prixCarte = 0;
    let prixEspece = 0;
    let prixPlusieursTrois = 0;
    let prixPlusieursQuatre = 0;
    let prixCheque = 0;
    let prixAvoir = 0;

    let prixNouvelleAvoir = 0;
    let prixRendu = 0;

    this.allReglementsVentesPEC.forEach((r:any) => {
      if(r.magasin == this.magasin){
        if(r.libelleReglement == "Avoir"){
          this.bodyAvoir.push([this.ReturnReference(r.PECVente, true), "", r.libelleReglement, r.prixReglement + "€", r.dateReglement]);
          prixAvoir += r.prixReglement;
        }
        else if (r.libelleReglement != "Avoir" && r.libelleReglement != "Nouvelle avoir" && r.libelleReglement != "Rendu"){
          this.bodyPaiements.push([this.ReturnReference(r.PECVente, true), "", r.libelleReglement, r.prixReglement + "€", r.dateReglement]);
          if(r.libelleReglement == "Carte") prixCarte += r.prixReglement;
          else if(r.libelleReglement == "Espèce") prixEspece += r.prixReglement;
          else if(r.libelleReglement == "Paiement en 3 fois") prixPlusieursTrois += r.prixReglement;
          else if(r.libelleReglement == "Paiement en 3 fois") prixPlusieursQuatre += r.prixReglement;
          else if(r.libelleReglement == "Chèque") prixCheque += r.prixReglement;
        }
        else{
          this.bodySortie.push([this.ReturnReference(r.PECVente, true), "", r.libelleReglement, r.prixReglement + "€", r.dateReglement]);
          if(r.libelleReglement == "Nouvelle avoir") prixNouvelleAvoir += r.prixReglement;
          if(r.libelleReglement == "Rendu") prixRendu += r.prixReglement;
        }
      }
    });
    this.allReglementsVentesV.forEach((r:any) => {
      if(r.magasin == this.magasin){
        if(r.libelleReglement == "Avoir"){
          this.bodyAvoir.push([this.ReturnReference(r.VVente, false), "", r.libelleReglement, r.prixReglement + "€", r.dateReglement]);
          prixAvoir += r.prixReglement;
        }
        else if (r.libelleReglement != "Avoir" && r.libelleReglement != "Nouvelle avoir" && r.libelleReglement != "Rendu"){
          this.bodyPaiements.push([this.ReturnReference(r.VVente, false), "", r.libelleReglement, r.prixReglement + "€", r.dateReglement]);
          if(r.libelleReglement == "Carte") prixCarte += r.prixReglement;
          else if(r.libelleReglement == "Espèce") prixEspece += r.prixReglement;
          else if(r.libelleReglement == "Paiement en 3 fois") prixPlusieursTrois += r.prixReglement;
          else if(r.libelleReglement == "Paiement en 3 fois") prixPlusieursQuatre += r.prixReglement;
          else if(r.libelleReglement == "Chèque") prixCheque += r.prixReglement;
        }
        else{
          this.bodySortie.push([this.ReturnReference(r.VVente, true), "", r.libelleReglement, r.prixReglement + "€", r.dateReglement]);
          if(r.libelleReglement == "Nouvelle avoir") prixNouvelleAvoir += r.prixReglement;
          if(r.libelleReglement == "Rendu") prixRendu += r.prixReglement;
        }
      }
    });

    if(this.bodyAvoir.length != 0){
      this.bodyAvoir.push(["","","Total Avoir",prixAvoir + "€",""]);

      autoTable(doc, {
        margin:{top:75},
        headStyles: { fillColor: [100, 100, 100] },
        styles: { fillColor: [200, 200, 200] },
        alternateRowStyles: { fillColor: [250, 250, 250] },
        body: this.bodyAvoir,
        columns: [
          { header: 'Référence', dataKey: 'reference' },
          { header: 'Référence Facture', dataKey: 'referencefacture' },
          { header: 'Type de paiement', dataKey: 'typepaiement' },
          { header: 'Paiement', dataKey: 'paiement' },
          { header: 'Date', dataKey: 'date' },
        ],
      })
    }

    if(this.bodyPaiements.length != 0){
      if(prixCarte != 0) this.bodyPaiements.push(["","","Total Carte",prixCarte + "€",""]);
      if(prixEspece != 0) this.bodyPaiements.push(["","","Total Espece",prixEspece + "€",""]);
      if(prixPlusieursTrois != 0) this.bodyPaiements.push(["","","Total Paiement 3 fois",prixPlusieursTrois + "€",""]);
      if(prixPlusieursQuatre != 0) this.bodyPaiements.push(["","","Total Paiement 4 fois",prixPlusieursQuatre + "€",""]);
      if(prixCheque != 0) this.bodyPaiements.push(["","","Total Chèque",prixCheque + "€",""]);

      autoTable(doc, {
        margin:{top:80},
        headStyles: { fillColor: [100, 100, 100] },
        styles: { fillColor: [200, 200, 200] },
        alternateRowStyles: { fillColor: [250, 250, 250] },
        body: this.bodyPaiements,
        columns: [
          { header: 'Référence', dataKey: 'reference' },
          { header: 'Référence Facture', dataKey: 'referencefacture' },
          { header: 'Type de paiement', dataKey: 'typepaiement' },
          { header: 'Paiement', dataKey: 'paiement' },
          { header: 'Date', dataKey: 'date' },
        ],
      })
    }

    if(this.bodySortie.length != 0){
      if(prixNouvelleAvoir != 0) this.bodySortie.push(["","","Total Nouvelle avoir",prixNouvelleAvoir + "€",""]);
      if(prixRendu != 0) this.bodySortie.push(["","","Total Rendu en espèce",prixRendu + "€",""]);

      autoTable(doc, {
        margin:{top:80},
        headStyles: { fillColor: [100, 100, 100] },
        styles: { fillColor: [200, 200, 200] },
        alternateRowStyles: { fillColor: [250, 250, 250] },
        body: this.bodySortie,
        columns: [
          { header: 'Référence', dataKey: 'reference' },
          { header: 'Référence Facture', dataKey: 'referencefacture' },
          { header: 'Type de paiement', dataKey: 'typepaiement' },
          { header: 'Paiement', dataKey: 'paiement' },
          { header: 'Date', dataKey: 'date' },
        ],
      })
    }

    doc.output('pdfobjectnewwindow');
  }

  async exportDataExel(){

    console.log(this.allVentesPEC);
  }
}
