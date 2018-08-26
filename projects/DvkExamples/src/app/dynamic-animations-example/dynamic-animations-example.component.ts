import { state, style, transition, animate } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'dex-dynamic-animations-example',
  templateUrl: './dynamic-animations-example.component.html',
  styleUrls: ['./dynamic-animations-example.component.css']
})
export class DynamicAnimationsExampleComponent {
  cssMap = { 
    'open': 'is-open', 
    'closed' : 'is-closed'
  };

  newState = 'closed';

  animations = [
    state('closed', style({ 
      transform: `scaleY(0.0)`,
      'transform-origin': 'top' 
    })),
    state('open', style({
      transform: `scaleY(1.0)`,
      'transform-origin': 'top' 
    })),
    transition('open<=>closed',
      animate('200ms')),
      /* 
    transition('closed=>open',
      animate('200ms')), 
      */
  ];

  constructor() { }

  toggleNewState() {
    if(this.newState === 'closed') { 
      this.newState = 'open'; 
    }
    else if(this.newState === 'open') { 
      this.newState = 'closed'; 
    }
  }
}
