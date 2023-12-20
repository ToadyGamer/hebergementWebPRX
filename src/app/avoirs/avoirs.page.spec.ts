import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AvoirsPage } from './avoirs.page';

describe('AvoirsPage', () => {
  let component: AvoirsPage;
  let fixture: ComponentFixture<AvoirsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AvoirsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
