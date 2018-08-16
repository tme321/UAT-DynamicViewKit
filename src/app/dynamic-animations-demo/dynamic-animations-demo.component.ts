import { transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { style } from '@angular/animations';
import { AnimationTransitions } from '@uat/dvk/uat-dvk';
import { upSlide, downSlide, transTest } from './animations/animations';

@Component({
  selector: 'dynamic-animations-demo',
  templateUrl: './dynamic-animations-demo.component.html',
  styleUrls: ['./dynamic-animations-demo.component.css']
})
export class DynamicAnimationsDemoComponent implements OnInit {

  transitions: AnimationTransitions = {
    initialStyles: {
      'closed': style({ 
          transform: `scaleY(0.0)`,
          'transform-origin': 'top' 
        }),
      'open': style({})
    },
    onTransitions: {
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
    console.log(transTest);
    
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

  newState = 'closed';
  newShow = true;
  newTrans = [
    transition('*=>closed',upSlide),
    transition('closed=>*',downSlide),
    transition('void=>closed',upSlide),
    transition('void=>open',downSlide),
    transition('*=>void',upSlide),
  ];

  toggleNewState() {
    if(this.newState === 'closed') { 
      this.newState = 'open'; 
    }
    else if(this.newState === 'open') { 
      this.newState = 'closed'; 
    }
  }

}
