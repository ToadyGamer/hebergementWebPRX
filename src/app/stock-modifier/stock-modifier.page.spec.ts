import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StockModifierPage } from './stock-modifier.page';

describe('StockModifierPage', () => {
  let component: StockModifierPage;
  let fixture: ComponentFixture<StockModifierPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(StockModifierPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
