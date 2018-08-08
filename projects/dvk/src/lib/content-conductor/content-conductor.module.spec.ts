import { ContentConductorModule } from './content-conductor.module';

describe('ContentConductorModule', () => {
  let contentConductorModule: ContentConductorModule;

  beforeEach(() => {
    contentConductorModule = new ContentConductorModule();
  });

  it('should create an instance', () => {
    expect(contentConductorModule).toBeTruthy();
  });
});
