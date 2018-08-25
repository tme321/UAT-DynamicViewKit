# **Dynamic Animations**

The Dynamic Animations module provides a directive that allow animations to be specified in the same format as standard Angular animations.  These animations are supplied at run time instead of statically in the Component decorator so a component developer can expose the animations specification and a consumer of the component can supply their own animations.

## **Defining a set of Animations**

Animations are defined using the same functions that normal Angular animations use with a few exceptions.  The animations are defined as an array containing `state` and `transition` definitions from `@angular/animations`.  A `trigger` definition is not recognized as the [DynamicAnimationsDirective](./directives/DynamicAnimationsDirective.html) supplies an `@Input` member `state` that works in the same way as a `trigger` does.

Other constraints are that no part of an animation can refer to a defined `trigger` such as one type of `query` and no part can refer to a specific `state`.  The concept of states is implemented fully by the [AnimationStateMachine](./interfaces/AnimationStateMachine.html) as the Angular AnimationBuilder does not have the same concept of states as the standard static Angular Animations.

A simple animation looks like this.

```ts
animations = [
    state('open',style({
        'transform': `scaleY(1.0)`,
        'transform-origin': 'top'
    })),
    state('closed',style({
        'transform': `scaleY(0.0)`,
        'transform-origin': 'top'
    })),
    transition('open<=>closed',animate('200ms'))
];
```

Currently supported abilities include the wild card for transitions like `*=>open` or `closed=>*` as well as `:enter`.  The `:leave` state has limited support at the moment.  Please refer to the section below.

###### **Note**

More complex animations as defined normally by Angular are supported but have not all been fully tested at this time.  If you find any animations that work statically but do not work dynamically outside of the constraints listed above please submit a bug report with the animation that does not work included.

## **Animation States**

The state itself can be represented by a string member that can be bound to the `state` `@Input` of the directive.  

```ts
currentState = 'closed';
```

The animation directive will automatically transition from the `void` state to the value of the bound state during initalization.  It will play any `:enter` or `*=>void` transitions that match the conditions as were definined in the animations.

###### **Note**

Currently only string states are supported; numerical values will not work and neither will `:increment` or `:decrement` transition styles.  Support is planned but not yet implemented.

## **Using the DynamicAnimationsDirective**

The dynamic animations directive can be attached to an element and passed the animations and the state binding.

```html
<div dvk-da
    [state]="currentState"
    [animations]="animations">
</div>
```

## **Transitioning the State**

The state can be transitioned simply by changing the value of the bound member to the next desired state.

```ts
this.currentState = 'open';
```

The transition that matches the change in state with the most specificity will be played when the value of the bound state is changed.

## **Leave Transition**

The leave transition is partially supported at the moment.

If a `:leave` animation, or `*=>void`, is speciied you must also both
add the `@dvkLeave` directive to the element and add `dvkLeave` to 
the component as a static animation.  This step is only necessary
for the leave animation. 

This is due to the fact that Angular will remove an element before a dynamic animation has a chance to play.  A static leave animation must be used to keep the element around long enough for the dynamic animation to actually play.

Currently the `dvkLeave` directive is set to a constant time of 500ms.  In the future this value will be made dynamic to match the dynamic animation supplied.

So in order to use a leave animation first attach the animation to the component metadata

```ts
@Component({
    animations: [dvkLeave]
})
```

Then add it as a trigger to the element containing the [DynamicAnimationsDirective](./directives/DynamicAnimationsDirective.html).

```html
<div dvk-da
    @dvkLeave
    [state]="currentState"
    [animations]="animations">
</div>
```

And define a leave transition inside the animations supplied to the directive.

```ts
transition(':leave',animate('200ms',
    style({ 'background-color': 'red' }))
```
