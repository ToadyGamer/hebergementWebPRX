import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SavPage } from './sav.page';

describe('SavPage', () => {
  let component: SavPage;
  let fixture: ComponentFixture<SavPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SavPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
