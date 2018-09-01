# **Condent Conductor**

The Condent Conductor module provides the functionality for moving 
TemplateRefs between multiple ViewContainerRefs referenced with
string name values.

## **Creating Containers**

Containers can be defined inside a Component template with the 
[ContentContainerDirective](../directives/ContentContainerDirective.html)
or a custom directive that extends [ContentContainerDirective](../directives/ContentContainerDirective.html).

```html
<ng-container dvk-content-container="one"></ng-container>
<ng-container dvk-content-container="two"></ng-container>
```

The string names provided to the directive can be used to reference
that container through an instance of [ContentConductor](../interfaces/ContentConductor.html).

## **Creating Content**

Content is supplied through either the [ContentDirective](../directives/ContentDirective.html) or a custom directive that extends it.  This is a structural directive so when used it must be prefixed with a `*` like `*ngIf` or `*ngFor`.

The [ContentDirective](../directives/ContentDirective.html) takes an input which represents the string name of the [ContentContainerDirective](../directives/ContentContainerDirective.html) to initially attach the view to.

```ts
  dynamicContents = [];
  dContainerName = 'one';

  addContentToAlternatingContainer() {
    this.dynamicContents.push(0);
    this.dContainerName = this.dContainerName === 'one'? 'two':'one';
  }
```

```html
<app-containers>
  <div *dvk-content="'one'">Conductor Content 1</div>
  <div *dvk-content="'two'">Conductor Content 2</div>
  <ng-container *ngFor="let c of dynamicContents">
    <div *dvk-content="dContainerName">New Content</div>
  </ng-container>
</app-containers>
```

###### **Note**

Structural directive inputs are bindings.  So the value given to the directive must either be a bound variable, `*dvk-content="containerName"`, or an anyonmous string variable, `*dvk-content="'one'"`.  Providing a bare string, `*dvk-content="one"` will result in the template attempting to bind to the component controller member `one`.

## **Extending ContentDirective**

The [ContentDirective](../directives/ContentDirective.html) can also be extended in order to provide preset initial container names or other functionality.

```ts
@Directive({
  selector: '[one-content]'
})
export class OneContentDirective extends ContentDirective {
  readonly initialContainerName = 'one';

  constructor(private tRef: TemplateRef<any>) { super(tRef) }
}
```

```ts
@Directive({
  selector: '[two-content]'
})
export class TwoContentDirective extends ContentDirective {
  readonly initialContainerName = 'two';

  constructor(private tRef: TemplateRef<any>) { super(tRef); }
}
```

```ts
  oneContents = [];
  twoContents = [];

  addToOne() {
    this.oneContents.push(0);
  }

  addToTwo() {
    this.twoContents.push(0);
  }
```

```html
<app-containers>  
  <ng-container *ngFor="let c of oneContents">
    <div *one-content>One Content</div>
  </ng-container>
  <ng-container *ngFor="let c of twoContents">
    <div *two-content>Two Content</div>
  </ng-container>
</app-containers>
```

## **Creating a Conductor**

The [ContentConductor](../interfaces/ContentConductor.html) can be created by injecting the [ContentConductorService](../injectables/ContentConductorService.html) into a component's constructor.

```ts
  constructor(private ccService: ContentConductorService) { }
```

And then calling the [createContentConductor](../injectables/ContentConductorService.html#createContentConductor) method with the QueryLists for the [ContentContainerDirectives](../directives/ContentContainerDirective.html) and the [ContentDirectives](../directives/ContentDirective.html) or their derivatives.  Generally, these QueryLists should be available during a components' ngAfterViewInit lifecycle method.

The init method starts listening to the QueryLists for changes.

```ts
  @ContentChildren(ContentDirective,{ descendants: true }) 
  contents: QueryList<ContentDirective<any>>;

  @ViewChildren(ContentContainerDirective)
  containers: QueryList<ContentContainerDirective>;

  conductor: ContentConductor<ContentContainer>;

  ngAfterViewInit() {
    this.conductor = this.ccService
      .createContentConductor(this.containers, this.contents);

    this.conductor.init('one');
  }
```

Or provide multiple [ContentDirectives](../directives/ContentDirective.html) or [ContentContainerDirectives](../directives/ContentContainerDirective.html).

```ts
  @ContentChildren(ContentDirective,{ descendants: true }) 
  contents: QueryList<ContentDirective>;

  @ContentChildren(OneContentDirective,{ descendants: true }) 
  oneContents: QueryList<OneContentDirective>;

  @ContentChildren(TwoContentDirective,{ descendants: true }) 
  twoContents: QueryList<TwoContentDirective>;


  @ViewChildren(ContentContainerDirective)
  containers: QueryList<ContentContainerDirective>;

  conductor: ContentConductor<ContentContainer>;

  constructor(
    private ccService: ContentConductorService) { }

  ngAfterViewInit() {
    this.conductor = this.ccService
      .createContentConductor(
        [this.containers], 
        [this.contents,this.oneContents,this.twoContents]);

    this.conductor.init();
  }
```

## **Using the Conductor**

Then content can be moved from one container to another by specifying
the container string names.

```ts
this.conductor.moveViews('one','two');
```

The [ContentConductor](../interfaces/ContentConductor.html) also provides the ability to move single views from one container to another based on their index inside the container.

```ts
this.conductor.moveView('one','two',3);
```

Detach a single view from any container returning the ViewRef.

```ts
const vRef: ViewRef = this.conductor.detachView('one',2);
```

Attach a view to the end of a specified container.

```ts
this.conductor.attachView('two',vRef);
```

Detach all views from a specified container.

```ts
const views: ViewRef[] = this.conductor.detachViews('one');
```

And attach an array of views to a specified container.

```ts
this.conductor.attachViews('two',views);
```

Finally the content conductor should be destroyed inside the components
ngOnDestroy method in order to free up the resources it uses.

```ts
ngOnDestroy() {
  this.conductor.destroy();
}
```

###### **Note**

All of the methods that insert views into containers also have an optional index parameter at the end that is the index to insert at.
If it is not specified the items are inserted to the end of the containers views.
