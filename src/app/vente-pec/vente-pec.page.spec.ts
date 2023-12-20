import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VentePecPage } from './vente-pec.page';

describe('VentePecPage', () => {
  let component: VentePecPage;
  let fixture: ComponentFixture<VentePecPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(VentePecPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
