import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticAnimationsTestComponent } from './static-animations-test.component';

describe('StaticAnimationsTestComponent', () => {
  let component: StaticAnimationsTestComponent;
  let fixture: ComponentFixture<StaticAnimationsTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaticAnimationsTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticAnimationsTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
