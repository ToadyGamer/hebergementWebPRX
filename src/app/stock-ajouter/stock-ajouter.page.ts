import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import  { FormGroup }  from "@angular/forms";
import  { FormBuilder }  from "@angular/forms";
import  { Validators }  from "@angular/forms";

@Component({
  selector: 'app-stock-ajouter',
  templateUrl: './stock-ajouter.page.html',
  styleUrls: ['./stock-ajouter.page.scss'],
})
export class StockAjouterPage implements OnInit {
  public ionicForm: FormGroup;

  constructor(private router: Router, public formBuilder: FormBuilder) {
    this.ionicForm = this.formBuilder.group({
      libelle:['',Validators.compose([Validators.required])],
      refinterne:['',Validators.compose([])],
      ean:['',Validators.compose([])],
      prixunitairehorstaxe:['',Validators.compose([Validators.required])],
      prixunitaire:['',Validators.compose([Validators.required])],
      prixttc:['',Validators.compose([Validators.required])],
      rachat:['',Validators.compose([Validators.required])],
      categorie:['',Validators.compose([Validators.required])],
      souscategorie:['',Validators.compose([Validators.required])],
      magasin:['',Validators.compose([Validators.required])]
    });
  }

  ngOnInit() {
  }

  nomC? : string;
  prenomC? : string;

  categorieActuel? : string;
  sousCategorieActuel? : string;
  
  allMagasins ? : any;

  tva? : string;

  ionViewWillEnter(){
    this.getInfoUser();
    this.getCategories();
    this.getSousCategories();
    this.getMagasins();
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

  changeRachat(){
    const rachat = document.getElementById("rachat") as HTMLInputElement;
    const achat = document.getElementById("achat") as HTMLInputElement;
    const magasin = document.getElementById("magasin") as HTMLInputElement;
    const venteht = document.getElementById("venteht") as HTMLInputElement;

    if(this.ionicForm.value.rachat == "") 
    {
      rachat.style.visibility = "hidden";
      achat.style.visibility = "hidden";
      magasin.style.visibility = "hidden";
      venteht.style.visibility = "hidden";
    }
    else if(this.ionicForm.value.rachat == 1) 
    {
      rachat.style.visibility = "visible";
      achat.style.visibility = "hidden";
      magasin.style.visibility = "visible";
      venteht.style.visibility = "visible";
    }
    else if(this.ionicForm.value.rachat == 0)
    {
      rachat.style.visibility = "hidden";
      achat.style.visibility = "visible";
      magasin.style.visibility = "hidden";
      venteht.style.visibility = "hidden";
    }
  }
  changePrice(){
    const rachat = document.getElementById("rachat") as HTMLInputElement;
    const venteht = document.getElementById("venteht") as HTMLInputElement;
    const prixttc = document.getElementById("prixttc") as HTMLInputElement;

    venteht.value = (parseFloat(prixttc.value) - parseFloat(rachat.value)) * 0.8 + "";
  }
  async submitForm()
  {
    if(this.ionicForm.value.rachat == "0"){ //PAS DE RACHAT
      if(this.ionicForm.value.libelle == "" || this.ionicForm.value.prixttc == "" || this.ionicForm.value.categorie == "" || this.ionicForm.value.souscategorie == "" || this.ionicForm.value.prixunitairehorstaxe == "") this.presentAlert("Veuillez remplir les champs obligatoires.", false)
      else{
        fetch(`http://localhost:3000/stocks/add?libelle=${this.ionicForm.value.libelle}&refInterne=${this.ionicForm.value.refinterne}&EAN=${this.ionicForm.value.ean}&prixUniHorsTaxe=${this.ionicForm.value.prixunitairehorstaxe}&prixUni=&prixTTC=${this.ionicForm.value.prixttc}&rachat=${this.ionicForm.value.rachat}&categorie=${this.ionicForm.value.categorie}&sousCategorie=${this.ionicForm.value.souscategorie}`);
        this.presentAlert("Stock ajouté avec succès !", true);
        
        new Promise((resolve) => {
          setTimeout(() => {
            resolve('resolved');
          }, 1000);
        });

        fetch(`http://localhost:3000/stocks/infos`)
        .then((resp) => resp.json())
        .then((data) => {
          this.allMagasins.forEach((m:any) => {
          fetch(`http://localhost:3000/quantites/add?stock=${data[0].idStock}&magasin=${m.idMagasin}&stock=${0}`);
          });
        })
        .catch(function(error) {
          console.log(error);
        });
      }
    }
    else if(this.ionicForm.value.rachat == "1"){ //RACHAT
      if(this.ionicForm.value.libelle == "" || this.ionicForm.value.prixttc == "" || this.ionicForm.value.categorie == "" || this.ionicForm.value.souscategorie == "" || this.ionicForm.value.magasin == "" || this.ionicForm.value.prixunitaire == "") this.presentAlert("Veuillez remplir les champs obligatoires.", false)
      else{
        const venteht = document.getElementById("venteht") as HTMLInputElement;
        fetch(`http://localhost:3000/stocks/add?libelle=${this.ionicForm.value.libelle}&refInterne=${this.ionicForm.value.refinterne}&EAN=${this.ionicForm.value.ean}&prixUniHorsTaxe=${venteht.value}&prixUni=${this.ionicForm.value.prixunitaire}&prixTTC=${this.ionicForm.value.prixttc}&rachat=${this.ionicForm.value.rachat}&categorie=${this.ionicForm.value.categorie}&sousCategorie=${this.ionicForm.value.souscategorie}`);
        this.presentAlert("Stock ajouté avec succès !", true);
  
        new Promise((resolve) => {
          setTimeout(() => {
            resolve('resolved');
          }, 1000);
        });

        fetch(`http://localhost:3000/stocks/infos`)
        .then((resp) => resp.json())
        .then((data) => {
          this.allMagasins.forEach((m:any) => {
            let nb = 0;
            if(m.idMagasin == this.ionicForm.value.magasin) nb = 1;
            fetch(`http://localhost:3000/quantites/add?stock=${data[0].idStock}&magasin=${m.idMagasin}&nombreQuantite=${nb}`);
            });
        })
        .catch(function(error) {
          console.log(error);
        });
      }
    }
    else{ //R
      this.presentAlert("Rachat non choisis !", false)
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