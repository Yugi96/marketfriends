import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeImageProfileComponent } from './change-image-profile.component';

describe('ChangeImageProfileComponent', () => {
  let component: ChangeImageProfileComponent;
  let fixture: ComponentFixture<ChangeImageProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeImageProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeImageProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
