import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ProductsComponent} from './products/products.component';
import {OrdersComponent} from './orders/orders.component';
import {OrderDetatilsComponent} from './order-detatils/order-detatils.component';
import {KeycloakAngularModule, KeycloakService} from 'keycloak-angular';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({

      config: {
        url: 'http://localhost:8080',
        realm: 'ecom-realm',
        clientId: 'ecom-client',
      },
      initOptions: {
        onLoad: 'check-sso',
        //silentCheckSsoRedirectUri:window.location.origin + '/assets/silent-check-sso.html',
        checkLoginIframe : true
      },
    });
}

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    OrdersComponent,
    OrderDetatilsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    KeycloakAngularModule
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      deps: [KeycloakService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
