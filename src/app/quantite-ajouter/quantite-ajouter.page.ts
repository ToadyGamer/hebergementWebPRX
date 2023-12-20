import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import  { FormGroup }  from "@angular/forms";
import  { FormBuilder }  from "@angular/forms";
import  { Validators }  from "@angular/forms";
@Component({
  selector: 'app-quantite-ajouter',
  templateUrl: './quantite-ajouter.page.html',
  styleUrls: ['./quantite-ajouter.page.scss'],
})
export class QuantiteAjouterPage implements OnInit {

  public ionicForm: FormGroup;

  constructor(private router: Router, public formBuilder: FormBuilder) {
    this.ionicForm = this.formBuilder.group({
      ean:['',Validators.compose([Validators.required])],
      quantite:['',Validators.compose([Validators.required])],
      prixht:['',Validators.compose([Validators.required])],
      prixttc:['',Validators.compose([Validators.required])],
      magasin:['',Validators.compose([Validators.required])]
    });
  }

  ngOnInit() {  }

  nomC? : string;
  prenomC? : string;

  allMagasins ? : any;
  allStocks ? : any;
  allQuantites ? : any;
  quantite ? : any;

  ionViewWillEnter(){
    this.getInfoUser();
    this.getMagasins();
    this.getQuantites();
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
  getStocks()
  {
    fetch(`http://localhost:3000/stocks?rach=0&ean=${this.ionicForm.value.ean}`) //récupération des comptes
    .then((resp) => resp.json())
    .then((data) => {this.allStocks = data; this.changeQuantite(data);
    })
    .catch(function(error) {
      console.log(error);
    });
  }
  getQuantites(){
    fetch(`http://localhost:3000/quantites?magasin=${this.ionicForm.value.magasin}`) //récupération des comptes
    .then((resp) => resp.json())
    .then((data) => {this.allQuantites = data;
    })
    .catch(function(error) {
      console.log(error);
    });
  }
  submitForm()
  {
    if(this.ionicForm.value.ean == "" || this.ionicForm.value.quantite == "" || this.ionicForm.value.prixht == "" || this.ionicForm.value.prixttc == "" || this.ionicForm.value.magasin == "") this.presentAlert("Veuillez remplir les champs obligatoires.", false);
    else 
    {
      this.getStocks();
    }
  }

  changeQuantite(data : any){
    if(data.length == 0) this.presentAlert("Aucun article trouvé avec cet EAN", false);
    else{
      let trouver = false;
      let i = 0;
      while(i < data.length && !trouver)
      {
        if(i == data.length) break;

        if(data[i].prixUnitaireHorsTaxeStock == this.ionicForm.value.prixht)
        {
          if(data[i].prixTTCStock == this.ionicForm.value.prixttc)
          {
            trouver = true;
          }
          else i++;
        }
        else i++;
      }

      if(trouver){
        let quant : number;
        quant = 0;
        this.allQuantites.forEach((q:any) => {
          if(q.stock == data[i].idStock) quant = q.nombreQuantite;
        });
        
        quant += Number.parseInt(this.ionicForm.value.quantite);
        
        fetch(`http://localhost:3000/quantites/modify?stock=${data[i].idStock}&magasin=${this.ionicForm.value.magasin}&quantite=${quant}`);
        this.presentAlert("Article ajouté avec succès", true);
      }
      else
      {
        const list = document.getElementById("list") as HTMLInputElement;

        list.style.visibility = "visible";
      }
    }

    
  }

  modifierList(){
    const list = document.getElementById("list") as HTMLInputElement;

    list.style.visibility = "hidden";
  }

  async ajouterList(){
    fetch(`http://localhost:3000/stocks/add?libelle=${this.allStocks[0].libelleStock}&refInterne=${this.allStocks[0].refInterneStock}&EAN=${this.allStocks[0].EANStock}&prixUniHorsTaxe=&prixUni=${this.ionicForm.value.prixht}&TVA=${this.allStocks[0].TVAStock}&prixTTC=${this.ionicForm.value.prixttc}&rachat=${this.allStocks[0].rachatStock}&categorie=${this.allStocks[0].categorie}&sousCategorie=${this.allStocks[0].sousCategorie}`);

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
        if(m.idMagasin == this.ionicForm.value.magasin) nb = Number.parseInt(this.ionicForm.value.quantite);
        fetch(`http://localhost:3000/quantites/add?stock=${data[0].idStock}&magasin=${m.idMagasin}&nombreQuantite=${nb}`);
      });
    })
    .catch(function(error) {
      console.log(error);
    });
    this.presentAlert("Article créer avec succès !", true);
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
