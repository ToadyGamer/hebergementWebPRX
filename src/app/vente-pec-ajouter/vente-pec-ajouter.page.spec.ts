import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VentePecAjouterPage } from './vente-pec-ajouter.page';

describe('VentePecAjouterPage', () => {
  let component: VentePecAjouterPage;
  let fixture: ComponentFixture<VentePecAjouterPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(VentePecAjouterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
