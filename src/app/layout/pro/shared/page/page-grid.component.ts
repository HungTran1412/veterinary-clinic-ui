import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'pro-page-grid',
  template: '<ng-content></ng-content>',
  host: {
    '[class.page-grid]': 'true',
    '[class.page-grid__loading]': 'loading'
  },
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ProPageGridComponent {
  @Input() title: string | undefined;
  @Input() loading = false;
  @Input() home: string | undefined;

  constructor() {}
}
