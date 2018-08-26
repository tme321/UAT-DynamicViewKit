import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'dex-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css']
})
export class TextComponent {
  @Input() text: string;
  @Output() textClicked = new EventEmitter<MouseEvent>();
}
