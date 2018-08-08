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
  state: string = 'open';
  cssMap = { 'open': 'dad-open', 'closed' : 'dad-closed'};

  constructor() { }

  ngOnInit() {
  }

  toggleState() {
    if(this.state === 'closed') { this.state = 'open'; }
    else if(this.state === 'open') { this.state = 'closed'; }
  }

}
