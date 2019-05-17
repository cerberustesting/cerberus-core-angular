import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { KeycloakService } from 'src/app/core/services/auth/keycloak.service'

if (environment.production) {
  enableProdMode();
}

if (environment.keycloakActive) {
  KeycloakService.init()
    .then(() => platformBrowserDynamic().bootstrapModule(AppModule))
    //.catch(e => window.location.reload());
    .catch(err => console.log(err));
} else {
  platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.log(err));
}
