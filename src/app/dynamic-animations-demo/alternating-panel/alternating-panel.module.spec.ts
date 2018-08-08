import { AlternatingPanelModule } from './alternating-panel.module';

describe('AlternatingPanelModule', () => {
  let alternatingPanelModule: AlternatingPanelModule;

  beforeEach(() => {
    alternatingPanelModule = new AlternatingPanelModule();
  });

  it('should create an instance', () => {
    expect(alternatingPanelModule).toBeTruthy();
  });
});
