import 'bootstrap';
import {inject} from 'aurelia-framework';
import {Router, RouterConfiguration} from 'aurelia-router';
import {PLATFORM} from 'aurelia-pal';
import { I18N } from 'aurelia-i18n';
import * as environment from '../config/environment.json';

@inject(I18N)
export class App {
  public router: Router;
  public i18n;

  constructor(i18n) {
    this.i18n = i18n;
    this.i18n
    .setLocale(environment.currentLang)
  
    .then( () => {
       console.log('Locale is ready!');
    });
 }

  configureRouter(config: RouterConfiguration, router: Router): void {
    this.router = router;

    config.title = 'Application.Process';
    config.map([
      { route: 'add', moduleId:  PLATFORM.moduleName('views/add/index'), name : "add", nav: true, title: this.i18n.tr('add_applicant') },
      { route: 'list', moduleId:  PLATFORM.moduleName('views/landing/index'), name: 'applicants', nav: true, title: this.i18n.tr('applicant_list') },
    ]);
    config.mapUnknownRoutes('views/landing/index');
}
}
