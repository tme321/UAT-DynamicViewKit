import { sequence } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { sequenceEqual } from '../../../../node_modules/rxjs/operators';

@Component({
  selector: 'app-static-animations-test',
  templateUrl: './static-animations-test.component.html',
  styleUrls: ['./static-animations-test.component.css'],
  animations: [
    trigger('animTrigger',[
      state('open',
        style({
          'transform-origin': 'top',
          'transform': `scaleY(1.0)`,
        })),
      state('closed',
        style({
          'transform-origin': 'top',
          'transform': `scaleY(0.0)`,
        })),
      //transition('*<=>*',animate('500ms')),      
      transition('closed=>open',[ //sequence([
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
      ]),//),
      transition('open=>closed',
        style({
          'background-color': 'red'
        })),

      /*sequence([
        style({
          'background-color': 'red'
        }),
        animate('500ms')
      ])),*/
    ])
  ]
})
export class StaticAnimationsTestComponent implements OnInit {
  state: 'open' | 'closed' = 'open';

  constructor() { }

  ngOnInit() {
  }

  toggleState() {
    if(this.state === 'open') { this.state = 'closed'; }
    else if(this.state === 'closed') { this.state = 'open'; }
  }

}
