import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompteModifierPage } from './compte-modifier.page';

describe('CompteModifierPage', () => {
  let component: CompteModifierPage;
  let fixture: ComponentFixture<CompteModifierPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CompteModifierPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
