import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentConductorDemoComponent } from './content-conductor-demo.component';

describe('ContentConductorDemoComponent', () => {
  let component: ContentConductorDemoComponent;
  let fixture: ComponentFixture<ContentConductorDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentConductorDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentConductorDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
