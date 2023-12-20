import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChiffreAffairePage } from './chiffre-affaire.page';

describe('ChiffreAffairePage', () => {
  let component: ChiffreAffairePage;
  let fixture: ComponentFixture<ChiffreAffairePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ChiffreAffairePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
