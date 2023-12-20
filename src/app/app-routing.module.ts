import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'tableau-de-bord',
    loadChildren: () => import('./tableau-de-bord/tableau-de-bord.module').then( m => m.TableauDeBordPageModule)
  },
  {
    path: 'stocks',
    loadChildren: () => import('./stocks/stocks.module').then( m => m.StocksPageModule)
  },
  {
    path: 'stock-modifier',
    loadChildren: () => import('./stock-modifier/stock-modifier.module').then( m => m.StockModifierPageModule)
  },
  {
    path: 'stock-ajouter',
    loadChildren: () => import('./stock-ajouter/stock-ajouter.module').then( m => m.StockAjouterPageModule)
  },
  {
    path: 'quantite-ajouter',
    loadChildren: () => import('./quantite-ajouter/quantite-ajouter.module').then( m => m.QuantiteAjouterPageModule)
  },
  {
    path: 'clients',
    loadChildren: () => import('./clients/clients.module').then( m => m.ClientsPageModule)
  },
  {
    path: 'comptes',
    loadChildren: () => import('./comptes/comptes.module').then( m => m.ComptesPageModule)
  },
  {
    path: 'client-ajouter',
    loadChildren: () => import('./client-ajouter/client-ajouter.module').then( m => m.ClientAjouterPageModule)
  },
  {
    path: 'client-modifier',
    loadChildren: () => import('./client-modifier/client-modifier.module').then( m => m.ClientModifierPageModule)
  },
  {
    path: 'compte-ajouter',
    loadChildren: () => import('./compte-ajouter/compte-ajouter.module').then( m => m.CompteAjouterPageModule)
  },
  {
    path: 'compte-modifier',
    loadChildren: () => import('./compte-modifier/compte-modifier.module').then( m => m.CompteModifierPageModule)
  },
  {
    path: 'demandes',
    loadChildren: () => import('./demandes/demandes.module').then( m => m.DemandesPageModule)
  },
  {
    path: 'demande-ajouter',
    loadChildren: () => import('./demande-ajouter/demande-ajouter.module').then( m => m.DemandeAjouterPageModule)
  },
  {
    path: 'demande-modifier',
    loadChildren: () => import('./demande-modifier/demande-modifier.module').then( m => m.DemandeModifierPageModule)
  },
  {
    path: 'vente-pec',
    loadChildren: () => import('./vente-pec/vente-pec.module').then( m => m.VentePecPageModule)
  },
  {
    path: 'vente-pec-ajouter',
    loadChildren: () => import('./vente-pec-ajouter/vente-pec-ajouter.module').then( m => m.VentePecAjouterPageModule)
  },
  {
    path: 'vente-pec-modifier',
    loadChildren: () => import('./vente-pec-modifier/vente-pec-modifier.module').then( m => m.VentePecModifierPageModule)
  },
  {
    path: 'vente-v',
    loadChildren: () => import('./vente-v/vente-v.module').then( m => m.VenteVPageModule)
  },
  {
    path: 'vente-v-ajouter',
    loadChildren: () => import('./vente-v-ajouter/vente-v-ajouter.module').then( m => m.VenteVAjouterPageModule)
  },
  {
    path: 'vente-v-modifier',
    loadChildren: () => import('./vente-v-modifier/vente-v-modifier.module').then( m => m.VenteVModifierPageModule)
  },
  {
    path: 'sav',
    loadChildren: () => import('./sav/sav.module').then( m => m.SavPageModule)
  },
  {
    path: 'sav-modifier',
    loadChildren: () => import('./sav-modifier/sav-modifier.module').then( m => m.SavModifierPageModule)
  },
  {
    path: 'chiffre-affaire',
    loadChildren: () => import('./chiffre-affaire/chiffre-affaire.module').then( m => m.ChiffreAffairePageModule)
  },
  {
    path: 'avoirs',
    loadChildren: () => import('./avoirs/avoirs.module').then( m => m.AvoirsPageModule)
  },
  {
    path: 'recherche',
    loadChildren: () => import('./recherche/recherche.module').then( m => m.RecherchePageModule)
  },
  {
    path: 'factures',
    loadChildren: () => import('./factures/factures.module').then( m => m.FacturesPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
