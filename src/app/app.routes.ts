import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./routes/admin/admin.module').then(m => m.AdminModule),
  },
  // Fallback route
  { path: '**', redirectTo: '' }
];
