import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import { RTLService } from '@delon/theme';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'layout-pro-rtl',
  standalone: true,
  imports: [CommonModule, NzButtonModule],
  template: `
    <button nz-button nzType="link" class="alain-pro__header-item-icon">
      {{ rtl.nextDir | uppercase }}
    </button>
  `,
  host: {
    '[class.alain-pro__header-item]': 'true'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutProWidgetRTLComponent {
  constructor(public rtl: RTLService) {}

  @HostListener('click')
  toggleDirection(): void {
    this.rtl.toggle();
  }
}
