import { DynamicAnimationsModule } from './dynamic-animations.module';

describe('DynamicAnimationsModule', () => {
  let dynamicAnimationsModule: DynamicAnimationsModule;

  beforeEach(() => {
    dynamicAnimationsModule = new DynamicAnimationsModule();
  });

  it('should create an instance', () => {
    expect(dynamicAnimationsModule).toBeTruthy();
  });
});
