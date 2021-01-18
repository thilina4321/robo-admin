import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterDoctoeComponent } from './register-doctoe.component';

describe('RegisterDoctoeComponent', () => {
  let component: RegisterDoctoeComponent;
  let fixture: ComponentFixture<RegisterDoctoeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterDoctoeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterDoctoeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
