import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DemandesPage } from './demandes.page';

describe('DemandesPage', () => {
  let component: DemandesPage;
  let fixture: ComponentFixture<DemandesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DemandesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
