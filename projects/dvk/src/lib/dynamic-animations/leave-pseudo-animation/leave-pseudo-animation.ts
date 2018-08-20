import { transition, animate, trigger, style } from '@angular/animations';

export const dvkLeave = trigger('dvkLeave', [
    transition('enabled => void', 
      animate('{{ leaveTiming }}', 
      style({ /* empty */ })))
  ]);