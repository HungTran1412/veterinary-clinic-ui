import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./layout/layout-routing.module').then(m => m.LayoutRoutingModule)
  },
  { path: '**', redirectTo: '' }
];
