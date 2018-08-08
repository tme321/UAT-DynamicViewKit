import { Component } from '@angular/core';
import { TextComponent } from './text-component/text-component.component';
import { Subject } from 'rxjs';
import { DynamicComponentModel, DynamicComponentSerializerService } from '@uat/dvk';

@Component({
  selector: 'dynamic-components-demo',
  templateUrl: './dynamic-components-demo.component.html',
  styleUrls: ['./dynamic-components-demo.component.css']
})
export class DynamicComponentsDemoComponent {

  readonly textComponentName = 'textComponent';

  text$ = new Subject<string>();

  clickedCounter = 0;

  onClick = (e: MouseEvent)=> {
    this.clickedCounter++;
    this.text$.next(`Dynamic Component clicked ${this.clickedCounter} times`);
  }

  model: DynamicComponentModel<TextComponent> = {
    name: this.textComponentName,
    initialValues:{ 
      text: 'Initial Text',
    },
    outputCallbacks: {
      onClicked: this.onClick
    },
    inputs$: {
      text: this.text$.asObservable()
    }
  };

  serializer;

  constructor(private dsService: DynamicComponentSerializerService) { 
    this.serializer = this.dsService.createSerializer({
      [this.textComponentName]:TextComponent
    });
  }
}
