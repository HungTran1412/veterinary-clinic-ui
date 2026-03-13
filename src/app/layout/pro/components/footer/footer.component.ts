import { ChangeDetectionStrategy, Component } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { CommonModule } from '@angular/common';
import { I18nPipe } from '../../i18n.pipe';

@Component({
  selector: 'layout-pro-footer',
  standalone: true,
  imports: [CommonModule, I18nPipe],
  templateUrl: './footer.component.html',
  host: {
    '[class.alain-pro__footer]': 'true'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutProFooterComponent {
  get year(): number {
    return new Date().getFullYear();
  }
  get version(): string {
    return environment.version;
  }
  get build(): number {
    return +environment.build || 0;
  }
}
