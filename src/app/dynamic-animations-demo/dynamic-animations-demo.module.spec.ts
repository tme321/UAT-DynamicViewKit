import { DynamicAnimationsDemoModule } from './dynamic-animations-demo.module';

describe('DynamicAnimationsDemoModule', () => {
  let dynamicAnimationsDemoModule: DynamicAnimationsDemoModule;

  beforeEach(() => {
    dynamicAnimationsDemoModule = new DynamicAnimationsDemoModule();
  });

  it('should create an instance', () => {
    expect(dynamicAnimationsDemoModule).toBeTruthy();
  });
});
