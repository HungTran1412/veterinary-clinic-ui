import { Routes } from '@angular/router';
import { LayoutProComponent } from './layout/pro/pro.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutProComponent,
    children: [
      { path: '', redirectTo: 'admin', pathMatch: 'full' },
      {
        path: 'admin',
        loadChildren: () => import('./routes/admin/admin.module').then(m => m.AdminModule)
      }
    ]
  },
  { path: '**', redirectTo: '' }
];
