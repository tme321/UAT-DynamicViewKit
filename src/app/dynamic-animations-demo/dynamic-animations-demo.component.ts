import { transition, animate, state } from '@angular/animations';
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
    /*
    console.log(style({
      transform: `scaleY(0.0)`,
      'transform-origin': 'top'       
    }));

    console.log(state('a', 
      style({
        transform: `scaleY(0.0)`,
        'transform-origin': 'top'       
      })));
    */
    //console.log(transTest);
    /*
    console.log('stateTest',stateTest);
    console.log('upSlide',upSlide);
    console.log('keyframesSlideDown', keyframesSlideDown);
    console.log('animate', animate('500ms'));
    console.log('triggerTest',triggerTest);
    console.log('animStyle',animStyle);
    console.log('style',style({
      transform: `scaleY(0.0)`,
      'transform-origin': 'top' 
    }));
    console.log('groupSlideDown',groupSlideDown);

    console.log('transition', 
    transition('closed=>open',
      animate('500ms',style({
        transform: `scaleY(0.0)`,
        'transform-origin': 'top' 
      }))));

    console.log('seqSlideUp',seqSlideUp);
    */
  }

  /*
   * Ignore this for the moment: 
   * Works:
   * transition, animate, style, group, keyframes, sequence
   * 
   * 
   * state?
   * 
   * 
   * stagger seems to work, maybe, but needs more testing.
   * animateChild not sure, maybe?
  *
   * query can't tell, definitely doesn't support triggers
   * 
   * trigger not sure how to support the state member of the
   * animation directive is the same thing as the trigger?
   * 
   * animation - don't need to support because it returns 
   * animation metadata? 
   */

   

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
      style({
        'background-color': 'red'
      })),
    */
    transition('closed=>open',
      animate('500ms' )), 
      /*
      , style({
        transform: `scaleY(1.5)`,
        'transform-origin': 'top',
        'background-color': 'green' 
      }))),
      
    */
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
