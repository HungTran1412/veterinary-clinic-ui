import { Direction, Directionality } from '@angular/cdk/bidi';
import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, NgZone, OnDestroy, OnInit, Optional } from '@angular/core';
import { I18NService } from '@/app/shared-ui/core/i18n/i18n.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subject, takeUntil } from 'rxjs';
import { BrandService } from '../pro.service';
import { ProLayout } from '../pro.types';

@Component({
  selector: 'pro-setting-drawer',
  templateUrl: './setting-drawer.component.html',
  preserveWhitespaces: false,
  host: {
    '[class.setting-drawer]': 'true',
    '[class.setting-drawer-rtl]': `dir === 'rtl'`
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProSettingDrawerComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  get layout(): ProLayout {
    return this.brand.layout;
  }

  collapse = false;
  dir: Direction = 'ltr';

  themes = [
    {
      key: 'dark',
      title: 'app.setting.pagestyle.dark',
      img: 'https://gw.alipayobjects.com/zos/rmsportal/LCkqqYNmvBEbokSDscrm.svg'
    },
    {
      key: 'light',
      title: 'app.setting.pagestyle.light',
      img: 'https://gw.alipayobjects.com/zos/rmsportal/jpRkZQMyYRryryPNtyIC.svg'
    }
  ];

  color = '#2F54EB';
  colors = [
    { key: 'dust', color: '#F5222D' },
    { key: 'volcano', color: '#FA541C' },
    { key: 'sunset', color: '#FAAD14' },
    { key: 'cyan', color: '#13C2C2' },
    { key: 'green', color: '#52C41A' },
    { key: 'daybreak', color: '#1890ff' },
    { key: 'geekblue', color: '#2F54EB' },
    { key: 'purple', color: '#722ED1' }
  ];

  menuModes = [
    {
      key: 'side',
      title: 'app.setting.sidemenu',
      img: 'https://gw.alipayobjects.com/zos/rmsportal/JopDzEhOqwOjeNTXkoje.svg'
    },
    {
      key: 'top',
      title: 'app.setting.topmenu',
      img: 'https://gw.alipayobjects.com/zos/rmsportal/KDNDBbriJhLwuqMoxcAr.svg'
    }
  ];

  contentWidths = [
    {
      key: 'fixed',
      title: 'app.setting.content-width.fixed',
      disabled: false
    },
    {
      key: 'fluid',
      title: 'app.setting.content-width.fluid',
      disabled: false
    }
  ];

  constructor(
    public brand: BrandService,
    private cdr: ChangeDetectorRef,
    private msg: NzMessageService,
    private zone: NgZone,
    @Inject(DOCUMENT) private doc: any,
    private i18n: I18NService,
    @Optional() private directionality: Directionality
  ) {}

  ngOnInit(): void {
    if (this.directionality) {
      this.dir = this.directionality.value;
      this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
        this.dir = direction;
        this.cdr.detectChanges();
      });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggle(): void {
    this.collapse = !this.collapse;
  }

  changeColor(color: string): void {
    this.color = color;
    this.msg.info('Chức năng đổi màu theme chưa được hỗ trợ trong phiên bản này');
  }

  setLayout(name: keyof ProLayout, value: any): void {
    if (name === 'menu') {
        const isTop = value === 'top';
        const fixedOption = this.contentWidths.find(w => w.key === 'fixed');
        if (fixedOption) fixedOption.disabled = !isTop;
        this.brand.setLayout('contentWidth', isTop ? 'fixed' : 'fluid');
        this.brand.setLayout('onlyIcon', isTop);
        if (isTop && !this.brand.isMobile) {
             this.brand.setLayout('collapsed', false);
        }
    }

    if (name === 'fixedHeader') {
        this.brand.setLayout('autoHideHeader', false);
    }

    this.brand.setLayout(name, value);

    setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
        this.cdr.markForCheck();
    });
  }

  copy(): void {
    this.msg.info('Chức năng copy cấu hình chưa được hỗ trợ');
  }
}
