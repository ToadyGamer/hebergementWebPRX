import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompteAjouterPage } from './compte-ajouter.page';

describe('CompteAjouterPage', () => {
  let component: CompteAjouterPage;
  let fixture: ComponentFixture<CompteAjouterPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CompteAjouterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
