import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { environment } from './environments/environment';

bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));

if (environment.loadMSW) {
  (async () => {
    const { worker } = await import('./mocks/browser');

    worker.start({
      onUnhandledRequest: 'bypass',
    });
  })();
}
