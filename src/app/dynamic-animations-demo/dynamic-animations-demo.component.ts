import { transition, animate, state, sequence } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { style } from '@angular/animations';
import { AnimationTransitionsMap, dvkLeave } from '@uat/dvk';
import { upSlide, downSlide, transTest, seqSlideUp, keyframesSlideDown, staggerSlideUp, stateTest, triggerTest, animStyle, groupSlideDown } from './animations/animations';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'dynamic-animations-demo',
  templateUrl: './dynamic-animations-demo.component.html',
  styleUrls: ['./dynamic-animations-demo.component.css'],
  animations: [dvkLeave]
})
export class DynamicAnimationsDemoComponent implements OnInit {

  cssMap = { 
    'open': 'dad-open', 
    'closed' : 'dad-closed'
  };

  constructor() { }

  ngOnInit() {
  }

  newState = 'closed';
  newShow = true;
  newTrans = [
    /*
    transition('open=>closed', 
      animate('500ms')),
    */
    transition('open=>closed',
      animate('500ms')), 
   
      /*
    transition('closed=>open',
      animate('500ms' //)), 
      
      , style({
        transform: `scaleY(1.5)`,
        'transform-origin': 'top',
        'background-color': 'green' 
      }))),
      */

     transition('closed=>open', [//sequence([
      animate('500ms', style({
        'transform-origin': 'top',
        'transform': `scaleY(2.0)`,
        'background-color': 'green'
      })),
      animate('3000ms'),
      sequence([
        animate('2000ms'),
        animate('500ms', style({
          'transform-origin': 'top',
          'transform': `scaleY(1.5)`,
          'background-color': 'blue'
        }))
        ]),
      ]), //),


    transition(':enter',
      animate('500ms' )), 

    transition(':leave',
      animate('500ms' )), 


    state('void', style({ 
        transform: `scaleY(1.0)`,
        'transform-origin': 'top' 
    })),
        
    
    state('closed', style({ 
      transform: `scaleY(0.0)`,
      'transform-origin': 'top' 
    })),
    state('open', style({
      transform: `scaleY(1.0)`,
      'transform-origin': 'top' 
    }))    
  ];

  divs$ = new BehaviorSubject<any[]>([]);

  divs = 0;
  addDiv() {
    this.divs++;
    this.divs$.next(new Array(this.divs).fill(true));
  }

  toggleNewState() {
    if(this.newState === 'closed') { 
      this.newState = 'open'; 
    }
    else if(this.newState === 'open') { 
      this.newState = 'closed'; 
    }
  }

}
