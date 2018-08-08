import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicAnimationsDemoComponent } from './dynamic-animations-demo.component';

describe('DynamicAnimationsDemoComponent', () => {
  let component: DynamicAnimationsDemoComponent;
  let fixture: ComponentFixture<DynamicAnimationsDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicAnimationsDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicAnimationsDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
