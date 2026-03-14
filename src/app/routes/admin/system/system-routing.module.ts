import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SystemComponent } from './system.component';
import { SystemLogComponent } from './system-log.component';
import { ForgotPasswordLogComponent } from './forgot-password-log.component';
import { EmailLogComponent } from './email-log.component';

const routes: Routes = [
  {
    path: '',
    component: SystemComponent,
    children: [
      { path: '', redirectTo: 'system', pathMatch: 'full' },
      { path: 'system', component: SystemLogComponent },
      { path: 'forgot-password', component: ForgotPasswordLogComponent },
      { path: 'email', component: EmailLogComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule {}
