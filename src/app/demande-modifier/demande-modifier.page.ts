import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import  { FormGroup }  from "@angular/forms";
import  { FormBuilder }  from "@angular/forms";
import  { Validators }  from "@angular/forms";
@Component({
  selector: 'app-demande-modifier',
  templateUrl: './demande-modifier.page.html',
  styleUrls: ['./demande-modifier.page.scss'],
})
export class DemandeModifierPage implements OnInit {

  public ionicForm: FormGroup;

  constructor(private router: Router, public formBuilder: FormBuilder) {
    this.ionicForm = this.formBuilder.group({
      statut:['',Validators.compose([Validators.required])],
      contreDescription:['',Validators.compose([])],
      contreCout:['',Validators.compose([])],
      description:['',Validators.compose([])],
      cout:['',Validators.compose([])]
    });
  }

  ngOnInit() {  }

  nomC? : string;
  prenomC? : string;

  allComptes? : any;
  allStatuts ? : any;

  statutModify? : string;
  contreDescriptionModify? : string;
  contreCoutModify? : string;
  descriptionModify? : string;
  coutModify? : string;

  ionViewWillEnter(){
    this.getInfoUser();
    this.getStatuts();

    this.getDemande();
  }

  addValueFilterStatuts(data : any){
    const selectStatut = document.getElementById("selectStatut");

    data.forEach((s : any) => {
      const opt = document.createElement("option");
      opt.value = s.idStatut;
      opt.text = s.libelleStatut;
      opt.style.color = 'black';
  
      selectStatut?.appendChild(opt);
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
  getStatuts()
  {
    fetch(`http://127.0.0.1:3000/statuts`) //récupération des comptes
    .then((resp) => resp.json())
    .then((data) => {this.allStatuts = data; this.addValueFilterStatuts(data);
    })
    .catch(function(error) {
      console.log(error);
    });
  }
  getDemande = async () => {
    const idDemande = localStorage.getItem("idElement");
    await new Promise(res => setTimeout(res, 100))
    if (idDemande) {
      fetch(`http://127.0.0.1:3000/demandes?id=${idDemande}`)
        .then((resp) => {
          if (!resp.ok) {
            throw new Error("La requête a échoué");
          }
          return resp.json();
        })
        .then((data) => {
          if (data.length > 0) {
            const element = data[0];
            console.log(element);
            this.statutModify = element.statut;
            this.contreDescriptionModify = element.contreDescriptionDemande;
            this.contreCoutModify = element.contreCoutDemande;
            const descriptionText = document.getElementById("description") as HTMLInputElement;
            this.descriptionModify = element.descriptionDemande;
            descriptionText.value = this.descriptionModify + "";
            const coutText = document.getElementById("cout") as HTMLInputElement;
            this.coutModify = element.coutDemande;
            coutText.value = this.coutModify + "";
          }
        })
        .catch((error) => {
          console.error("Une erreur s'est produite :", error);
        });
    }
  }

  submitForm()
  {
    if(this.ionicForm.value.statut != 2 && (this.ionicForm.value.contreDescription == "" || this.ionicForm.value.contreCout == "")) this.presentAlert("Veuillez remplir les champs obligatoires.", false);
    else
    {
      fetch(`http://localhost:3000/demandes/modify?contreDescription=${this.ionicForm.value.contreDescription}&contreCout=${this.ionicForm.value.contreCout}&statut=${this.ionicForm.value.statut}&id=${localStorage.getItem("idElement")}`);
      this.presentAlert("Demande modifié avec succès !", true)
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
