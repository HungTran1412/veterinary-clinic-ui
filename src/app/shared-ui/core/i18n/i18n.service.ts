import { Platform } from '@angular/cdk/platform';
import { registerLocaleData } from '@angular/common';
import ngEn from '@angular/common/locales/en';
import ngVi from '@angular/common/locales/vi';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@/app/environments/environments';
import { SETTING_KEY_BUILD } from '@/app/utils';
import { enUS as dfEn, vi as dfVi } from 'date-fns/locale';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { en_US as zorroEnUS, NzI18nService, vi_VN as zorroViVN } from 'ng-zorro-antd/i18n';
import { BehaviorSubject, Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

interface LangConfigData {
  abbr: string;
  text: string;
  ng: NzSafeAny;
  zorro: NzSafeAny;
  date: NzSafeAny;
}

const DEFAULT = 'vi-VN';
const LANGS: { [key: string]: LangConfigData } = {
  'vi-VN': {
    text: 'Tiếng Việt',
    ng: ngVi,
    zorro: zorroViVN,
    date: dfVi,
    abbr: '🇻🇳'
  },
  'en-US': {
    text: 'English',
    ng: ngEn,
    zorro: zorroEnUS,
    date: dfEn,
    abbr: '🇬🇧'
  }
};

@Injectable({ providedIn: 'root' })
export class I18NService {
  private _defaultLang = DEFAULT;
  private _currentLang = DEFAULT;
  private _change$ = new BehaviorSubject<string>(DEFAULT);

  private _langs = Object.keys(LANGS).map(code => {
    const item = LANGS[code];
    return { code, text: item.text, abbr: item.abbr };
  });

  constructor(
    private http: HttpClient,
    private nzI18nService: NzI18nService,
    private platform: Platform,
    private translate: TranslateService
  ) {
    const defaultLang = this.getDefaultLang();
    this._defaultLang = this._langs.findIndex(w => w.code === defaultLang) === -1 ? DEFAULT : defaultLang;
    this.use(this._defaultLang);
  }

  get change(): Observable<string> {
    return this._change$.asObservable();
  }

  private getDefaultLang(): string {
    if (!this.platform.isBrowser) {
      return DEFAULT;
    }
    // Bạn có thể thêm logic lấy ngôn ngữ từ localStorage ở đây nếu muốn
    // const savedLang = localStorage.getItem('lang');
    // if (savedLang) return savedLang;

    return DEFAULT;
  }

  use(lang: string): void {
    const item = LANGS[lang];
    if (!item) return;

    registerLocaleData(item.ng);
    this.nzI18nService.setLocale(item.zorro);
    this.nzI18nService.setDateLocale(item.date);

    // Sử dụng ngx-translate để đổi ngôn ngữ
    this.translate.use(lang);

    this._currentLang = lang;
    this._change$.next(lang);
  }

  getLangs(): Array<{ code: string; text: string; abbr: string }> {
    return this._langs;
  }

  fanyi(key: string, interpolateParams?: Object): string {
    return this.translate.instant(key, interpolateParams);
  }
}
