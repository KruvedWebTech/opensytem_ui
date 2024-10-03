import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsCreateModalComponent } from './settings-create-modal.component';

describe('SettingsCreateModalComponent', () => {
  let component: SettingsCreateModalComponent;
  let fixture: ComponentFixture<SettingsCreateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettingsCreateModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsCreateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
