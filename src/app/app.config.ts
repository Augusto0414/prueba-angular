import { HTTP_INTERCEPTORS, provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { NgIconsModule } from '@ng-icons/core';
import {
  featherAlertCircle,
  featherArchive,
  featherCheck,
  featherEdit,
  featherX
} from '@ng-icons/feather-icons';
import { routes } from './app.routes';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';

const ngIconsModule = NgIconsModule.withIcons({
  featherEdit,
  featherCheck,
  featherX,
  featherArchive,
  featherAlertCircle
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideAnimations(),
    ...(ngIconsModule.providers || []),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ]
};
