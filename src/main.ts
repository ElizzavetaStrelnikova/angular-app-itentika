import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { appConfig } from './app/app.config';

// Correct the configuration to include provideHttpClient
const config = {
  ...appConfig,
  providers: [
    provideHttpClient() // Ensure HttpClient is provided
  ],
};

bootstrapApplication(AppComponent, config)
  .catch(err => console.error(err));