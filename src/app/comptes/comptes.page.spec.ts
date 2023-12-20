import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComptesPage } from './comptes.page';

describe('ComptesPage', () => {
  let component: ComptesPage;
  let fixture: ComponentFixture<ComptesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ComptesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
