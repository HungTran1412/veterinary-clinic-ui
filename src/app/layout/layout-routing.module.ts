import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutProComponent } from './pro/pro.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutProComponent,
    children: [
      {
        path: 'admin',
        loadChildren: () => import('../routes/admin/admin.module').then(m => m.AdminModule)
      },
      { path: '', redirectTo: 'admin', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {}
