import {
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import {
  ApplicationConfig,
  ErrorHandler,
  importProvidersFrom,
} from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { de } from 'date-fns/locale';
import { DateFnsConfigurationService } from 'ngx-date-fns';

import { routes } from './app.routes';
import { GlobalErrorHandler } from './error/global-error-handler';
import { serverErrorInterceptor } from './error/server-error.interceptor';

const dateConfig = new DateFnsConfigurationService();
dateConfig.setLocale(de);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    { provide: DateFnsConfigurationService, useValue: dateConfig },
    importProvidersFrom(HttpClientModule),
    { provide: MAT_DATE_LOCALE, useValue: 'de-DE' },
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    provideHttpClient(withInterceptors([serverErrorInterceptor])),
  ],
};
