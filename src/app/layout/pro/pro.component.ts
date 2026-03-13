import { BreakpointObserver } from '@angular/cdk/layout';
import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { NavigationEnd, NavigationError, RouteConfigLoadStart, Router } from '@angular/router';
import { environment } from '@/app/environments/environments';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subject, takeUntil } from 'rxjs';

import { BrandService } from './pro.service';

@Component({
  selector: 'layout-pro',
  templateUrl: './pro.component.html',
  styleUrls: ['./styles/index.less']
})
export class LayoutProComponent implements OnInit, AfterViewInit, OnDestroy {
  private destroy$ = new Subject<void>();
  isFetching = false;

  get isMobile(): boolean {
    return this.pro.isMobile;
  }

  get getLayoutStyle(): { [key: string]: string } | null {
    const { isMobile, fixSiderbar, collapsed, menu, width, widthInCollapsed } = this.pro;
    if (fixSiderbar && menu !== 'top' && !isMobile) {
      return {
        paddingLeft: `${collapsed ? widthInCollapsed : width}px`
      };
    }
    return null;
  }

  get getContentStyle(): { [key: string]: string } {
    const { fixedHeader, headerHeight } = this.pro;
    return {
      margin: '24px 24px 0',
      'padding-top': `${fixedHeader ? headerHeight : 0}px`
    };
  }

  constructor(
    private router: Router,
    private msg: NzMessageService,
    private cdr: ChangeDetectorRef,
    public pro: BrandService,
    @Inject(DOCUMENT) private doc: any
  ) {
    // Scroll to top khi đổi route
    this.router.events.pipe(takeUntil(this.destroy$)).subscribe(evt => {
      if (!this.isFetching && evt instanceof RouteConfigLoadStart) {
        this.isFetching = true;
      }
      if (evt instanceof NavigationError) {
        this.isFetching = false;
        this.msg.error(`Không thể tải trang ${evt.url}`, { nzDuration: 3000 });
        return;
      }
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      this.isFetching = false;
      window.scrollTo(0, 0);
    });
  }

  private setClass(): void {
    const { body } = this.doc;
    const { pro } = this;

    const classesToRemove = [
      'alain-pro',
      'alain-pro__content-fluid', 'alain-pro__content-fixed',
      'alain-pro__fixed',
      'alain-pro__wide',
      'alain-pro__dark', 'alain-pro__light',
      'alain-pro__menu-side', 'alain-pro__menu-top',
      'aside-collapsed'
    ];
    body.classList.remove(...classesToRemove);

    body.classList.add('alain-pro');
    body.classList.add(`alain-pro__content-${pro.layout.contentWidth}`);
    if (pro.layout.fixedHeader) body.classList.add('alain-pro__fixed');
    if (pro.isFixed) body.classList.add('alain-pro__wide');
    body.classList.add(`alain-pro__${pro.theme}`);
    if (pro.isSideMenu) body.classList.add('alain-pro__menu-side');
    if (pro.isTopMenu) body.classList.add('alain-pro__menu-top');
    if (pro.collapsed) body.classList.add('aside-collapsed');
  }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    console.log('LayoutProComponent initialized');
    this.pro.notify.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.setClass();
    });

    this.initPermissionOfUser();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  initPermissionOfUser() {
    console.log('LayoutPro: Init user permission (mock)');
  }
}
