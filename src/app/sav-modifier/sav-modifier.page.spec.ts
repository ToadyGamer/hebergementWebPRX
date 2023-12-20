import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SavModifierPage } from './sav-modifier.page';

describe('SavModifierPage', () => {
  let component: SavModifierPage;
  let fixture: ComponentFixture<SavModifierPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SavModifierPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
