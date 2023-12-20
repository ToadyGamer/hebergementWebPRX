import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DemandeAjouterPage } from './demande-ajouter.page';

describe('DemandeAjouterPage', () => {
  let component: DemandeAjouterPage;
  let fixture: ComponentFixture<DemandeAjouterPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DemandeAjouterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
