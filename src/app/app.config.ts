import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { IxModule } from '@siemens/ix-angular';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { AgGridModule } from 'ag-grid-angular';
import { DatePipe } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes),
     provideClientHydration(),
     provideHttpClient(withFetch()),
    { provide: "baseUrl", useValue: "https://localhost:7299/api", multi: true},
     importProvidersFrom(
      IxModule.forRoot(),
      BrowserModule,
      BrowserAnimationsModule,
      AgGridModule
      ),
      AgGridModule,
      DatePipe,
      provideAnimations(),]
};
