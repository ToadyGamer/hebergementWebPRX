import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FacturesPage } from './factures.page';

describe('FacturesPage', () => {
  let component: FacturesPage;
  let fixture: ComponentFixture<FacturesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FacturesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
