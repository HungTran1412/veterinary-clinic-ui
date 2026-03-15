import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject, filter, takeUntil } from 'rxjs';
import { BrandService } from '../../pro.service';
import { MenuItem, MENU_ITEMS } from '@/app/utils';

@Component({
  selector: 'layout-pro-menu',
  templateUrl: './menu.component.html',
  host: {
    '[class.alain-pro__menu]': 'true'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutProMenuComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  menus: MenuItem[] = MENU_ITEMS;
  @Input() mode: 'vertical' | 'horizontal' | 'inline' = 'inline';

  constructor(
    public pro: BrandService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.router.events.pipe(
        takeUntil(this.destroy$),
        filter(e => e instanceof NavigationEnd)
    ).subscribe(() => this.cdr.detectChanges());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  closeCollapsed(): void {
    if (this.pro.isMobile) {
      this.pro.setCollapsed(false);
    }
  }

  openChange(menu: MenuItem, open: boolean): void {
    menu.open = open;
    this.cdr.markForCheck();
  }
}
