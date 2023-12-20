import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VenteVPage } from './vente-v.page';

describe('VenteVPage', () => {
  let component: VenteVPage;
  let fixture: ComponentFixture<VenteVPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(VenteVPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
