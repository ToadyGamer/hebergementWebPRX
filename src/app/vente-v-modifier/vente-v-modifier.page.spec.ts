import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VenteVModifierPage } from './vente-v-modifier.page';

describe('VenteVModifierPage', () => {
  let component: VenteVModifierPage;
  let fixture: ComponentFixture<VenteVModifierPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(VenteVModifierPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
