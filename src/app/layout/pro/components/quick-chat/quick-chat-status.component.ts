import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'layout-pro-widget-quick-chat-status',
  templateUrl: './quick-chat-status.component.html',
  host: {
    '[class.quick-chat-status]': 'true'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutProWidgetQuickChatStatusComponent {
  @Input() status: 'online' | 'away' | 'busy' | 'offline' = 'online';
}
