import { HTTP_INTERCEPTORS, provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { NgIconsModule } from '@ng-icons/core';
import {
  featherAlertCircle as iconAlertCircle,
  featherArchive as iconArchive,
  featherCheck as iconCheck,
  featherEdit as iconEdit,
  featherX as iconX
} from '@ng-icons/feather-icons';
import { routes } from './app.routes';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';

const ngIconsConfig = NgIconsModule.withIcons({ 
  featherEdit: iconEdit,
  featherCheck: iconCheck,
  featherX: iconX,
  featherArchive: iconArchive,
  featherAlertCircle: iconAlertCircle
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideAnimations(),
    ...(ngIconsConfig.providers || []),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ]
};
