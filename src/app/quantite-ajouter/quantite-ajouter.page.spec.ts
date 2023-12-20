import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuantiteAjouterPage } from './quantite-ajouter.page';

describe('QuantiteAjouterPage', () => {
  let component: QuantiteAjouterPage;
  let fixture: ComponentFixture<QuantiteAjouterPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(QuantiteAjouterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
