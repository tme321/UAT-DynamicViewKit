import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlternatingPanelComponent } from './alternating-panel.component';

describe('AlternatingPanelComponent', () => {
  let component: AlternatingPanelComponent;
  let fixture: ComponentFixture<AlternatingPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlternatingPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlternatingPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
