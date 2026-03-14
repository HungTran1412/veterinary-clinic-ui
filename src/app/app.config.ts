import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LayoutModule as CdkLayoutModule } from '@angular/cdk/layout';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { icons } from './icons';

import { routes } from './app.routes';
import { I18NService } from './shared-ui/core/i18n/i18n.service'; // THÊM

registerLocaleData(en);

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/tmp/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideNzI18n(en_US),
    importProvidersFrom(FormsModule),
    provideHttpClient(),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      })
    ),
    // Cung cấp các service của NG-ZORRO
    importProvidersFrom(CdkLayoutModule),
    importProvidersFrom(NzMessageModule),
    importProvidersFrom(NzNotificationModule),
    importProvidersFrom(NzModalModule),
    importProvidersFrom(NzIconModule.forRoot(icons)),

    // Cung cấp service I18N một cách tường minh
    I18NService
  ]
};
