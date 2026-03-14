import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemRoutingModule } from './system-routing.module';
import { SystemComponent } from './system.component';
import { SystemLogComponent } from './system-log.component';
import { ForgotPasswordLogComponent } from './forgot-password-log.component';
import { EmailLogComponent } from './email-log.component';

@NgModule({
  declarations: [
    SystemComponent,
    SystemLogComponent,
    ForgotPasswordLogComponent,
    EmailLogComponent
  ],
  imports: [CommonModule, SystemRoutingModule]
})
export class SystemModule {}
