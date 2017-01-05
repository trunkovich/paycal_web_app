import { PaycalWebAppPage } from './app.po';

describe('paycal-web-app App', function() {
  let page: PaycalWebAppPage;

  beforeEach(() => {
    page = new PaycalWebAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
