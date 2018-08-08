import { DynamicComponentsDemoModule } from './dynamic-components-demo.module';

describe('DynamicComponentsDemoModule', () => {
  let dynamicComponentsDemoModule: DynamicComponentsDemoModule;

  beforeEach(() => {
    dynamicComponentsDemoModule = new DynamicComponentsDemoModule();
  });

  it('should create an instance', () => {
    expect(dynamicComponentsDemoModule).toBeTruthy();
  });
});
