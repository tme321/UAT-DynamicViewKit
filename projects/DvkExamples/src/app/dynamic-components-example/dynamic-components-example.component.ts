import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { DynamicComponentSerializerService, DynamicComponentSerializer, DynamicComponentData, DynamicComponentModel } from '@uat/dvk';
import { TextComponent } from './text/text.component';
import { NumberComponent } from './number/number.component';

@Component({
  selector: 'dex-dynamic-components-example',
  templateUrl: './dynamic-components-example.component.html',
  styleUrls: ['./dynamic-components-example.component.css']
})
export class DynamicComponentsExampleComponent implements OnInit {

  serializer: DynamicComponentSerializer;

  text$ = new Subject<string>();
  newText: string;

  clickedCounter = 0;

  onClick = (e: MouseEvent) => {
      this.clickedCounter++;
  }

  data: DynamicComponentData<TextComponent> = {
    name: 'textComponent',
    initialValues: {
        'text': 'The initial text for this component'
    }
  }

  model: DynamicComponentModel<TextComponent> = {
    ...this.data,
    inputs$: {
        text: this.text$.asObservable()
    },
    outputCallbacks: {
        textClicked: this.onClick
    },
    providers: [
    /* Any custom providers for the component can be supplied here */
    ]
  }  

  constructor(private dcsService :DynamicComponentSerializerService) { }

  ngOnInit() {
    this.serializer = this.dcsService.createSerializer({
      'textComponent': TextComponent,
      'numberComponent': NumberComponent
    });
  }

  setText(e: any) {
    this.newText = e.target.value;
  }

  emitText() {
    if(this.newText) {
      this.text$.next(this.newText);
    }
  }

}
