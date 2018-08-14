import { style, animate } from "@angular/animations";
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
