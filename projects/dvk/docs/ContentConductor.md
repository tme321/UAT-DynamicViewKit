# **Condent Conductor**

The Condent Conductor module provides the functionality for moving 
TemplateRefs between multiple ViewContainerRefs referenced with
string name values.

## **Creating Containers**

Containers can be defined inside a Component template with the 
[ContentContainerDirective](../directives/ContentContainerDirective.html).

```html
<ng-container dvk-content-container="one"></ng-container>
<ng-container dvk-content-container="two"></ng-container>
```

The string names provided to the directive can be used to reference
that container through an instance of [ContentConductor](../interfaces/ContentConductor.html).

## **Creating a Conductor**

The [ContentConductor](../interfaces/ContentConductor.html) can be created by injecting the [ContentConductorService](../injectables/ContentConductorService.html) into a component's constructor.

```ts
  constructor(private ccService: ContentConductorService) { }
```

And then calling the [createContentConductor](../injectables/ContentConductorService.html#createContentConductor) method with the QueryLists for the [ContentContainerDirectives](../directives/ContentContainerDirective.html) and the TemplateRefs.  These QueryLists should both be available during ngAfterViewInit.

The init method specifies which container any initial content should
be in.

```ts
  @ContentChildren(ContentDirective,{ read: TemplateRef, descendants: true }) 
  contents: QueryList<TemplateRef<any>>;

  @ViewChildren(ContentContainerDirective)
  containers: QueryList<ContentContainerDirective>;

  conductor: ContentConductor<ContentContainer>;

  ngAfterViewInit() {
    this.conductor = this.ccService
      .createContentConductor(this.containers, this.contents);

    this.conductor.init('one');
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

## **Content**

Content is added to the containers by creating it inside the element that has containers in it's view and creates the conductor.  The pieces of content should be marked with the structural directive [ContentDirective](../directives/ContentDirective.html).

```html
<my-component-with-containers>
    <span *dvk-content>Some Content To Display In A Container</span>
    <other-component *dvk-content></other-component>
    <ng-container *ngFor="let item of items">
        <item-component 
            [item]="item"
            *dvk-content>
        </item-component>
    </ng-container>
</my-component-with-containers>
```
