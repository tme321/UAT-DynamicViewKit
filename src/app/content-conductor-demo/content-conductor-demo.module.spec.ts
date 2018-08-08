import { ContentConductorDemoModule } from './content-conductor-demo.module';

describe('ContentConductorDemoModule', () => {
  let contentConductorModule: ContentConductorDemoModule;

  beforeEach(() => {
    contentConductorModule = new ContentConductorDemoModule();
  });

  it('should create an instance', () => {
    expect(contentConductorModule).toBeTruthy();
  });
});
