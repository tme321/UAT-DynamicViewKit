import { Component, OnInit } from '@angular/core';
import { upSlide, downSlide } from './animations/animations';

@Component({
  selector: 'dynamic-animations-demo',
  templateUrl: './dynamic-animations-demo.component.html',
  styleUrls: ['./dynamic-animations-demo.component.css']
})
export class DynamicAnimationsDemoComponent implements OnInit {

  transitions = {
    'open': { 'closed':  upSlide},
    'closed': { 'open':  downSlide},
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
