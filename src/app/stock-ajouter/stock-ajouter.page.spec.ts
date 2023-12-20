import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StockAjouterPage } from './stock-ajouter.page';

describe('StockAjouterPage', () => {
  let component: StockAjouterPage;
  let fixture: ComponentFixture<StockAjouterPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(StockAjouterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
