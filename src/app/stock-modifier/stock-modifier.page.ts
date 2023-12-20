import { Attribute, Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import  { FormGroup }  from "@angular/forms";
import  { FormBuilder }  from "@angular/forms";
import  { Validators }  from "@angular/forms";

@Component({
  selector: 'app-stock-modifier',
  templateUrl: './stock-modifier.page.html',
  styleUrls: ['./stock-modifier.page.scss'],
})
export class StockModifierPage implements OnInit {
  public ionicFormModify: FormGroup;
  public ionicFormTransfert: FormGroup;

  constructor(private router: Router, public formBuilder: FormBuilder) {
    this.ionicFormModify = this.formBuilder.group({
      libelle:['',Validators.compose([])],
      refinterne:['',Validators.compose([])],
      ean:['',Validators.compose([])],
      categorie:['',Validators.compose([])],
      souscategorie:['',Validators.compose([])]
    });

    this.ionicFormTransfert = this.formBuilder.group({
      magasinactuel:['',Validators.compose([])],
      magasinfutur:['',Validators.compose([])],
      nombrestock:['',Validators.compose([])]
    });

  }

  ngOnInit() {
  }
  
  nomC? : string;
  prenomC? : string;

  libelleModify? : string;
  refInterneModify? : string;
  eanModify? : string;
  categorieActuel? : string;
  sousCategorieActuel? : string;

  allQuantites? : any;
  allQuantitesOneStock: { [id: number] : number; } = {};

  ionViewWillEnter(){
    this.getInfoUser();
    this.getCategories();
    this.getSousCategories();
    this.getMagasins();
    this.getQuantites();

    this.getStock();
  }

  addValueFilterCategorie(data : any){
    const selectMagasin = document.getElementById("selectCategorie");

    data.forEach((c : any) => {
      const opt = document.createElement("option");
      opt.value = c.idCategorie;
      opt.text = c.libelleCategorie;
      opt.style.color = 'black';

      selectMagasin?.appendChild(opt);
    });
  }
  addValueFilterSousCategorie(data : any){
    const selectMagasin = document.getElementById("selectSousCategorie");

    data.forEach((sc : any) => {
      const opt = document.createElement("option");
      opt.value = sc.idSousCategorie;
      opt.text = sc.libelleSousCategorie;
      opt.style.color = 'black';
  
      selectMagasin?.appendChild(opt);
    });
  }
  addValueFilterMagasin = async(data : any) =>{
    if(this.allQuantites == null){
      await new Promise(res => setTimeout(res, 100))
      this.addValueFilterMagasin(data);
      return;
    }

    const selectMagasinActuel = document.getElementById("selectMagasinActuel");
    const selectMagasinFutur = document.getElementById("selectMagasinFutur");
    const idStock = localStorage.getItem("idElement");

    data.forEach((m : any) => {
      const opt = document.createElement("option");
      opt.value = m.idMagasin;

      let i = 0;
      let trouver = false;
      while (i < this.allQuantites.length && !trouver){
        if(m.idMagasin == this.allQuantites[i].magasin && idStock == this.allQuantites[i].stock){
          trouver = true;
          opt.text = m.villeMagasin + " : " + this.allQuantites[i].nombreQuantite;

          this.allQuantitesOneStock[m.idMagasin] = this.allQuantites[i].nombreQuantite;
        }
        else i++;
      }

      opt.style.color = 'black';
  
      selectMagasinActuel?.appendChild(opt);
    });

    data.forEach((m : any) => {
      const opt = document.createElement("option");
      opt.value = m.idMagasin;

      let i = 0;
      let trouver = false;
      while (i < this.allQuantites.length && !trouver){
        if(m.idMagasin == this.allQuantites[i].magasin && idStock == this.allQuantites[i].stock){
          trouver = true;
          opt.text = m.villeMagasin + " : " + this.allQuantites[i].nombreQuantite;
        }
        else i++;
      }

      opt.style.color = 'black';

      selectMagasinFutur?.appendChild(opt);
    });
  }
  
  submitFormModify()
  {
    fetch(`http://127.0.0.1:3000/stocks/modify?id=${localStorage.getItem("idElement")}&libelle=${this.ionicFormModify.value.libelle}&refInterne=${this.ionicFormModify.value.refinterne}&ean=${this.ionicFormModify.value.ean}&categorie=${this.ionicFormModify.value.categorie}&sousCategorie=${this.ionicFormModify.value.souscategorie}`); //Ajout
    this.presentAlert("Stock modifié !",true);
  }
  submitFormTransfert()
  {
    if(this.ionicFormTransfert.value.nombrestock == 0) this.presentAlert("Le nombre d'article envoyé ne peut pas être de 0.", false)
    else if(!this.ionicFormTransfert.value.magasinactuel || !this.ionicFormTransfert.value.magasinfutur) this.presentAlert("Veuillez assigner 2 magasins.", false);
    else if(this.ionicFormTransfert.value.magasinactuel == this.ionicFormTransfert.value.magasinfutur) this.presentAlert("Impossible de mettre 2 magasins identiques.", false);
    else{
      fetch(`http://127.0.0.1:3000/quantites/tranfert?id=${localStorage.getItem("idElement")}&magasinactuel=${this.ionicFormTransfert.value.magasinactuel}&quantitemagasinactuel=${this.allQuantitesOneStock[this.ionicFormTransfert.value.magasinactuel] - this.ionicFormTransfert.value.nombrestock}&magasinfutur=${this.ionicFormTransfert.value.magasinfutur}&quantitemagasinfutur=${this.allQuantitesOneStock[this.ionicFormTransfert.value.magasinfutur] - (-this.ionicFormTransfert.value.nombrestock)}`); //Ajout
      this.presentAlert("Transfert bien effectué !",true);
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
  getCategories()
  {
    fetch(`http://127.0.0.1:3000/categories`) //récupération des comptes
    .then((resp) => resp.json())
    .then((data) => {this.addValueFilterCategorie(data);
    })
    .catch(function(error) {
      console.log(error);
    });
  }
  getSousCategories()
  {
    fetch(`http://127.0.0.1:3000/souscategories`) //récupération des comptes
    .then((resp) => resp.json())
    .then((data) => {this.addValueFilterSousCategorie(data);
    })
    .catch(function(error) {
      console.log(error);
    });
  }
  getMagasins()
  {
    fetch(`http://127.0.0.1:3000/magasins`) //récupération des comptes
    .then((resp) => resp.json())
    .then((data) => {this.addValueFilterMagasin(data);
    })
    .catch(function(error) {
      console.log(error);
    });
  }
  getQuantites(){
    fetch(`http://127.0.0.1:3000/quantites`) //récupération des comptes
    .then((resp) => resp.json())
    .then((data) => {this.allQuantites = data;
    })
    .catch(function(error) {
      console.log(error);
    });
  }
  getStock = async () => {
    const idStock = localStorage.getItem("idElement");
    await new Promise(res => setTimeout(res, 100))
    if (idStock) {
      fetch(`http://127.0.0.1:3000/stocks?id=${idStock}`)
        .then((resp) => {
          if (!resp.ok) {
            throw new Error("La requête a échoué");
          }
          return resp.json();
        })
        .then((data) => {
          if (data.length > 0) {
            const element = data[0];
            this.libelleModify = element.libelleStock;
            this.refInterneModify = element.refInterneStock;
            this.eanModify = element.EANStock;
            this.categorieActuel = element.categorie;
            this.sousCategorieActuel = element.sousCategorie;
          }
        })
        .catch((error) => {
          console.error("Une erreur s'est produite :", error);
        });
    }
  }

  presentAlert(text : string, choix : boolean) {
    const alert = document.createElement('ion-alert');
    alert.header = 'INFORMATIONS';
    alert.message = text;
    if(choix){
      alert.buttons = [
        {
          text: 'Retour aux stocks',
          role: 'confirm',
          handler: () => { 
            this.router.navigate(['stocks'], { replaceUrl: true });
          }
        },
        {
          text: 'Continuer',
          role: 'confirm',
          handler: () => { 
            window.location.reload(); 
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
}
