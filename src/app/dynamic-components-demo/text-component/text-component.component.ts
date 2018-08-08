import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'text-component',
  templateUrl: './text-component.component.html',
  styleUrls: ['./text-component.component.css']
})
export class TextComponent {
  @Input() text: string;
  @Output() onClicked = new EventEmitter<MouseEvent>();
}
