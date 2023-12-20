import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientAjouterPage } from './client-ajouter.page';

describe('ClientAjouterPage', () => {
  let component: ClientAjouterPage;
  let fixture: ComponentFixture<ClientAjouterPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ClientAjouterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
