import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { Subject, filter, takeUntil } from 'rxjs';
import { BrandService } from '../../pro.service';
import { ProLayout } from '../../pro.types';
import { MENU_ITEMS } from '@/app/utils';
import { CommonModule } from '@angular/common';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'layout-pro-menu',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NzMenuModule,
    NzIconModule
  ],
  templateUrl: './menu.component.html',
  host: {
    '[class.alain-pro__menu]': 'true',
    '[class.alain-pro__menu-only-icon]': 'pro.onlyIcon'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutProMenuComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  menus: any[] = MENU_ITEMS;

  @Input() disabledAcl = false;
  @Input() mode: 'vertical' | 'horizontal' | 'inline' = 'inline';

  constructor(
    public pro: BrandService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const { pro, destroy$ } = this;
    pro.notify.pipe(takeUntil(destroy$)).subscribe(() => this.cdr.detectChanges());

    this.router.events.pipe(
        takeUntil(destroy$),
        filter(e => e instanceof NavigationEnd)
    ).subscribe(() => this.cdr.detectChanges());
  }

  closeCollapsed(): void {
    this.pro.setCollapsed(true);
  }

  openChange(item: any, status: boolean): void {
    if (status) {
      this.menus.forEach(p => {
        if (p !== item && p.open) p.open = false;
      });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
