import { HttpClientModule } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { de } from 'date-fns/locale';
import { DateFnsConfigurationService } from 'ngx-date-fns';

import { routes } from './app.routes';

const dateConfig = new DateFnsConfigurationService();
dateConfig.setLocale(de);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    { provide: DateFnsConfigurationService, useValue: dateConfig },
    importProvidersFrom(HttpClientModule),
  ],
};
