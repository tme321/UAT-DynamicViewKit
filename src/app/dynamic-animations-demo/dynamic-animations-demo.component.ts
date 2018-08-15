import { Component, OnInit } from '@angular/core';
import { style } from '@angular/animations';
import { AnimationTransitions } from '@uat/dvk/uat-dvk';
import { upSlide, downSlide } from './animations/animations';

@Component({
  selector: 'dynamic-animations-demo',
  templateUrl: './dynamic-animations-demo.component.html',
  styleUrls: ['./dynamic-animations-demo.component.css']
})
export class DynamicAnimationsDemoComponent implements OnInit {

  transitions: AnimationTransitions = {
    initial: style({ 
      transform: `scaleY(0.0)`,
      height: '250px', 
      'transform-origin': 'top' 
    }),
    transitions: {
      'open': { 'closed':  upSlide},
      'closed': { 'open':  downSlide},
    }
  };
  
  componentState: string = 'closed';
  directiveState: string = 'open';

  cssMap = { 
    'open': 'dad-open', 
    'closed' : 'dad-closed'
  };

  constructor() { }

  ngOnInit() {
  }

  toggleDirective() {
    if(this.directiveState === 'closed') { 
      this.directiveState = 'open'; 
    }
    else if(this.directiveState === 'open') { 
      this.directiveState = 'closed'; 
    }
  }

  toggleComponent() {
    if(this.componentState === 'closed') { 
      this.componentState = 'open'; 
    }
    else if(this.componentState === 'open') { 
      this.componentState = 'closed'; 
    }
  }

}
