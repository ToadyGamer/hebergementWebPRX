import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DemandeModifierPage } from './demande-modifier.page';

describe('DemandeModifierPage', () => {
  let component: DemandeModifierPage;
  let fixture: ComponentFixture<DemandeModifierPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DemandeModifierPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
