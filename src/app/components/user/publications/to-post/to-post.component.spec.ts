import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToPostComponent } from './to-post.component';

describe('ToPostComponent', () => {
  let component: ToPostComponent;
  let fixture: ComponentFixture<ToPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
