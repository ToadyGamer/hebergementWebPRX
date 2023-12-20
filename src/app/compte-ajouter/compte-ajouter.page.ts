import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import  { FormGroup }  from "@angular/forms";
import  { FormBuilder }  from "@angular/forms";
import  { Validators }  from "@angular/forms";
@Component({
  selector: 'app-compte-ajouter',
  templateUrl: './compte-ajouter.page.html',
  styleUrls: ['./compte-ajouter.page.scss'],
})
export class CompteAjouterPage implements OnInit {

  public ionicForm: FormGroup;

  constructor(private router: Router, public formBuilder: FormBuilder) {
    this.ionicForm = this.formBuilder.group({
      nom:['',Validators.compose([Validators.required])],
      prenom:['',Validators.compose([Validators.required])],
      magasin:['',Validators.compose([Validators.required])],
      identifiant:['',Validators.compose([Validators.required])],
      motdepasse:['',Validators.compose([Validators.required])],
      habilitation:['',Validators.compose([Validators.required])]
    });
  }

  ngOnInit() {  }

  nomC? : string;
  prenomC? : string;

  allComptes? : any;
  allMagasins ? : any;
  allHabilitations ? : any;

  ionViewWillEnter(){
    this.getInfoUser();
    this.getHabilitations();
    this.getMagasins();
  }

  addValueFilterHabilitation(data : any){
    const selectMagasin = document.getElementById("selectHabilitation");

    data.forEach((h : any) => {
      const opt = document.createElement("option");
      opt.value = h.idHabilitation;
      opt.text = h.libelleHabilitation;
      opt.style.color = 'black';
  
      selectMagasin?.appendChild(opt);
    });
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
  getHabilitations()
  {
    fetch(`http://127.0.0.1:3000/habilitations`) //récupération des comptes
    .then((resp) => resp.json())
    .then((data) => {this.allHabilitations = data; this.addValueFilterHabilitation(data);
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

  submitForm()
  {
    if(this.ionicForm.value.nom == "" || this.ionicForm.value.prenom == "" || this.ionicForm.value.magasin == "" || this.ionicForm.value.identifiant == "" || this.ionicForm.value.motdepasse == "" || this.ionicForm.value.habilitation == "") this.presentAlert("Veuillez remplir les champs obligatoires.", false);
    else
    {
      fetch(`http://localhost:3000/comptes/add?nom=${this.ionicForm.value.nom}&prenom=${this.ionicForm.value.prenom}&magasin=${this.ionicForm.value.magasin}&identifiant=${this.ionicForm.value.identifiant}&motDePasse=${this.ionicForm.value.motdepasse}&habilitation=${this.ionicForm.value.habilitation}`);
      this.presentAlert("Client ajouté avec succès !", true)
    }
  }

  presentAlert(text : string, choix : boolean) {
    const alert = document.createElement('ion-alert');
    alert.header = 'INFORMATIONS';
    alert.message = text;
    if(choix){
      alert.buttons = [
        {
          text: 'Retour aux clients',
          role: 'confirm',
          handler: () => { 
            this.router.navigate(['comptes'], { replaceUrl: true });
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
