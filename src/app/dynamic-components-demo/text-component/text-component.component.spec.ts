import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextComponentComponent } from './text-component.component';

describe('TextComponentComponent', () => {
  let component: TextComponentComponent;
  let fixture: ComponentFixture<TextComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
