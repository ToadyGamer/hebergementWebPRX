import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientModifierPage } from './client-modifier.page';

describe('ClientModifierPage', () => {
  let component: ClientModifierPage;
  let fixture: ComponentFixture<ClientModifierPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ClientModifierPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
