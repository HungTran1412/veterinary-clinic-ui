import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

// Ant Design
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';

// Components
import { LayoutProComponent } from './pro/pro.component';
import { LayoutProMenuComponent } from './pro/components/menu/menu.component';
import { LayoutProHeaderComponent } from './pro/components/header/header.component';
import { LayoutProFooterComponent } from './pro/components/footer/footer.component';
import { LayoutProLogoComponent } from './pro/components/logo/logo.component';
import { ProSettingDrawerComponent } from './pro/setting-drawer/setting-drawer.component';
import { LayoutProHeaderWidgetComponent } from './pro/components/widget/widget.component';
import { LayoutProWidgetUserComponent } from './pro/components/user/user.component';
import { LayoutProWidgetSearchComponent } from './pro/components/search/search.component';
import { LayoutProWidgetNotifyComponent } from './pro/components/notify/notify.component';
import { LayoutProWidgetQuickComponent } from './pro/components/quick/quick.component';
import { LayoutProWidgetQuickPanelComponent } from './pro/components/quick/quick-panel.component';
import { LayoutProWidgetQuickChatComponent } from './pro/components/quick-chat/quick-chat.component';
import { LayoutProWidgetQuickChatStatusComponent } from './pro/components/quick-chat/quick-chat-status.component';
import { LayoutProWidgetRTLComponent } from './pro/components/rtl/rtl.component';

// Pipe
import { I18nPipe } from './pro/i18n.pipe';

const PRO_COMPONENTS = [
  LayoutProComponent,
  LayoutProMenuComponent,
  LayoutProHeaderComponent,
  LayoutProFooterComponent,
  LayoutProLogoComponent,
  ProSettingDrawerComponent,
  LayoutProHeaderWidgetComponent,
  LayoutProWidgetUserComponent,
  LayoutProWidgetSearchComponent,
  LayoutProWidgetNotifyComponent,
  LayoutProWidgetQuickComponent,
  LayoutProWidgetQuickPanelComponent,
  LayoutProWidgetQuickChatComponent,
  LayoutProWidgetQuickChatStatusComponent,
  LayoutProWidgetRTLComponent
];

const MODULES = [
  CommonModule,
  RouterModule,
  FormsModule,
  NzLayoutModule,
  NzMenuModule,
  NzIconModule,
  NzDropDownModule,
  NzAvatarModule,
  NzToolTipModule,
  NzDrawerModule,
  NzSelectModule,
  NzSwitchModule,
  NzDividerModule,
  NzButtonModule,
  NzAlertModule,
  NzBadgeModule,
  NzPopoverModule,
  NzListModule,
  NzSpinModule,
  NzInputModule,
  NzAutocompleteModule
];

@NgModule({
  declarations: [...PRO_COMPONENTS, I18nPipe],
  imports: [...MODULES],
  exports: [...PRO_COMPONENTS, I18nPipe, ...MODULES]
})
export class LayoutModule {}
