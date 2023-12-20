import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import  { FormGroup }  from "@angular/forms";
import  { FormBuilder }  from "@angular/forms";
import  { Validators }  from "@angular/forms";

import { jsPDF } from "jspdf";
@Component({
  selector: 'app-tableau-de-bord',
  templateUrl: './tableau-de-bord.page.html',
  styleUrls: ['./tableau-de-bord.page.scss'],
})
export class TableauDeBordPage implements OnInit {

    public ionicForm: FormGroup;
    public ionicFormSAVV: FormGroup;
    public ionicFormSAVPEC: FormGroup;

    constructor(private router: Router, public formBuilder: FormBuilder) {
      this.ionicForm = this.formBuilder.group({
        nomPrenom:['',Validators.compose([])],
        magasin:['',Validators.compose([])],
        etat:['',Validators.compose([])],
        reference:['',Validators.compose([])],
        stockmodele:['',Validators.compose([])]
      });

      this.ionicFormSAVV = this.formBuilder.group({
        description:['',Validators.compose([Validators.required])],
        dossierChaud:['',Validators.compose([Validators.required])],
        magasin:['',Validators.compose([Validators.required])],
        code:['',Validators.compose([Validators.required])],
      });
      this.ionicFormSAVPEC = this.formBuilder.group({
        description:['',Validators.compose([Validators.required])],
        dossierChaud:['',Validators.compose([Validators.required])],
        magasin:['',Validators.compose([Validators.required])]
      });
    }

    async ngOnInit()
    {

    }

    allStocks ? : any;
    allPromotions ? : any;
    allVentesV? : any;
    allVentesPEC? : any;
    allMagasins ? : any;
    allEtats ? : any;
    allModeles ? : any;
    allClients ? : any;
    allReglementsVentesPEC ? : any;
    allReglementsVentesV ? : any;
    allArticlesVentesV ? : any;
    allArticlesVentesVBis ? : any;
    allArticlesVentesPEC ? : any;
    allArticlesVentesPECBis ? : any;
    allGaranties ? : any;
    allSAV ? : any;
    allArticlesSAV ? : any;
    allArticlesSAVBis ? : any;
    allFactures ? : any;
    allFacturesBis ? : any;

    nomC? : string;
    prenomC? : string;
    recherche = "";

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
    commande ? : any;
    restant ? : any;

    ionViewWillEnter()
    {
      this.getInfoUser();
      this.getMagasins();
      this.getEtats();
      this.getClients();
      this.getArticlesVentesV(0);
      this.getArticlesVentesPEC(0);
      this.getStocks();
      this.getModeles();
      this.getPromotions();
      this.getGaranties();
      this.getArticlesSAV(0);

      this.getVentesV("");
      this.getVentesPEC("");
      this.getFactures("");
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
      this.getVentesV("");
      this.getVentesPEC("");
      this.getSAV("");
      this.getFactures("");
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
      fetch(`http://127.0.0.1:3000/stocks?libelle`) //récupération des comptes
      .then((resp) => resp.json())
      .then((data) => {this.allStocks = data;
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
    getPromotions(){
      fetch(`http://127.0.0.1:3000/promotions?libelle=`) //récupération des comptes
      .then((resp) => resp.json())
      .then((data) => { this.allPromotions = data;
      })
      .catch(function(error) {
        console.log(error);
      });
    }
    getVentesV(reference : string)
    {
      if(reference == ""){
        fetch(`http://127.0.0.1:3000/ventesv?magasin=${this.ionicForm.value.magasin}&etat=${this.ionicForm.value.etat}&nomPrenom=${this.ionicForm.value.nomPrenom}&stock=${this.ionicForm.value.stockmodele}`) //récupération des comptes
        .then((resp) => resp.json())
        .then((data) => {this.allVentesV = data;
        })
        .catch(function(error) {
          console.log(error);
        });
      }
      else{
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
    }
    getVentesPEC(reference : string)
    {
      if(reference == ""){
        fetch(`http://127.0.0.1:3000/ventespec?magasin=${this.ionicForm.value.magasin}&etat=${this.ionicForm.value.etat}&nomPrenom=${this.ionicForm.value.nomPrenom}&modele=${this.ionicForm.value.stockmodele}`) //récupération des comptes
        .then((resp) => resp.json())
        .then((data) => {this.allVentesPEC = data;
        })
        .catch(function(error) {
          console.log(error);
        });
      }
      else{
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
    }
    getSAV(reference : string)
    {
      if(reference == ""){
        let i = 0;
        let trouver = false;
        while(i < this.allClients.length && !trouver){
          if(this.ionicForm.value.nomPrenom == this.allClients[i].nomClient + " " + this.allClients[i].prenomClient){
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
      else{
        fetch(`http://127.0.0.1:3000/sav?referencesav=${reference}`) //récupération des comptes
        .then((resp) => resp.json())
        .then((data) => {
          this.getArticlesSAV(data[0].idSAV);

          if(data[0].referencePECVente != null) this.reference = data[0].referencePECVente;
          else this.reference = data[0].referenceVVente;
          this.data = data[0].dateSAV;
          this.allClients.forEach((element:any) => {
            if(element.idClient == data[0].clientPEC || element.idClient == data[0].clientV) {
              this.clientnomprenom = element.nomClient + " " + element.prenomClient;
              this.clienttel = element.telClient;
            }
          });
          this.magasin = this.allMagasins[data[0].magasin - 1].villeMagasin;
          this.modele = "N/A";
          this.allModeles.forEach((element:any) => {
            if(element.idModele == data[0].modele) {
              this.modele = element.libelleModele;
            }
          });
          this.etat = this.allEtats[data[0].etat - 1].libelleEtat;
          this.description = data[0].descriptionSAV;
          if(data[0].codeV == "0") this.code = this.allVentesPEC[data[0].PECVente].codePECVente;
          else this.code = data[0].codeV;
        })
        .catch(function(error) {
          console.log(error);
        });
      }
    }
    getReglementsVentesPEC(id : number)
    {
      fetch(`http://127.0.0.1:3000/reglementspecventes?PECVente=${id}`) //récupération des comptes
      .then((resp) => resp.json())
      .then((data) => {this.allReglementsVentesPEC = data;
      })
      .catch(function(error) {
        console.log(error);
      });
    }
    getReglementsVentesV(id : number)
    {
      fetch(`http://127.0.0.1:3000/reglementsvventes?VVente=${id}`) //récupération des comptes
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
    getArticlesSAV(id : number){
      let text = `http://127.0.0.1:3000/articlessav`;
      if(id != 0) text = `http://127.0.0.1:3000/articlessav?idSAV=${id}`;
      fetch(text) //récupération des comptes
      .then((resp) => resp.json())
      .then((data) => {
        if(id != 0 ) this.allArticlesSAVBis = data;
        else this.allArticlesSAV = data;
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
      .then((data) => {this.allClients = data; this.getSAV("");
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
    getFactures(id : any)
    {
      if(id == ""){
        fetch(`http://127.0.0.1:3000/factures?reference=${this.ionicForm.value.reference}&client=${this.ionicForm.value.nomPrenom}&magasin=${this.ionicForm.value.magasin}&etat=${this.ionicForm.value.etat}`) //récupération des comptes
        .then((resp) => resp.json())
        .then((data) => {this.allFactures = data;
        })
        .catch(function(error) {
          console.log(error);
        });
      }
      else{
        fetch(`http://127.0.0.1:3000/factures?id=${id}`) //récupération des comptes
        .then((resp) => resp.json())
        .then((data) => {this.allFacturesBis = data;
          this.reference = data[0].referenceFacture;
          this.clientnomprenom = data[0].nomClient + " " + data[0].prenomClient;
          this.clienttel = data[0].telClient;
          this.data = data[0].dateFacture;

          if(data[0].referencePECVente != null){
            this.commande = data[0].referencePECVente;
            this.magasin = data[0].magasinPEC;
            this.etat = data[0].etatPEC;
            this.prix = data[0].prixTTCPECVente + "€";
            this.restant = data[0].prixTTCRestantPECVente + "€";

            this.allArticlesVentesVBis = null;
            this.allReglementsVentesV = null;
            this.getArticlesVentesPEC(data[0].PECVente);
            this.getReglementsVentesPEC(data[0].PECVente);
          }
          else{
            this.commande = data[0].referenceVVente;
            this.magasin = data[0].magasinV;
            this.etat = data[0].etatV;
            this.prix = data[0].prixTTCVVente + "€";
            this.restant = data[0].prixTTCRestantVVente + "€";

            this.allArticlesVentesPECBis = null;
            this.allReglementsVentesPEC = null;
            this.getArticlesVentesV(data[0].VVente);
            this.getReglementsVentesV(data[0].VVente);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
      }
    }

    presentAlertDelete(id : any, type : number) { //1 = Ventes 2 = Prise en charges 3 = SAV
      let trouver : boolean;
      trouver = false;
      let i : any;
      i = 0;
      let vente : any;

      let message = "";
      if(type == 1){
        while(i < this.allVentesV.length && !trouver){
          if(this.allVentesV[i].idVente == id){
            trouver = true;

            vente = i;
          }
          else i++;
        }

        message = "Etes-vous sur de vouloir supprimer la référence " + this.allVentesV[vente].referenceVVente + " des ventes V?";
      }
      else if(type == 2){
        while(i < this.allVentesPEC.length && !trouver){
          if(this.allVentesPEC[i].idPECVente == id){
            trouver = true;

            vente = i;
          }
          else i++;
        }

        message = "Etes-vous sur de vouloir supprimer la référence " + this.allVentesPEC[vente].referencePECVente + " des ventes PEC ?";
      }
      else{
        while(i < this.allSAV.length && !trouver){
          if(this.allSAV[i].idSAV == id){
            trouver = true;

            vente = i;
          }
          else i++;
        }

        message = "Etes-vous sur de vouloir supprimer la référence " + this.allSAV[vente].referenceSAV + " des SAV ?";
      }
      const alert = document.createElement('ion-alert');
      alert.header = 'CONFIRMATION';
      alert.message = message;
      alert.buttons = [{ text: 'Non',},
      {
        text: 'Oui',
        role: 'confirm',
        handler: () => {
          if(type == 1)
          {
            fetch(`http://127.0.0.1:3000/ventev/delete?id=${id}`);
            fetch(`http://127.0.0.1:3000/articlesvventes/delete?id=${id}`);
            fetch(`http://127.0.0.1:3000/reglementsventesv/delete?id=${id}`);
          }
          if(type == 2)
          {
            fetch(`http://127.0.0.1:3000/ventepec/delete?id=${id}`);
            fetch(`http://127.0.0.1:3000/articlespecventes/delete?id=${id}`);
            fetch(`http://127.0.0.1:3000/reglementsventespec/delete?id=${id}`);
          }
          else
          {
            fetch(`http://127.0.0.1:3000/sav/delete?id=${id}`);
            fetch(`http://127.0.0.1:3000/articlessav/delete?id=${id}`);
          }
          window.location.reload();
        }
      }];

      document.body.appendChild(alert);
      alert.present();
    }

    goModifier(id : any) {
      localStorage.setItem("idElement",id);
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

    goPEC(reference : string){
      this.Retour();

      const infoPEC = document.getElementById("infoPEC") as HTMLInputElement;
      infoPEC.style.visibility = "visible";

      this.getVentesPEC(reference);
    }
    goV(reference : string){
      this.Retour();

      const infoV = document.getElementById("infoV") as HTMLInputElement;
      infoV.style.visibility = "visible";

      this.getVentesV(reference);
    }
    goSAV(reference : string){
      this.Retour();

      const infoSAV = document.getElementById("infoSAV") as HTMLInputElement;
      infoSAV.style.visibility = "visible";

      this.getSAV(reference);
    }
    goFacture(reference : string){
      this.Retour();

      const infoFacture = document.getElementById("infoFacture") as HTMLInputElement;
      infoFacture.style.visibility = "visible";

      this.getFactures(reference);
    }

    Retour(){
      const infoPEC = document.getElementById("infoPEC") as HTMLInputElement;
      infoPEC.style.visibility = "hidden";

      const infoV = document.getElementById("infoV") as HTMLInputElement;
      infoV.style.visibility = "hidden";

      const infoSAV = document.getElementById("infoSAV") as HTMLInputElement;
      infoSAV.style.visibility = "hidden";

      const infoFacture = document.getElementById("infoFacture") as HTMLInputElement;
      infoFacture.style.visibility = "hidden";
    }

    idV = 0;
    goCreationSAV1V(id : any) {
      this.idV=id;
      localStorage.setItem("idElement",id);

      this.getArticlesVentesV(this.idV);

      const list = document.getElementById("listV") as HTMLInputElement;

      list.style.visibility = "visible";
    }
    creationDate = "";
    stockID = 0;
    modeleID = 0;
    goCreationSAV2V(id : any, V : any, stock : number, modele : number) {
      this.getSAV("");

      const input = document.getElementById("inputV") as HTMLInputElement;
      input.style.visibility = "hidden";

      this.stockID = stock;
      this.modeleID = modele;

      fetch(`http://127.0.0.1:3000/articlesvventes?idSAV=${id}`) //récupération des comptes
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

                const input = document.getElementById("inputV") as HTMLInputElement;

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
    idPEC = 0;
    goCreationSAV1PEC(id : any) {
      this.idPEC=id;
      localStorage.setItem("idElement",id);

      this.getArticlesVentesPEC(this.idPEC);

      const list = document.getElementById("listPEC") as HTMLInputElement;

      list.style.visibility = "visible";
    }
    goCreationSAV2PEC(id : any, PEC : any, stock : number, modele : number) {
      this.getSAV("");

      const input = document.getElementById("inputPEC") as HTMLInputElement;
      input.style.visibility = "hidden";

      this.stockID = stock;
      this.modeleID = modele;

      fetch(`http://127.0.0.1:3000/articlespecventes?idSAV=${id}`) //récupération des comptes
      .then((resp) => resp.json())
      .then((data) => {
        this.allGaranties.forEach((g : any) => {
          if(data[0].garantieStock == g.idGarantie || data[0].garantieModele == g.idGarantie){

            fetch(`http://127.0.0.1:3000/ventespec?id=${PEC}`) //récupération des comptes
            .then((resp) => resp.json())
            .then((data) => {
              let j : number = data[0].datePECVente.substring(0,2);
              let m : number = data[0].datePECVente.substring(5,3);
              let a : number = data[0].datePECVente.substring(10,6);
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
                this.getArticlesVentesPEC(this.idPEC);

                const input = document.getElementById("inputPEC") as HTMLInputElement;

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
      const listV = document.getElementById("listV") as HTMLInputElement;
      listV.style.visibility = "hidden";

      const inputV = document.getElementById("inputV") as HTMLInputElement;
      inputV.style.visibility = "hidden";

      const listPEC = document.getElementById("listPEC") as HTMLInputElement;
      listPEC.style.visibility = "hidden";

      const inputPEC = document.getElementById("inputPEC") as HTMLInputElement;
      inputPEC.style.visibility = "hidden";
    }
    ajoutSAVV(){
      if(this.ionicFormSAVV.value.description != "" && this.ionicFormSAVV.value.magasin != "" && this.ionicFormSAVV.value.dossierChaud != "" && this.ionicFormSAVV.value.code != ""){

        console.log(this.ionicFormSAVV.value);
        let id = this.allSAV[0].idSAV + 1;

        let date = new Date();
        let reference = `SAV(${date.getFullYear()})-${id}`;
        fetch(`http://127.0.0.1:3000/sav/add?id=${id}&reference=${reference}&dateSAV=${this.creationDate}&stock=${this.stockID}&magasin=${this.ionicFormSAVV.value.magasin}&modele=${this.modeleID}&description=${this.ionicFormSAVV.value.description}&dossierChaud=${this.ionicFormSAVV.value.dossierChaud}&pec=${0}&v=${this.idV}&code=${this.ionicFormSAVV.value.code}`);
        fetch(`http://127.0.0.1:3000/articlessav/add?sav=${id}&stock=${this.stockID}`);

        fetch(`http://127.0.0.1:3000/ventesv?id=${localStorage.getItem("idElement")}`) //récupération des comptes
        .then((resp) => resp.json())
        .then((data) => {
          this.createPaper(data[0].client, this.ionicFormSAVV.value.code, this.ionicFormSAVV.value.description, this.creationDate, this.ionicFormSAVV.value.magasin, reference, this.ionicFormSAVV.value.dossierChaud);
        })
        .catch(function(error) {
          console.log(error);
        });
        this.presentAlert("SAV créer avec succès !", true);
      }
      else this.presentAlert("Veuillez remplir tous les champs obligatoires", false);
    }
    ajoutSAVPEC(){
      if(this.ionicFormSAVPEC.value.description != "" && this.ionicFormSAVPEC.value.magasin != "" && this.ionicFormSAVPEC.value.dossierChaud != ""){
        let id = this.allSAV[0].idSAV + 1;

        let date = new Date();
        let reference = `SAV(${date.getFullYear()})-${id}`;

        fetch(`http://127.0.0.1:3000/sav/add?id=${id}&reference=${reference}&dateSAV=${this.creationDate}&stock=${this.stockID}&magasin=${this.ionicFormSAVPEC.value.magasin}&modele=${this.modeleID}&description=${this.ionicFormSAVPEC.value.description}&dossierChaud=${this.ionicFormSAVPEC.value.dossierChaud}&pec=${this.idPEC}&v=${0}&code=0`);
        fetch(`http://127.0.0.1:3000/articlessav/add?sav=${id}&stock=${this.stockID}`);

        fetch(`http://127.0.0.1:3000/ventespec?id=${localStorage.getItem("idElement")}`) //récupération des comptes
        .then((resp) => resp.json())
        .then((data) => {
          this.createPaper(data[0].client, data[0].codePECVente, this.ionicFormSAVPEC.value.description, this.creationDate, this.ionicFormSAVPEC.value.magasin, reference, this.ionicFormSAVPEC.value.dossierChaud);
        })
        .catch(function(error) {
          console.log(error);
        });
        this.presentAlert("SAV créer avec succès !", true);
      }
      else this.presentAlert("Veuillez remplir tous les champs obligatoires", false);
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

    Recherche(){
      if(this.recherche != ""){
        localStorage.setItem("recherche",this.recherche);

        this.router.navigate(['recherche'], { replaceUrl: true });
      }
    }
}
