import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzMessageModule } from 'ng-zorro-antd/message';

@NgModule({
  declarations: [
    // I18nPipe đã là standalone
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,

    // Ant Design
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
    NzInputModule,
    NzAutocompleteModule,
    NzSpinModule,
    NzAlertModule,
    NzBadgeModule,
    NzPopoverModule,
    NzListModule,
    NzMessageModule
  ],
  exports: [
    // Tất cả các component đã là standalone
  ]
})
export class LayoutModule { }
