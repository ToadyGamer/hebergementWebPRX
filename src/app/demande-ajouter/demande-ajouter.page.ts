import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import  { FormGroup }  from "@angular/forms";
import  { FormBuilder }  from "@angular/forms";
import  { Validators }  from "@angular/forms";
@Component({
  selector: 'app-demande-ajouter',
  templateUrl: './demande-ajouter.page.html',
  styleUrls: ['./demande-ajouter.page.scss'],
})
export class DemandeAjouterPage implements OnInit {

  public ionicForm: FormGroup;

  constructor(private router: Router, public formBuilder: FormBuilder) {
    this.ionicForm = this.formBuilder.group({
      categorie:['',Validators.compose([Validators.required])],
      description:['',Validators.compose([Validators.required])],
      cout:['',Validators.compose([Validators.required])],
      magasin:['',Validators.compose([Validators.required])],
      rachat:['',Validators.compose([Validators.required])]
    });
  }

  ngOnInit() {  }

  nomC? : string;
  prenomC? : string;

  allMagasins ? : any;
  allCategories ? : any;

  ionViewWillEnter(){
    this.getInfoUser();
    this.getMagasins();
    this.getCategories();
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
  addValueFilterCategories(data : any){
    const selectCategorie = document.getElementById("selectCategorie");

    data.forEach((c : any) => {
      const opt = document.createElement("option");
      opt.value = c.idCategorie;
      opt.text = c.libelleCategorie;
      opt.style.color = 'black';
  
      selectCategorie?.appendChild(opt);
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
    .then((data) => {this.allMagasins = data; this.addValueFilterMagasin(data);
    })
    .catch(function(error) {
      console.log(error);
    });
  }
  getCategories()
  {
    fetch(`http://127.0.0.1:3000/categories`) //récupération des comptes
    .then((resp) => resp.json())
    .then((data) => {this.allCategories = data; this.addValueFilterCategories(data);
    })
    .catch(function(error) {
      console.log(error);
    });
  }

  submitForm()
  {
    if(this.ionicForm.value.categorie == "" || this.ionicForm.value.description == "" || this.ionicForm.value.cout == "" || this.ionicForm.value.magasin == "" || this.ionicForm.value.rachat == "") this.presentAlert("Veuillez remplir les champs obligatoires.", false);
    else
    {
      fetch(`http://localhost:3000/demandes/add?categorie=${this.ionicForm.value.categorie}&description=${this.ionicForm.value.description}&cout=${this.ionicForm.value.cout}&magasin=${this.ionicForm.value.magasin}&rachat=${this.ionicForm.value.rachat}&compte=${localStorage.getItem("idCompte")}`);
      this.presentAlert("Demande ajouté avec succès !", true)
    }
  }

  presentAlert(text : string, choix : boolean) {
    const alert = document.createElement('ion-alert');
    alert.header = 'INFORMATIONS';
    alert.message = text;
    if(choix){
      alert.buttons = [
        {
          text: 'Retour aux demandes',
          role: 'confirm',
          handler: () => { 
            this.router.navigate(['demandes'], { replaceUrl: true });
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
