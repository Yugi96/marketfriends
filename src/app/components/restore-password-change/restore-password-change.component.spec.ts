import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestorePasswordChangeComponent } from './restore-password-change.component';

describe('RestorePasswordChangeComponent', () => {
  let component: RestorePasswordChangeComponent;
  let fixture: ComponentFixture<RestorePasswordChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestorePasswordChangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestorePasswordChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
