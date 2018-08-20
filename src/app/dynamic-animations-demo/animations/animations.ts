import { style, animate, transition, sequence, group, keyframes, query, stagger, state, trigger } from "@angular/animations";
import { AnimationMetadata } from '@angular/animations';

export const downSlide: AnimationMetadata[] = [   
    animate('500ms', 
      style({ 
          transform: `scaleY(1.0)`, 
          'transform-origin': 'top' 
    }))
  ]; 

export const upSlide: AnimationMetadata[] = [
    animate('500ms', 
        style({ 
            transform: `scaleY(0.0)`, 
            'transform-origin': 'top' 
    }))
]; 

export const seqSlideUp = sequence([
    style({ 
        transform: `scaleY(1.0)`,
        height: '250px',         
        'transform-origin': 'top' 
    }),
    animate('500ms', 
        style({ 
            transform: `scaleY(0.0)`, 
            'transform-origin': 'top' 
    }))
]); 

export const groupSlideDown = group([sequence([
    style({ 
        transform: `scaleY(0.0)`,
        height: '250px', 
        'transform-origin': 'top' 
    }),
    animate('500ms', 
      style({ 
          transform: `scaleY(1.0)`, 
          'transform-origin': 'top' 
    }))
  ]),
  style({
    'background-color': 'white'
  }),
  animate('500ms',style({
      'background-color': 'black'
  })),
  animate('600ms',style({
    'background-color': 'green'
    }))


]); 

export const keyframesSlideDown = group([
    sequence([
        animate('500ms', 
            style({ 
            transform: `scaleY(1.0)`, 
            //height: '250px',          
            'transform-origin': 'top' 
            }))
        ]),
    animate("500ms", keyframes([
        style({ backgroundColor: "red", offset: 0 }),
        style({ backgroundColor: "blue", offset: 0.2 }),
        style({ backgroundColor: "orange", offset: 0.3 }),
        style({ backgroundColor: "black", offset: 1 })
      ]))
]);

export const staggerSlideUp = transition('* => *', [ 
    query(':leave', [
      stagger(100, [
        animate('0.5s', style({ opacity: 0 }))
      ])
    ]),
    query(':enter', [
      style({ opacity: 0 }),
      stagger(100, [
        animate('0.5s', style({ opacity: 1 }))
      ])
    ])
  ]);

export const redIn = query(":enter", [
    animate('0ms',
        style({
            'background-color': 'red'
        }))
])

export const transTest = transition('closed => open',upSlide);

export const stateTest = state('someState',style({
    'background-color': 'yellow'
}));

export const triggerTest = trigger('@atrig',[
    state('a',
        style({
            transform: `scaleY(1.0)`, 
            'transform-origin': 'top' 
    })),
    transition('a=>b',animate('5ms')),
    transition('b=>a',animate('2ms')),
    state('b',
        style({
            transform: `scaleY(1.0)`, 
            'transform-origin': 'top' 
    }))
]);


export const animateMulStyle =  
    animate('500ms', 
      style({ 
          transform: `scaleY(1.0)`, 
          'transform-origin': 'top' 
    })); 


export const animStyle = 
    animate('500ms', 
        style({ 
            transform: `scaleY(0.0)`, 
            'transform-origin': 'top' 
    })); 