import { BreakpointObserver } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { environment } from '@/app/environments/environments';
import { BehaviorSubject, Observable } from 'rxjs';

import { ProLayout, ProLayoutContentWidth, ProLayoutMenu, ProLayoutTheme } from './pro.types';

@Injectable({ providedIn: 'root' })
export class BrandService {
  private notify$ = new BehaviorSubject<string | null>(null);
  private _isMobile = false;
  private _layout: ProLayout;

  get notify(): Observable<string | null> {
    return this.notify$.asObservable();
  }

  readonly width = 256;
  readonly widthInCollapsed = 80;
  readonly headerHeight = 64;
  readonly autoHideHeaderTop = 300;

  get isMobile(): boolean {
    return this._isMobile;
  }

  get layout(): ProLayout {
    return this._layout;
  }

  get collapsed(): boolean {
    return this.layout.collapsed;
  }

  get theme(): ProLayoutTheme {
    return this.layout.theme;
  }

  get menu(): ProLayoutMenu {
    return this.layout.menu;
  }

  get contentWidth(): ProLayoutContentWidth {
    return this.layout.contentWidth;
  }

  get fixedHeader(): boolean {
    return this.layout.fixedHeader;
  }

  get autoHideHeader(): boolean {
    return this.layout.autoHideHeader;
  }

  get fixSiderbar(): boolean {
    return this.layout.fixSiderbar;
  }

  get onlyIcon(): boolean {
    return this.menu === 'side' ? false : this.layout.onlyIcon;
  }

  get isTopMenu(): boolean {
    return this.menu === 'top' && !this.isMobile;
  }

  get isSideMenu(): boolean {
    return this.menu === 'side' && !this.isMobile;
  }

  get isFixed(): boolean {
    return this.contentWidth === 'fixed';
  }

  constructor(bm: BreakpointObserver) {
    const defaultLayout: ProLayout = {
      theme: 'dark',
      menu: 'side',
      contentWidth: 'fluid',
      fixedHeader: false,
      autoHideHeader: false,
      fixSiderbar: false,
      onlyIcon: true,
      collapsed: false,
      lang: 'vi-VN',
      colorWeak: false
    };

    this._layout = {
      ...defaultLayout,
      ...(environment.pro as any)
    };

    // Always show menu labels by default (not icon-only) unless explicitly overridden.
    this._layout.onlyIcon = false;

    const mobileMedia = 'only screen and (max-width: 767.99px)';
    bm.observe(mobileMedia).subscribe(state => this.checkMedia(state.matches));
    this.checkMedia(bm.isMatched(mobileMedia));
  }

  private checkMedia(value: boolean): void {
    this._isMobile = value;
    this._layout.collapsed = this._isMobile;
    this.notify$.next('mobile');
  }

  setLayout(name: keyof ProLayout, value: any): void {
    if (typeof this._layout[name] !== 'undefined') {
      (this._layout as any)[name] = value;
      this.notify$.next('layout');
    }
  }

  setCollapsed(status?: boolean): void {
    this.setLayout('collapsed', typeof status !== 'undefined' ? status : !this.collapsed);
  }
}
