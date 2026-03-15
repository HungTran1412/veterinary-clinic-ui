import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, Input } from '@angular/core';

import { I18NService } from '@/app/shared-ui/core';
import { SettingsService } from '@delon/theme';
import { NzPlacementType } from 'ng-zorro-antd/dropdown';

@Component({
  selector: 'pro-langs',
  templateUrl: './langs.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LangsComponent {
  langs: any[];

  @Input() placement: NzPlacementType = 'bottomRight';
  @Input() btnClass = 'alain-pro__header-item';
  @Input() btnIconClass = 'alain-pro__header-item-icon';

  constructor(
    public settings: SettingsService,
    private i18n: I18NService, // Inject trực tiếp
    @Inject(DOCUMENT) private doc: any
  ) {
    this.langs = this.i18n.getLangs().map((v: any) => {
      v.abbr = '🇻🇳';
      switch (v.code) {
        case 'vi-VN':
          v.abbr = '🇻🇳';
          break;
        case 'en-US':
          v.abbr = '🇬🇧';
          break;
      }
      return v;
    });
  }

  change(lang: string): void {
    const spinEl = this.doc.createElement('div');
    spinEl.setAttribute('class', `page-loading ant-spin ant-spin-lg ant-spin-spinning`);
    spinEl.innerHTML = `<span class="ant-spin-dot ant-spin-dot-spin"><i></i><i></i><i></i><i></i></span>`;
    this.doc.body.appendChild(spinEl);

    this.i18n.use(lang); // Sửa lại, chỉ truyền 1 tham số
    this.settings.setLayout('lang', lang);
    setTimeout(() => this.doc.location.reload());
  }
}
