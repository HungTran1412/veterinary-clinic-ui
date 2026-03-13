import {
  ChangeDetectionStrategy,
  Component,
  Input,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { BrandService } from '../../pro.service';

@Component({
  selector: 'pro-page-header-wrapper',
  templateUrl: './page-header-wrapper.component.html',
  host: {
    '[class.alain-pro__page-header-wrapper]': 'true'
  },
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ProPageHeaderWrapperComponent {
  @Input() title: string | undefined;
  @Input() content: TemplateRef<void> | undefined;
  @Input() extra: TemplateRef<void> | undefined;
  @Input() logo: TemplateRef<void> | undefined;
  @Input() action: TemplateRef<void> | undefined;
  @Input() tab: TemplateRef<void> | undefined;
  @Input() breadcrumb: any;
  @Input() loading = false;
  @Input() home: string | undefined;

  constructor(public pro: BrandService) {}
}
