import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VentePecModifierPage } from './vente-pec-modifier.page';

describe('VentePecModifierPage', () => {
  let component: VentePecModifierPage;
  let fixture: ComponentFixture<VentePecModifierPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(VentePecModifierPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
