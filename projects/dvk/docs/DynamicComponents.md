# **Dynamic Components**

The Dynamic Components module provides a directive that will instantiate components dynamically with the ability to hook up their inputs to observable streams and provide callbacks for the instantiated components output emitters.

## **Creating a Serializer**

A [DynamicComponentSerializer](./interfaces/DynamicComponentSerializer.html) is used to translate between a string name and a Component class instance.  This allows the string name to be stored inside an ngrx store, transmitted to a server, or any other use that might be desired and the data can be used later to instantiate the same dynamic component.  

A serializer can be created with the [createSerializer](./injectables/DynamicComponentSerializerService.html#createSerializer) method of the [DynamicComponentSerializerService](./injectables/DynamicComponentSerializerService.html).  

First inject the service into a components constructor.

```ts
constructor(private dcsService :DynamicComponentSerializerService) {} 
```

And then pass the [createSerializer](./injectables/DynamicComponentSerializerService.html#createSerializer) method a [DynamicComponentsMap](./interfaces/DynamicComponentsMap.html) of string names to component class instances.

```ts
serializer: DynamicComponentSerializer;

ngOnInit() {
    this.serializer = this.dcsService.createSerializer({
        'textComponent': TextComponent,
        'numberComponent': NumberComponent
    });
}
```

This serializer is stateless other than the map and can be reused for any number of instances of [DynamicComponentDirectives](./directives/DynamicComponentDirective.html).

## **Creating a DynamicComponentModel**

A [DynamicComponentModel](./interfaces/DynamicComponentModel.html) is the model that the [DynamicComponentDirective](./directives/DynamicComponentDirective.html) uses to instantiate a component and hook up any streams specified.

A [DynamicComponentModel](./interfaces/DynamicComponentModel.html) extends the [DynamicComponentData interface](./interfaces/DynamicComponentData.html).  The [DynamicComponentData interface](./interfaces/DynamicComponentData.html) was designed to be serializable so it can be stored or transferred as desired.  It consists of a name string and an initialValues object.  The name is the serialized name of the component that should be instantiated.  The initializedValues should be a map of fields inside the component class type to the desired initial values for those fields.  As long as the field values are serializable this entire data structure can be safely stored and used for any purpose.

```ts
@Component({
    template: `
        <div (click)="textClicked.emit($event)">
        {{text}}
        </div>
    `
})
class TextComponent {
    @Input() text: string;
    @Output() textClicked = new EventEmitter<MouseEvent>();
}

const data: DynamicComponentData = {
    name: 'textComponent',
    initialValues: {
        'text': 'The initial text for this component'
    }
}
```

This data structure can be combined with the other fields of the [DynamicComponentModel](./interfaces/DynamicComponentModel.html) before it is applied to the directive.

```ts
text$ = new Subject<string>();

onClick = (e: MouseEvent) => {
    console.log('Dynamic component was clicked');
}

const model: DynamicComponentModel = {
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
```

###### **Note**

The context of `this` inside callbacks will be the dynamic component and not the class where the callback is defined unless the callback method is defined as an arrow function or the value of `this` is bound before passing the result to the dynamic component.  This example uses an arrow function to preserve the context of `this` inside the onClick callback.

## **Creating a DynamicComponentDirective**

With the model set up and a serializer created those two pieces can now be passed off to an instance of the [DynamicComponentDirectives](./directives/DynamicComponentDirective.html) inside the template of a component.

```html
<ng-container 
    [dvk-dc]="model"
    [serializer]="serializer">
</ng-container>
```

The [DynamicComponentDirective](./directives/DynamicComponentDirective.html) will use the serializer to resolve the string name to a component and create an instance of it.  It will apply any specified initial values during instantiation.  Then it will hook up any specified input streams and output callbacks to the members of the component.

The directive will track and properly dispose of the subscriptions for the streams and will trigger change detection manually when new values are emited from the input streams.  The input streams also have a distinct until changed operator applied.  The directive should manage these streams in the same way that the async pipe does for other components.
