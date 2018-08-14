import { NavBarModule } from './nav-bar.module';

describe('NavBarModule', () => {
  let navBarModule: NavBarModule;

  beforeEach(() => {
    navBarModule = new NavBarModule();
  });

  it('should create an instance', () => {
    expect(navBarModule).toBeTruthy();
  });
});
