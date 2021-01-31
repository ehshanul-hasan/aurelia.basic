import {Aurelia} from 'aurelia-framework';
import * as environment from '../config/environment.json';
import {PLATFORM} from 'aurelia-pal';
import {bootstrap} from 'aurelia-bootstrapper';

export function configure(aurelia: Aurelia): void {
  aurelia.use
    .standardConfiguration()
    .feature(PLATFORM.moduleName('resources/index'));

  aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');

  if (environment.testing) {
    aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'));
  }

  var resBundle = require(
    "i18next-resource-store-loader!./assets/i18n/index.ts"
  );
  bootstrap(async aurelia => {
    aurelia.use
      .standardConfiguration()
      .plugin(PLATFORM.moduleName('aurelia-validation'))
      .plugin(PLATFORM.moduleName('aurelia-dialog'))
      .plugin(PLATFORM.moduleName('aurelia-i18n'), (instance) => {
        return instance.setup({
          resources  : resBundle, //<-- configure aurelia-i18n to use bundled translations
          lng        : 'de',
          attributes : ['t'],
          fallbackLng: 'en',
          debug      : false,
        });
      })
      .developmentLogging();
  
    await aurelia.start();
    aurelia.setRoot(PLATFORM.moduleName('app'), document.body);
  });
}
