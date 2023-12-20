import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VenteVAjouterPage } from './vente-v-ajouter.page';

describe('VenteVAjouterPage', () => {
  let component: VenteVAjouterPage;
  let fixture: ComponentFixture<VenteVAjouterPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(VenteVAjouterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
