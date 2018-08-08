import { animation, trigger, state, style, transition, group, animate } from "@angular/animations";
import { AnimationMetadata } from '@angular/animations';

export const downSlide: AnimationMetadata[] = [
    style({ 
        transform: `scaleY(0.0)`, 
        'transform-origin': 'top' 
    }),
    animate('500ms', 
      style({ 
          transform: `scaleY(1.0)`, 
          'transform-origin': 'top' 
    }))
  ]; 

export const upSlide: AnimationMetadata[] = [
    style({ 
        transform: `scaleY(1.0)`, 
        'transform-origin': 'top' 
    }),
    animate('500ms', 
        style({ 
            transform: `scaleY(0.0)`, 
            'transform-origin': 'top' 
    }))
]; 

/*
export function verticalSlideAnimations(): AnimationMetadata  {
    return trigger('verticalTrigger', [
        state(SlideAnimationDirections.CLOSE, style({
            transform: 'scaleY(0)', 
        })),
        state(SlideAnimationDirections.SLIDE_DOWN, style({
            transform: 'scaleY(1)', 
        })),
        state(SlideAnimationDirections.SLIDE_UP, style({
            transform: 'scaleY(1)', 
        })),
        transition(
                / *
                SlideDirections.CLOSE + 
                ' => ' + 
                SlideDirections.SLIDE_DOWN, 
                * /
                `${SlideAnimationDirections.CLOSE} => ${SlideAnimationDirections.SLIDE_DOWN}`, 
                [
            style({ 
                transform: 'scaleY(0)', 
                'transform-origin': 'top' 
            }),
            animate('150ms ease-in', 
                style({ 
                    transform: 'scaleY(1)', 
                    'transform-origin': 'top' 
            })),
        ]),
        transition(
            `${SlideAnimationDirections.SLIDE_DOWN} => ${SlideAnimationDirections.CLOSE}`,
            / *
                SlideDirections.SLIDE_DOWN + 
                ' => ' + 
                SlideDirections.CLOSE, 
            * /
            [
            style({ 
                transform: 'scaleY(1)', 
                'transform-origin': 'top' 
            }),
            animate('150ms ease-out', 
                style({ 
                    transform: 'scaleY(0)', 
                    'transform-origin': 'top' 
            
            })),
        ]),
        transition(
            SlideAnimationDirections.CLOSE + 
            ' => ' + 
            SlideAnimationDirections.SLIDE_UP, [
            style({ 
                transform: 'scaleY(0)', 
                'transform-origin': 'bottom' 
            }),
            animate('150ms ease-in', 
                style({ 
                    transform: 'scaleY(1)', 
                    'transform-origin': 'bottom' 
            })),
        ]),
        transition(
            SlideAnimationDirections.SLIDE_UP + 
            ' => ' + 
            SlideAnimationDirections.CLOSE, [
            style({ 
                transform: 'scaleY(1)', 
                'transform-origin': 'bottom' 
            }),
            animate('150ms ease-out', 
                style({ 
                    transform: 'scaleY(0)', 
                    'transform-origin': 'bottom' 
            
            })),
        ])
        
    ]);
}

export function horizontalSlideAnimations(): AnimationMetadata  {
    return trigger('horizontalTrigger', [
        state(SlideAnimationDirections.CLOSE, style({
            transform: 'scaleX(0)', 
        })),
        state(SlideAnimationDirections.SLIDE_RIGHT, style({
            transform: 'scaleX(1)', 
        })),
        state(SlideAnimationDirections.SLIDE_LEFT, style({
            transform: 'scaleX(1)', 
        })),
        transition(
            SlideAnimationDirections.CLOSE + 
            ' => ' + 
            SlideAnimationDirections.SLIDE_RIGHT, [
            style({ 
                transform: 'scaleX(0)', 
                'transform-origin': 'left' 
            }),
            animate('150ms ease-in', 
                style({ 
                    transform: 'scaleX(1)', 
                    'transform-origin': 'left' 
            })),
        ]),
        transition(
            SlideAnimationDirections.SLIDE_RIGHT + 
            ' => ' + 
            SlideAnimationDirections.CLOSE, [
            style({ 
                transform: 'scaleX(1)', 
                'transform-origin': 'left' 
            }),
            animate('150ms ease-out', 
                style({ 
                    transform: 'scaleX(0)', 
                    'transform-origin': 'left' 
            
            })),
        ]),
        transition(
            SlideAnimationDirections.CLOSE + 
            ' => ' + 
            SlideAnimationDirections.SLIDE_LEFT, [
            style({ 
                transform: 'scaleX(0)', 
                'transform-origin': 'right' 
            }),
            animate('150ms ease-in', 
                style({ 
                    transform: 'scaleX(1)', 
                    'transform-origin': 'right' 
            })),
        ]),
        transition(
            SlideAnimationDirections.SLIDE_LEFT + 
            ' => ' + 
            SlideAnimationDirections.CLOSE, [
            style({ 
                transform: 'scaleX(1)', 
                'transform-origin': 'right' 
            }),
            animate('150ms ease-out', 
                style({ 
                    transform: 'scaleX(0)', 
                    'transform-origin': 'right' 
            
            })),
        ])
        
    ]);
}
*/