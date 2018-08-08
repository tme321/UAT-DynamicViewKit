/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { DynamicComponentDirective } from './dynamic-component.directive';
import {
    ComponentFactoryResolver,
    ViewContainerRef } from '@angular/core';

describe('Directive: DynamicComponentDirective', () => {
  it('should create an instance', () => {
    let directive = new DynamicComponentDirective(
      TestBed.get(ViewContainerRef), 
      TestBed.get(ComponentFactoryResolver));
    expect(directive).toBeTruthy();
  });
});
