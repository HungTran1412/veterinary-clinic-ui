import { ChangeDetectionStrategy, Component } from '@angular/core';
import { environment } from '../../../../environments/environments';

@Component({
  selector: 'layout-pro-footer',
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
